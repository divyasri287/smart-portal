import React, { useState } from 'react';
import ReportCard from '../../components/manager/ReportCard';
import { executiveReports, reportLogsDataset } from '../../data/manager/reports';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Search, 
  FileCheck
} from 'lucide-react';

export const ManagerReports = () => {
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [downloadNotice, setDownloadNotice] = useState(null);

  const handleTriggerExport = (reportName, format) => {
    setDownloadNotice(`Generating ${format.toUpperCase()} export for "${reportName}"...`);
    setTimeout(() => {
      setDownloadNotice(`Downloaded "${reportName}.${format}" successfully!`);
      setTimeout(() => setDownloadNotice(null), 3000);
    }, 1000);
  };

  const filteredLogs = reportLogsDataset.filter((item) => {
    const matchesSearch =
      item.reportId.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search) ||
      item.activeMandis.toLowerCase().includes(search.toLowerCase());
    const matchesCrop = cropFilter === 'All' || item.activeMandis.toLowerCase().includes(cropFilter.toLowerCase());
    return matchesSearch && matchesCrop;
  });

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
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Official daily summaries, crop intake breakdown, and Direct Benefit Transfer audit records
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleTriggerExport('All_Mandi_Reports_Batch', 'pdf')}
            className="h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs font-['Poppins'] rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Master Report (PDF)</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-[#166534] text-xs font-semibold font-['Poppins'] flex items-center gap-2 shadow-xs">
          <FileCheck className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Featured Executive Report Cards — sourced from executiveReports */}
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

      {/* Reports Dataset Table — sourced from reportLogsDataset */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search report ID, mandi name, or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
            >
              <option value="All">All Commodities</option>
              <option value="Wheat">Grade-A Wheat</option>
              <option value="Mustard">Mustard Seed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-['Inter']">
            <thead>
              <tr className="bg-slate-100/70 border-b border-[#E5E7EB] text-[11px] font-bold text-slate-600 uppercase tracking-wider font-['Poppins']">
                <th className="py-3.5 px-4">Report ID</th>
                <th className="py-3.5 px-4">Date Generated</th>
                <th className="py-3.5 px-4">Procured (Tons)</th>
                <th className="py-3.5 px-4">Active Mandis</th>
                <th className="py-3.5 px-4">Farmers Served</th>
                <th className="py-3.5 px-4">DBT Disbursed</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLogs.map((item) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
