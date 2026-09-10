import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import SearchBox from '../../components/inputs/SearchBox';
import { FileText, Download, Calendar, Filter, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';
import initialReports from '../../data/reports.json';

export const OfficerReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setReports(initialReports);
    setHistory(officerStorage.getHistory());
  }, []);

  const totalProcuredToday = history.reduce((sum, h) => sum + (h.netWeightQtl || 0), 0);
  const totalAmountToday = history.reduce((sum, h) => sum + (h.totalAmount || 0), 0);

  const filteredReports = reports.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reportId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (report) => {
    alert(`Downloading ${report.title} (${report.reportId})...`);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Procurement & Audit Reports"
        subtitle="Daily procurement summaries, moisture quality audit reports, and DBT disbursal records"
        action={
          <button
            onClick={() => alert('Generating on-demand daily report...')}
            className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" /> Generate Audit Report
          </button>
        }
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Today's Procurement</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 mt-1">{totalProcuredToday.toLocaleString('en-IN')} Qtl</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">Recorded at Ludhiana Centre</p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">DBT Disbursal</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 mt-1">₹ {totalAmountToday.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-blue-700 mt-0.5">Direct to Bank via PFMS</p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Audit Status</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">100% Compliant</p>
          <p className="text-[10px] text-green-700 mt-0.5">All batches FCI verified</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <SearchBox
          placeholder="Search reports by title or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Reports Table Card */}
      <Card title="Available Official Procurement Reports" subtitle="Ministry of Consumer Affairs & Food Distribution standard archives">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Report Title</th>
                <th className="px-4 py-3 hidden sm:table-cell">Date Generated</th>
                <th className="px-4 py-3 hidden md:table-cell">Procured Tons</th>
                <th className="px-4 py-3 hidden md:table-cell">Farmers Served</th>
                <th className="px-4 py-3 hidden lg:table-cell">DBT Amount</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{report.reportId}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{report.title}</td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell font-mono">{report.dateGenerated}</td>
                  <td className="px-4 py-3 font-mono text-slate-700 hidden md:table-cell">{report.totalProcuredTons?.toLocaleString('en-IN')} MT</td>
                  <td className="px-4 py-3 text-slate-700 hidden md:table-cell">{report.farmersServed}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-800 hidden lg:table-cell">
                    ₹ {(report.dbtAmountDisbursed / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDownload(report)}
                      className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OfficerReports;
