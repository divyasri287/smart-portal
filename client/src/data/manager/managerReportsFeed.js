/**
 * managerReportsFeed.js
 * ---------------------
 * Manager-module helper that reads the shared Officer procurement feed
 * from localStorage and transforms it into the exact data shapes that
 * the existing Manager Reports UI already expects.
 *
 * localStorage key consumed: sih_shared_procurement_feed   (written by Officer module)
 * Officer files modified    : NONE
 *
 * Aggregation formulas
 * ─────────────────────
 *  • Procured Tonnage  = sum(netWeightQtl) / 10   [1 MT = 10 quintals]
 *  • Farmers Served    = count of finalized transactions for that date
 *  • DBT Disbursed     = sum(totalAmount) in ₹
 *  • Avg Moisture      = average of numeric moisturePct values (null-safe)
 *
 * Fallback behaviour
 * ──────────────────
 * If the feed is absent, empty, or unparseable the functions return
 * empty arrays so the caller can decide to fall back to static data.
 */

const SHARED_FEED_KEY = 'sih_shared_procurement_feed';

// ── helpers ─────────────────────────────────────────────────────────────────

/** Safely parse a JSON string; returns null on any error. */
const safeParse = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

/** Format a rupee amount as "₹ X.XX Cr" or "₹ X,XX,XXX" depending on size. */
const formatRupees = (amount) => {
  if (amount == null || isNaN(amount)) return '₹ 0';
  if (amount >= 10_000_000) {
    return `₹ ${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `₹ ${(amount / 100_000).toFixed(2)} L`;
  }
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

/** Format metric tonnes with 2 decimal places. */
const formatMT = (mt) => `${mt.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} MT`;

// ── public API ───────────────────────────────────────────────────────────────

/**
 * Read and return the raw shared procurement feed array.
 * Returns [] when the key is missing, empty, or unparseable.
 */
export const getRawFeed = () => {
  const raw = localStorage.getItem(SHARED_FEED_KEY);
  if (!raw) return [];
  const parsed = safeParse(raw);
  return parsed || [];
};

/**
 * Group the raw feed by actual date (record.date, ISO YYYY-MM-DD).
 * Returns a Map: dateString → record[]
 */
const groupByDate = (records) => {
  const map = new Map();
  records.forEach((rec) => {
    const key = rec.date || 'unknown';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(rec);
  });
  return map;
};

/**
 * Compute per-date aggregation from a date's record array.
 */
const aggregateDate = (dateStr, records) => {
  const totalQtl    = records.reduce((s, r) => s + (Number(r.netWeightQtl) || 0), 0);
  const totalMT     = totalQtl / 10;                     // 1 MT = 10 quintals
  const totalAmount = records.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
  const farmersServed = records.length;

  const moistures = records
    .map((r) => Number(r.moisturePct))
    .filter((n) => !isNaN(n) && n > 0);
  const avgMoisture = moistures.length
    ? (moistures.reduce((s, n) => s + n, 0) / moistures.length).toFixed(1)
    : null;

  // Derive a representative centre — use the most common one or the first
  const centres = records.map((r) => r.centre).filter(Boolean);
  const centre  = centres[0] || '—';

  return {
    dateStr,
    totalMT,
    totalQtl,
    totalAmount,
    farmersServed,
    avgMoisture,
    centre,
    records, // keep originals for table rows
  };
};

// ── executiveReports shape ───────────────────────────────────────────────────
// The existing ReportCard expects:
// { id, title, date, totalTonnage, farmersServed, dbtDisbursed, moistureAvg }

/**
 * Build up to 3 executive report cards from the live Officer feed.
 * Cards are generated from the 3 most recent distinct dates.
 * Returns [] when feed is empty (caller falls back to static data).
 */
export const buildExecutiveReports = (feed) => {
  if (!feed || feed.length === 0) return [];

  const grouped = groupByDate(feed);

  // Sort dates descending (newest first)
  const sortedDates = [...grouped.keys()].sort((a, b) => b.localeCompare(a));

  return sortedDates.slice(0, 3).map((dateStr, idx) => {
    const agg = aggregateDate(dateStr, grouped.get(dateStr));

    // Friendly date label
    const dateLabel = (() => {
      try {
        return new Date(dateStr).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      } catch {
        return dateStr;
      }
    })();

    const titles = [
      'Daily Grain Procurement Intake',
      'Procurement Audit — Previous Day',
      'Historic Procurement Record',
    ];

    return {
      id:             `live-report-${dateStr}`,
      title:          titles[idx] || `Procurement Report — ${dateLabel}`,
      date:           dateLabel,
      totalTonnage:   formatMT(agg.totalMT),
      farmersServed:  agg.farmersServed,
      dbtDisbursed:   formatRupees(agg.totalAmount),
      moistureAvg:    agg.avgMoisture != null ? `${agg.avgMoisture}%` : 'N/A',
    };
  });
};

// ── reportLogsDataset shape ──────────────────────────────────────────────────
// The existing table expects per-date rows:
// { reportId, date, procuredTons, activeMandis, farmersServed, dbtDisbursed }
// Extended with live fields for richer display and filtering.

/**
 * Build the report logs table rows from the live Officer feed.
 * Each row represents ONE day of procurement at a given centre.
 * Returns [] when feed is empty (caller falls back to static data).
 */
export const buildReportLogs = (feed) => {
  if (!feed || feed.length === 0) return [];

  const grouped = groupByDate(feed);
  const sortedDates = [...grouped.keys()].sort((a, b) => b.localeCompare(a));

  return sortedDates.map((dateStr) => {
    const agg = aggregateDate(dateStr, grouped.get(dateStr));

    // Deterministic report ID from date (no duplicates)
    const datePart = dateStr.replace(/-/g, '').slice(2); // e.g. "260910"
    const reportId = `REP-LV-${datePart}`;

    return {
      reportId,
      date:           dateStr,
      procuredTons:   formatMT(agg.totalMT),
      activeMandis:   agg.centre,
      farmersServed:  agg.farmersServed,
      dbtDisbursed:   formatRupees(agg.totalAmount),
      // Extra live fields for expanded search / filtering
      _totalQtl:      agg.totalQtl,
      _totalAmount:   agg.totalAmount,
      _avgMoisture:   agg.avgMoisture,
      _records:       agg.records,  // individual transactions for drill-down
    };
  });
};

/**
 * Flatten the feed into individual transaction rows.
 * Used for the expanded detail table (one row per procurement transaction).
 */
export const buildTransactionRows = (feed) => {
  if (!feed || feed.length === 0) return [];
  return feed.map((r) => ({
    receiptId:          r.receiptId,
    tokenNo:            r.tokenNo,
    date:               r.date,
    centre:             r.centre,
    farmerName:         r.farmerName,
    farmerId:           r.farmerId,
    commodity:          r.commodity,
    verificationStatus: r.verificationStatus,
    gradeResult:        r.gradeResult,
    moisturePct:        r.moisturePct,
    grossWeightKg:      r.grossWeightKg,
    tareWeightKg:       r.tareWeightKg,
    netWeightKg:        r.netWeightKg,
    netWeightQtl:       r.netWeightQtl,
    mspRate:            r.mspRate,
    totalAmount:        r.totalAmount,
    paymentStatus:      r.paymentStatus,
    dbtRef:             r.dbtRef,
    officerName:        r.officerName,
    officerBadge:       r.officerBadge,
  }));
};

/**
 * Master export — returns everything the Manager Reports page needs.
 * Falls back gracefully when the feed is empty.
 */
export const getManagerReportsData = () => {
  const feed = getRawFeed();
  return {
    feed,
    isEmpty:          feed.length === 0,
    executiveReports: buildExecutiveReports(feed),
    reportLogs:       buildReportLogs(feed),
    transactions:     buildTransactionRows(feed),
  };
};
