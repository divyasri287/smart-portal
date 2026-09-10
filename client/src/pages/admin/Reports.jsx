import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Building2,
  Wheat,
  CreditCard,
  Users,
  X,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminReports = () => {
  const [reports, setReports] = useState(() => adminStorage.getReports());
  const [selectedReport, setSelectedReport] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);

  useEffect(() => {
    setReports(adminStorage.getReports());
  }, []);

  const handleDownloadPdf = (report) => {
    // Generate mock PDF download file
    const docContent = `
============================================================
GOVERNMENT OF INDIA
MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION
DIRECTORATE GENERAL OF PROCUREMENT & DBT OPERATIONS
============================================================
OFFICIAL REPORT: ${report.type.toUpperCase()}
PERIOD: ${report.period}
DATE GENERATED: ${report.dateGenerated}
------------------------------------------------------------
SUMMARY AUDIT PARAMETERS:
- Total Grain Procured: ${report.totalProcuredMT}
- Total DBT Payments Disbursed: ${report.totalDisbursedINR}
- Verified Farmers Served: ${report.farmersCount}
- Mandi Centres Monitored: ${report.centresCovered}
- Operational Observations: ${report.highlight || 'Normal operations'}
------------------------------------------------------------
CERTIFIED BY:
Dr. Sunita Verma, IAS
Director General of Procurement & DBT Operations
New Delhi HQ
============================================================
`;
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SPP_Govt_${report.type.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`${report.type} PDF downloaded successfully.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              Statutory Documentation
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Procurement Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Official government procurement audits, weighbridge statistics, and DBT settlement archives
          </p>
        </div>
      </div>

      {/* ── DOWNLOAD NOTICE ── */}
      {downloadNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* ── TOP STATS (MAX 4 CARDS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Season Procurement</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">24,680 MT</p>
          <p className="text-[11px] text-emerald-600 mt-1">18.5% Ahead of Last Year</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total DBT Disbursed</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">₹ 56.12 Cr</p>
          <p className="text-[11px] text-slate-400 mt-1">Direct to Bank Accounts</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Farmers Benefited</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">5,820</p>
          <p className="text-[11px] text-slate-400 mt-1">Unique Verified Beneficiaries</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Centres Covered</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">250 Mandis</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 36 Districts</p>
        </div>
      </div>

      {/* ── 3 CORE REPORT CARDS (EXACTLY AS SPECIFIED) ── */}
      <div>
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
          Available Procurement Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-600/60 hover:shadow-xs transition-all"
            >
              <div>
                {/* Badge & Type */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                    {report.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: {report.id}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {report.period}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Generated: {report.dateGenerated}</span>
                </p>

                {/* Key Metrics Breakdown */}
                <div className="my-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Grain Procured:</span>
                    <span className="font-mono font-bold text-slate-900">{report.totalProcuredMT}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DBT Disbursed:</span>
                    <span className="font-mono font-bold text-emerald-800">{report.totalDisbursedINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Farmers Benefited:</span>
                    <span className="font-mono font-bold text-slate-900">{report.farmersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coverage:</span>
                    <span className="font-medium text-slate-700">{report.centresCovered}</span>
                  </div>
                </div>

                {report.highlight && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong className="text-slate-800 font-semibold">Note: </strong>
                    {report.highlight}
                  </p>
                )}
              </div>

              {/* Action Buttons: View & Download PDF */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(report)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REPORT PREVIEW MODAL ── */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="font-bold text-base">{selectedReport.type} Preview</h3>
                  <p className="text-xs text-emerald-200">{selectedReport.period}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Document Info Strip */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                <span><strong>Report ID:</strong> {selectedReport.id}</span>
                <span><strong>Generated:</strong> {selectedReport.dateGenerated}</span>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-semibold">Total Grain Procured</p>
                  <p className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {selectedReport.totalProcuredMT}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-semibold">Total DBT Disbursed</p>
                  <p className="text-xl font-bold font-mono text-emerald-800 mt-1">
                    {selectedReport.totalDisbursedINR}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-semibold">Farmers Verified</p>
                  <p className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {selectedReport.farmersCount} Farmers
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-semibold">Centres Monitored</p>
                  <p className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {selectedReport.centresCovered}
                  </p>
                </div>
              </div>

              {/* Official Attestation */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>National Procurement Attestation</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  This report is certified under the National Food Security Act & Smart Procurement Portal. Moisture readings, gate weighbridge logs, and Aadhaar-linked DBT clearances match central repositories.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPdf(selectedReport)}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
