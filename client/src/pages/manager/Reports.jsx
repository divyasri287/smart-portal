import React, { useState, useEffect } from 'react';
import ReportCard from '../../components/manager/ReportCard';
import { executiveReports as staticExecutiveReports, reportLogsDataset as staticReportLogs } from '../../data/manager/reports';
import { getManagerReportsData } from '../../data/manager/managerReportsFeed';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Search, 
  FileCheck,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';

export const ManagerReports = () => {
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [downloadNotice, setDownloadNotice] = useState(null);

  // Live feed state
  const [liveData, setLiveData] = useState(() => getManagerReportsData());

  // Refresh live feed on mount and whenever the user manually refreshes
  const refreshFeed = () => {
    setLiveData(getManagerReportsData());
  };

  // Auto-refresh when the page becomes visible (e.g. user switches tabs)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshFeed();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // ── Data source resolution ──────────────────────────────────────────────
  // Use live Officer feed when available; fall back to static data otherwise.
  const isLive           = !liveData.isEmpty;
  const executiveReports = isLive ? liveData.executiveReports : staticExecutiveReports;
  const baseLogRows      = isLive ? liveData.reportLogs       : staticReportLogs;

  // ── Commodity options (dynamic from live data) ──────────────────────────
  const commodityOptions = isLive
    ? ['All', ...new Set(liveData.transactions.map((t) => t.commodity).filter(Boolean))]
    : ['All', 'Wheat', 'Mustard'];

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleTriggerExport = (reportName, format) => {
    setDownloadNotice(`Generating ${format.toUpperCase()} export for "${reportName}"...`);
    setTimeout(() => {
      setDownloadNotice(`Downloaded "${reportName}.${format}" successfully!`);
      setTimeout(() => setDownloadNotice(null), 3000);
    }, 1000);
  };

  // ── Filter + Search logic ────────────────────────────────────────────────
  // Works for both live rows (REP-LV-*) and static rows (REP-PB-*)
  const filteredLogs = baseLogRows.filter((item) => {
    const searchLower = search.toLowerCase();

    if (isLive) {
      // Extended live-feed search: match reportId, date, centre, or any
      // individual transaction field within the day's records
      const inHeader =
        (item.reportId   || '').toLowerCase().includes(searchLower) ||
        (item.date       || '').toLowerCase().includes(searchLower) ||
        (item.activeMandis || '').toLowerCase().includes(searchLower);

      const inTransactions = (item._records || []).some((r) =>
        (r.receiptId   || '').toLowerCase().includes(searchLower) ||
        (r.tokenNo     || '').toLowerCase().includes(searchLower) ||
        (r.farmerName  || '').toLowerCase().includes(searchLower) ||
        (r.farmerId    || '').toLowerCase().includes(searchLower) ||
        (r.commodity   || '').toLowerCase().includes(searchLower) ||
        (r.centre      || '').toLowerCase().includes(searchLower) ||
        (r.officerName || '').toLowerCase().includes(searchLower)
      );

      const matchesSearch = inHeader || inTransactions;

      // Commodity filter: match any transaction in the day
      const matchesCrop =
        cropFilter === 'All' ||
        (item._records || []).some((r) =>
          (r.commodity || '').toLowerCase().includes(cropFilter.toLowerCase())
        );

      return matchesSearch && matchesCrop;
    }

    // Static fallback — original filter logic preserved exactly
    const matchesSearch =
      item.reportId.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search) ||
      item.activeMandis.toLowerCase().includes(search.toLowerCase());
    const matchesCrop =
      cropFilter === 'All' || item.activeMandis.toLowerCase().includes(cropFilter.toLowerCase());
    return matchesSearch && matchesCrop;
  });

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Procurement &amp; Tonnage Audit Reports
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5 flex items-center gap-1.5">
                Official daily summaries, crop intake breakdown, and Direct Benefit Transfer audit records
                {isLive ? (
                  <span className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                    <Wifi className="w-3 h-3" /> LIVE FEED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] border border-slate-200">
                    <WifiOff className="w-3 h-3" /> STATIC DATA
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Refresh button */}
          <button
            onClick={refreshFeed}
            title="Refresh live feed"
            className="h-11 w-11 rounded-xl border border-[#E5E7EB] bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleTriggerExport('All_Mandi_Reports_Batch', 'pdf')}
            className="h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs font-['Poppins'] rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Master Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Download notice */}
      {downloadNotice && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-[#166534] text-xs font-semibold font-['Poppins'] flex items-center gap-2 shadow-xs">
          <FileCheck className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Empty live-feed notice (only when feed exists but officer hasn't finalized any procurement yet) */}
      {liveData.isEmpty && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold font-['Poppins'] flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>
            No live procurement data yet. The Procurement Officer has not finalized any transactions.
            Showing static reference data below.
          </span>
        </div>
      )}

      {/* Featured Executive Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {executiveReports.map((report) => (
          <ReportCard
            key={report.id}
            title={report.title}
            date={report.date}
            totalTonnage={report.totalTonnage}
            farmersServed={report.farmersServed}
            dbtDisbursed={report.dbtDisbursed}
            moistureAvg={report.moistureAvg}
            onDownloadPdf={() => handleTriggerExport(report.title.replace(/\s+/g, '_'), 'pdf')}
            onDownloadCsv={() => handleTriggerExport(report.title.replace(/\s+/g, '_'), 'csv')}
          />
        ))}
      </div>

      {/* Reports Dataset Table */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={
                isLive
                  ? 'Search receipt ID, farmer, token, commodity, officer…'
                  : 'Search report ID, mandi name, or date…'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
            />
          </div>

          {/* Commodity filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
            >
              {commodityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Commodities' : opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-['Inter']">
            <thead>
              <tr className="bg-slate-100/70 border-b border-[#E5E7EB] text-[11px] font-bold text-slate-600 uppercase tracking-wider font-['Poppins']">
                <th className="py-3.5 px-4">Report ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Procured (Tons)</th>
                <th className="py-3.5 px-4">Centre / Mandi</th>
                <th className="py-3.5 px-4">Farmers Served</th>
                <th className="py-3.5 px-4">DBT Disbursed</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs font-['Poppins']">
                    No procurement records match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item) => (
                  <tr key={item.reportId} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold font-['Roboto_Mono'] text-[#166534]">
                      {item.reportId}
                    </td>
                    <td className="py-3.5 px-4 font-['Roboto_Mono'] text-slate-600">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold font-['Roboto_Mono'] text-[#111827]">
                      {item.procuredTons}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {item.activeMandis}
                    </td>
                    <td className="py-3.5 px-4 font-['Roboto_Mono'] text-slate-800">
                      {item.farmersServed}
                    </td>
                    <td className="py-3.5 px-4 font-bold font-['Roboto_Mono'] text-[#F59E0B]">
                      {item.dbtDisbursed}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleTriggerExport(`Report_${item.reportId}`, 'pdf')}
                        className="h-9 px-3.5 rounded-lg bg-white border border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white font-semibold text-xs font-['Poppins'] transition-all inline-flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Live feed transaction detail panel (visible only when live data present) */}
        {isLive && liveData.transactions.length > 0 && (
          <div className="border-t border-[#E5E7EB]">
            <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <p className="text-[11px] font-bold font-['Poppins'] text-slate-600 uppercase tracking-wider">
                Individual Procurement Transactions — Live Officer Feed
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-['Inter']">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E5E7EB] text-[10px] font-bold text-slate-500 uppercase tracking-wider font-['Poppins']">
                    <th className="py-3 px-4">Receipt ID</th>
                    <th className="py-3 px-4">Token</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Farmer</th>
                    <th className="py-3 px-4">Commodity</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Moisture</th>
                    <th className="py-3 px-4">Net Wt (Qtl)</th>
                    <th className="py-3 px-4">MSP ₹/Qtl</th>
                    <th className="py-3 px-4">Total Payable</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Officer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {liveData.transactions
                    .filter((t) => {
                      // Apply same search to transactions
                      if (!search) return true;
                      const s = search.toLowerCase();
                      return (
                        (t.receiptId   || '').toLowerCase().includes(s) ||
                        (t.tokenNo     || '').toLowerCase().includes(s) ||
                        (t.farmerName  || '').toLowerCase().includes(s) ||
                        (t.farmerId    || '').toLowerCase().includes(s) ||
                        (t.commodity   || '').toLowerCase().includes(s) ||
                        (t.centre      || '').toLowerCase().includes(s) ||
                        (t.officerName || '').toLowerCase().includes(s) ||
                        (t.date        || '').toLowerCase().includes(s)
                      );
                    })
                    .filter((t) =>
                      cropFilter === 'All' ||
                      (t.commodity || '').toLowerCase().includes(cropFilter.toLowerCase())
                    )
                    .map((t) => (
                      <tr key={t.receiptId} className="hover:bg-emerald-50/20 transition-colors">
                        <td className="py-3 px-4 font-bold font-['Roboto_Mono'] text-[#166534] text-[11px]">
                          {t.receiptId}
                        </td>
                        <td className="py-3 px-4 font-['Roboto_Mono'] text-slate-500 text-[11px]">
                          {t.tokenNo}
                        </td>
                        <td className="py-3 px-4 font-['Roboto_Mono'] text-slate-600 text-[11px]">
                          {t.date}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          <span>{t.farmerName}</span>
                          <span className="block text-[10px] text-slate-400 font-normal font-['Roboto_Mono']">
                            {t.farmerId}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{t.commodity}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            {t.gradeResult}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-['Roboto_Mono'] text-slate-600">
                          {t.moisturePct}%
                        </td>
                        <td className="py-3 px-4 font-['Roboto_Mono'] font-bold text-slate-800">
                          {t.netWeightQtl} Qtl
                        </td>
                        <td className="py-3 px-4 font-['Roboto_Mono'] text-slate-700">
                          ₹ {Number(t.mspRate).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-bold font-['Roboto_Mono'] text-[#F59E0B]">
                          ₹ {Number(t.totalAmount).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            (t.paymentStatus || '').toLowerCase().includes('credited')
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {t.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span>{t.officerName}</span>
                          <span className="block text-[10px] text-slate-400 font-['Roboto_Mono']">
                            {t.officerBadge}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerReports;
