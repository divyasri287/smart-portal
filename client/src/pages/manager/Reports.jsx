import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Building2,
  CheckCircle2,
  Scale,
  IndianRupee,
  X,
  Printer,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';

export const ManagerReports = () => {
  const reports = managerStorage.getReports();
  const profile = managerStorage.getProfile();

  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'weekly' | 'monthly'
  const [viewModalReport, setViewModalReport] = useState(null);

  const currentReport = reports[activeTab];

  const handleDownloadPDF = (report) => {
    setViewModalReport(report);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* Printable styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report-modal, #printable-report-modal * {
            visibility: visible;
          }
          #printable-report-modal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Procurement Reports</h1>
        <p className="text-xs text-slate-500 mt-1">
          Official statutory procurement summary for {profile.centreName || 'Salem Main Procurement Centre #402'}
        </p>
      </div>

      {/* ── 3 REPORT SUMMARY CARDS (TODAY, WEEKLY, MONTHLY) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's Report */}
        <div
          onClick={() => setActiveTab('today')}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-2xs ${
            activeTab === 'today'
              ? 'border-emerald-700 ring-2 ring-emerald-100'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Daily Report
            </span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Today's Report</h2>
          <p className="text-xs text-slate-500 mt-0.5">{reports.today.date}</p>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Farmers Procured:</span>
              <strong className="text-slate-800">{reports.today.farmersProcured}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Quantity:</span>
              <strong className="text-emerald-800 font-mono">
                {reports.today.totalQuantityQtl.toLocaleString('en-IN')} Qtl
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Value:</span>
              <strong className="text-slate-900 font-mono">
                ₹{reports.today.totalAmountRupees.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewModalReport(reports.today);
              }}
              className="flex-1 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Report</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF(reports.today);
              }}
              className="py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1 transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Weekly Report */}
        <div
          onClick={() => setActiveTab('weekly')}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-2xs ${
            activeTab === 'weekly'
              ? 'border-emerald-700 ring-2 ring-emerald-100'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
              7-Day Summary
            </span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Weekly Report</h2>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{reports.weekly.period}</p>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Farmers Procured:</span>
              <strong className="text-slate-800">{reports.weekly.farmersProcured}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Quantity:</span>
              <strong className="text-emerald-800 font-mono">
                {reports.weekly.totalQuantityQtl.toLocaleString('en-IN')} Qtl
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Value:</span>
              <strong className="text-slate-900 font-mono">
                ₹{reports.weekly.totalAmountRupees.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewModalReport(reports.weekly);
              }}
              className="flex-1 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Report</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF(reports.weekly);
              }}
              className="py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1 transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Monthly Report */}
        <div
          onClick={() => setActiveTab('monthly')}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-2xs ${
            activeTab === 'monthly'
              ? 'border-emerald-700 ring-2 ring-emerald-100'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
              Monthly Roll-up
            </span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Monthly Report</h2>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{reports.monthly.period}</p>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Farmers Procured:</span>
              <strong className="text-slate-800">{reports.monthly.farmersProcured}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Quantity:</span>
              <strong className="text-emerald-800 font-mono">
                {reports.monthly.totalQuantityQtl.toLocaleString('en-IN')} Qtl
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Value:</span>
              <strong className="text-slate-900 font-mono">
                ₹{reports.monthly.totalAmountRupees.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewModalReport(reports.monthly);
              }}
              className="flex-1 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Report</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF(reports.monthly);
              }}
              className="py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1 transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── SELECTED REPORT BREAKDOWN TABLE (NO CHARTS / NO GRAPHS) ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{currentReport.title}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {currentReport.date || currentReport.period} · {currentReport.centre}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewModalReport(currentReport)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Full Report</span>
            </button>
            <button
              type="button"
              onClick={() => handleDownloadPDF(currentReport)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Category / Entry</th>
                <th className="px-5 py-3.5 text-center">Farmers Handled</th>
                <th className="px-5 py-3.5 text-right">Quantity (Qtl)</th>
                <th className="px-5 py-3.5 text-right">Procurement Value (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {currentReport.breakdown?.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-semibold text-slate-900">
                    {row.crop || row.day || row.month}
                  </td>
                  <td className="px-5 py-3.5 text-center font-mono">{row.farmers}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-emerald-800 font-bold">
                    {row.quantityQtl.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
              <tr>
                <td className="px-5 py-3.5 uppercase text-xs">Total Consolidations</td>
                <td className="px-5 py-3.5 text-center font-mono">{currentReport.farmersProcured}</td>
                <td className="px-5 py-3.5 text-right font-mono text-emerald-900">
                  {currentReport.totalQuantityQtl.toLocaleString('en-IN')} Qtl
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-emerald-900">
                  ₹{currentReport.totalAmountRupees.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── PRINT / VIEW REPORT MODAL ── */}
      {viewModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            id="printable-report-modal"
            className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-2xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Government Official Header */}
            <div className="text-center border-b-2 border-emerald-800 pb-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="w-6 h-6 text-emerald-800" />
                <span className="font-bold text-sm tracking-widest text-emerald-900 uppercase">
                  Government of India · Ministry of Consumer Affairs
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                SMART PROCUREMENT PORTAL - STATUTORY REPORT
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-1">
                {viewModalReport.centre} · Code: {profile.centreCode || 'CEN-TN-SLM-402'}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Report Type: <strong className="text-slate-800">{viewModalReport.title}</strong> ({viewModalReport.date || viewModalReport.period})
              </p>
            </div>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Farmers</span>
                <span className="text-xl font-black text-slate-900 font-mono">{viewModalReport.farmersProcured}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Grain Weight</span>
                <span className="text-xl font-black text-emerald-800 font-mono">{viewModalReport.totalQuantityQtl.toLocaleString('en-IN')} Qtl</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Disbursed</span>
                <span className="text-xl font-black text-slate-900 font-mono">₹{viewModalReport.totalAmountRupees.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Table of Details */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Itemised Procurement Breakdown
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-center">Farmers</th>
                    <th className="p-2.5 text-right">Quantity (Qtl)</th>
                    <th className="p-2.5 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {viewModalReport.breakdown?.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-medium">{item.crop || item.day || item.month}</td>
                      <td className="p-2.5 text-center font-mono">{item.farmers}</td>
                      <td className="p-2.5 text-right font-mono">{item.quantityQtl.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono font-bold">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statutory Sign-off */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
              <div>
                <p>System Generated Document</p>
                <p className="font-mono">Timestamp: {new Date().toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <div className="h-10 border-b border-slate-300 w-48 mb-1"></div>
                <p className="font-bold text-slate-800">{profile.name || 'Anil Kumar'}</p>
                <p className="text-[10px]">Centre Manager, Salem Main Centre</p>
              </div>
            </div>

            {/* Modal Controls (Hidden in Print) */}
            <div className="no-print pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewModalReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerReports;
