import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  X,
  ShieldCheck,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminReports = () => {
  const [reports, setReports] = useState(() => adminStorage.getReports());
  const [selectedReport, setSelectedReport] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setReports(adminStorage.getReports());
  }, []);

  const handleDownloadPdf = (report) => {
    const text = `============================================================
GOVERNMENT OF INDIA - MINISTRY OF CONSUMER AFFAIRS
SMART PROCUREMENT PORTAL (SIH 2026)
------------------------------------------------------------
OFFICIAL PROCUREMENT REPORT: ${report.type.toUpperCase()}
PERIOD: ${report.period}
GENERATED: ${report.dateGenerated}
------------------------------------------------------------
Total Procurement: ${report.totalProcuredMT}
Total DBT Disbursed: ${report.totalDisbursedINR}
Verified Farmers Served: ${report.farmersCount}
Centres Monitored: ${report.centresCovered}
Remarks: ${report.highlight}
============================================================
Certified by:
Dr. Sunita Verma, IAS
Director General of Procurement
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SPP_Govt_${report.type.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNotice(`${report.type} downloaded successfully.`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports</h1>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── 3 CORE REPORT CARDS ── */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-green-700 hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-800 border border-green-200">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    {report.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: {report.id}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{report.period}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Generated: {report.dateGenerated}</span>
                </p>

                <div className="my-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Grain Procured:</span>
                    <span className="font-mono font-bold text-slate-900">{report.totalProcuredMT}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DBT Disbursed:</span>
                    <span className="font-mono font-bold text-green-800">{report.totalDisbursedINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Farmers Served:</span>
                    <span className="font-mono font-bold text-slate-900">{report.farmersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coverage:</span>
                    <span className="font-medium text-slate-700">{report.centresCovered}</span>
                  </div>
                </div>

                {report.highlight && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Note: </strong> {report.highlight}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(report)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white bg-green-800 hover:bg-green-700 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VIEW REPORT PREVIEW MODAL ── */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-green-200" />
                <h3 className="font-bold text-base">{selectedReport.type} Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 font-mono">
                <span>Period: {selectedReport.period}</span>
                <span>Generated: {selectedReport.dateGenerated}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500">Grain Procured</p>
                  <p className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {selectedReport.totalProcuredMT}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500">DBT Disbursed</p>
                  <p className="text-xl font-bold font-mono text-green-800 mt-1">
                    {selectedReport.totalDisbursedINR}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-green-900 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-green-800" />
                  <span>Government Attestation</span>
                </div>
                <p className="text-[11px] text-green-800">
                  Official certified summary approved under the Ministry of Consumer Affairs, Food &amp; Public Distribution.
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
                className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
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
