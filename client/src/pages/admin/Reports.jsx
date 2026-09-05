import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, Download, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import ReportDownloadUI from '../../components/admin/ReportDownloadUI';
import { reportsData } from '../../data/adminData';

export const AdminReports = () => {
  const navigate = useNavigate();
  const totalReports = reportsData.length;
  const pdfCount = reportsData.filter((r) => r.format.includes('PDF')).length;
  const csvCount = reportsData.filter((r) => r.format.includes('CSV') || r.format.includes('Excel')).length;

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/analytics')} className="hover:text-[#166534]">
              Analytics
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">State Reports</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/users')} className="hover:text-[#166534]">
              Users
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Official State Reports & Download Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Government Admin portal to generate, view, and download official state procurement reports and raw transaction datasets
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/users')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          User Accounts <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Reports KPI Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#166534]/10 text-[#166534]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Reports</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{totalReports} Documents</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Official Government Publications</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#15803D]/10 text-[#15803D]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PDF Formats</p>
            <p className="text-2xl font-bold text-[#166534] mt-0.5 font-mono leading-tight">{pdfCount} PDF Files</p>
            <p className="text-[11px] text-[#15803D] font-semibold mt-0.5">Signed & Verified Audits</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#d97706]/10 text-[#d97706]">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CSV / Excel Datasets</p>
            <p className="text-2xl font-bold text-[#d97706] mt-0.5 font-mono leading-tight">{csvCount} Datasets</p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">Raw Analytics Exports</p>
          </div>
        </div>
      </div>

      {/* ── Reports List Download Center ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827] tracking-tight">Report Download Center</h2>
          <span className="text-xs font-semibold text-slate-500 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-lg">
            Showing {reportsData.length} Published Reports
          </span>
        </div>
        <ReportDownloadUI reports={reportsData} />
      </div>
    </div>
  );
};

export default AdminReports;

