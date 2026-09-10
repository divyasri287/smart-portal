import initialQueue from '../data/queue.json';
import initialFarmers from '../data/farmers.json';
import initialHistory from '../data/procurementHistory.json';
import initialReceipts from '../data/receipts.json';
import initialOfficers from '../data/officers.json';

const STORAGE_KEYS = {
  QUEUE: 'sih_officer_queue',
  FARMERS: 'sih_officer_farmers',
  HISTORY: 'sih_officer_history',
  RECEIPTS: 'sih_officer_receipts',
  PROFILE: 'sih_officer_profile',
  ACTIVE_SESSION: 'sih_officer_active_session',
  ISSUES: 'sih_officer_reported_issues',
  // Shared key — read by Manager Reports module
  SHARED_FEED: 'sih_shared_procurement_feed',
};

const getFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
};

export const officerStorage = {
  // --- QUEUE ---
  getQueue: () => getFromStorage(STORAGE_KEYS.QUEUE, initialQueue),
  
  getAvailableQueue: () => {
    const queue = officerStorage.getQueue();
    const receipts = officerStorage.getReceipts();
    const completedTokens = new Set(
      receipts.map((r) => r.tokenNo?.toUpperCase()).filter(Boolean)
    );
    const completedFarmers = new Set(
      receipts.map((r) => r.farmerId?.toUpperCase()).filter(Boolean)
    );

    return queue.filter((item) => {
      if (
        item.status === 'Receipt Generated' ||
        item.status === 'Completed' ||
        item.status === 'Procured'
      ) {
        return false;
      }
      if (item.tokenNo && completedTokens.has(item.tokenNo.toUpperCase())) {
        return false;
      }
      if (item.id && completedFarmers.has(item.id.toUpperCase())) {
        return false;
      }
      return true;
    });
  },
  
  saveQueue: (queueList) => {
    setToStorage(STORAGE_KEYS.QUEUE, queueList);
    return queueList;
  },

  updateQueueStatus: (idOrToken, newStatus) => {
    const queue = officerStorage.getQueue();
    const updated = queue.map((item) => {
      if (item.id === idOrToken || item.tokenNo === idOrToken) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    officerStorage.saveQueue(updated);
    return updated;
  },

  // --- FARMERS ---
  getFarmers: () => getFromStorage(STORAGE_KEYS.FARMERS, initialFarmers),

  getFarmerById: (id) => {
    const farmers = officerStorage.getFarmers();
    return farmers.find((f) => f.id === id) || farmers[0];
  },

  updateFarmer: (updatedFarmer) => {
    const farmers = officerStorage.getFarmers();
    const index = farmers.findIndex((f) => f.id === updatedFarmer.id);
    if (index >= 0) {
      farmers[index] = { ...farmers[index], ...updatedFarmer };
      setToStorage(STORAGE_KEYS.FARMERS, farmers);
    }
    return updatedFarmer;
  },

  // --- HISTORY ---
  getHistory: () => getFromStorage(STORAGE_KEYS.HISTORY, initialHistory),

  addHistory: (record) => {
    const history = officerStorage.getHistory();
    const updated = [record, ...history];
    setToStorage(STORAGE_KEYS.HISTORY, updated);
    return updated;
  },

  // --- RECEIPTS ---
  getReceipts: () => getFromStorage(STORAGE_KEYS.RECEIPTS, initialReceipts),

  getReceiptById: (receiptId) => {
    const receipts = officerStorage.getReceipts();
    return receipts.find((r) => r.receiptId === receiptId) || receipts[0];
  },

  addReceipt: (receipt) => {
    const receipts = officerStorage.getReceipts();
    const updated = [receipt, ...receipts.filter(r => r.receiptId !== receipt.receiptId)];
    setToStorage(STORAGE_KEYS.RECEIPTS, updated);
    return receipt;
  },

  // --- PROFILE ---
  getProfile: () => getFromStorage(STORAGE_KEYS.PROFILE, initialOfficers[0] || {
    id: 'OFF-204',
    name: 'Inspector Vikram Sharma',
    badgeNo: 'INS-PB-8891',
    centreAssigned: 'Ludhiana Mandi Centre 4',
    shift: 'Morning (08:00 AM – 04:00 PM)',
    status: 'Active / On-Duty',
  }),

  updateProfile: (newProfile) => {
    setToStorage(STORAGE_KEYS.PROFILE, newProfile);
    return newProfile;
  },

  // --- ACTIVE WORKFLOW SESSION ---
  getActiveSession: () => getFromStorage(STORAGE_KEYS.ACTIVE_SESSION, {
    tokenNo: 'TKN-A901',
    farmerId: 'FRM-1001',
    farmerName: 'Ramesh Singh',
    vehicleNo: 'PB-10-CZ-4419',
    commodity: 'Paddy Grade A',
    bayAssigned: 'Bay 3',
    district: 'Ludhiana, Punjab',
    aadhaar: 'XXXX-XXXX-8912',
    bank: 'SBI — xxxx5678',
    moisturePct: 12.4,
    foreignMatterPct: 0.5,
    damagedGrainsPct: 0.3,
    gradeResult: 'Grade A (Passed)',
    grossWeightKg: 18500,
    tareWeightKg: 4500,
    netWeightKg: 14000,
    netWeightQtl: 140,
    mspRate: 2300,
    totalAmount: 322000,
  }),

  setActiveSession: (data) => {
    const current = officerStorage.getActiveSession();
    const updated = { ...current, ...data };
    setToStorage(STORAGE_KEYS.ACTIVE_SESSION, updated);
    return updated;
  },

  clearActiveSession: () => {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  },

  // Reset to default seed data
  resetAll: () => {
    setToStorage(STORAGE_KEYS.QUEUE, initialQueue);
    setToStorage(STORAGE_KEYS.FARMERS, initialFarmers);
    setToStorage(STORAGE_KEYS.HISTORY, initialHistory);
    setToStorage(STORAGE_KEYS.RECEIPTS, initialReceipts);
    setToStorage(STORAGE_KEYS.PROFILE, initialOfficers[0]);
    officerStorage.clearActiveSession();
  },

  // --- REPORTED ISSUES ---
  getReportedIssues: () => getFromStorage(STORAGE_KEYS.ISSUES, []),

  reportIssue: (issue) => {
    const issues = officerStorage.getReportedIssues();
    const newIssue = {
      id: `ISS-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      status: 'Intimated to Manager',
      officerName: officerStorage.getProfile()?.name || 'Inspector Vikram Sharma',
      ...issue,
    };
    const updated = [newIssue, ...issues];
    setToStorage(STORAGE_KEYS.ISSUES, updated);
    return newIssue;
  },

  // --- SHARED PROCUREMENT FEED (for Manager Reports module) ---
  /**
   * Returns all records written to the shared feed.
   * The Manager module can read from localStorage key: sih_shared_procurement_feed
   */
  getSharedFeed: () => getFromStorage(STORAGE_KEYS.SHARED_FEED, []),

  /**
   * Publishes a completed procurement receipt to the shared feed.
   * Call this immediately after addReceipt() in SubmitProcurement.
   *
   * Each entry is normalized to a structure the Manager Reports module can use:
   * {
   *   receiptId      : string   — unique receipt ID (e.g. "RCP-2026-4471")
   *   tokenNo        : string   — gate token (e.g. "TKN-A901")
   *   date           : string   — ISO date (YYYY-MM-DD)
   *   centre         : string   — mandi / procurement centre name
   *   farmerName     : string
   *   farmerId       : string
   *   commodity      : string   — e.g. "Paddy Grade A"
   *   verificationStatus : string — "Verified"
   *   gradeResult    : string   — "Grade A" | "FAQ"
   *   moisturePct    : number   — e.g. 12.4
   *   grossWeightKg  : number
   *   tareWeightKg   : number
   *   netWeightKg    : number
   *   netWeightQtl   : number   — quantity in quintals
   *   mspRate        : number   — ₹/quintal
   *   totalAmount    : number   — total MSP payment in ₹
   *   paymentStatus  : string   — "Pending Processing" | "Credited"
   *   dbtRef         : string   — DBT reference number
   *   officerName    : string
   *   officerBadge   : string
   * }
   */
  publishToManagerFeed: (receipt) => {
    const feed = officerStorage.getSharedFeed();

    const normalized = {
      receiptId:          receipt.receiptId,
      tokenNo:            receipt.tokenNo,
      date:               receipt.date,
      centre:             receipt.centre,
      farmerName:         receipt.farmerName,
      farmerId:           receipt.farmerId,
      commodity:          receipt.commodity,
      verificationStatus: 'Verified',
      gradeResult:        receipt.gradeResult,
      moisturePct:        receipt.moisturePct,
      grossWeightKg:      receipt.grossWeightKg,
      tareWeightKg:       receipt.tareWeightKg,
      netWeightKg:        receipt.netWeightKg,
      netWeightQtl:       receipt.netWeightQtl,
      mspRate:            receipt.mspRate,
      totalAmount:        receipt.totalAmount,
      paymentStatus:      receipt.paymentStatus || 'Pending Processing',
      dbtRef:             receipt.dbtRef,
      officerName:        receipt.officerName,
      officerBadge:       receipt.officerBadge,
    };

    // Prepend newest record, deduplicate by receiptId
    const updated = [
      normalized,
      ...feed.filter((r) => r.receiptId !== normalized.receiptId),
    ];

    setToStorage(STORAGE_KEYS.SHARED_FEED, updated);
    return normalized;
  },
};

export default officerStorage;
