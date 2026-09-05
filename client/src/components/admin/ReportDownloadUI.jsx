import React, { useState } from 'react';
import { Search, Download, FileText, FileSpreadsheet, CheckCircle2, Filter } from 'lucide-react';

export const ReportDownloadUI = ({ reports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const filteredReports = reports.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reportId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (report) => {
    setDownloadingId(report.reportId);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(`Downloaded "${report.title}" (${report.format}) successfully!`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#166534] flex items-center gap-3 text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#15803D] text-sm"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredReports.length} Official Reports
          </span>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => {
            const isDownloading = downloadingId === report.reportId;

            return (
              <div
                key={report.reportId}
                className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#15803D] bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-lg bg-emerald-100/70 text-[#166534] shrink-0">
                    {report.format.includes('CSV') ? (
                      <FileSpreadsheet className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#166534]">{report.reportId}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {report.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-base text-[#111827] mt-1">{report.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Generated: {report.dateGenerated} • Format: {report.format} ({report.fileSize})
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex justify-end">
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-lg px-4 py-2 transition-all text-sm shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportDownloadUI;
