import React from 'react';

const ReportDownloadUI = ({ reports = [] }) => {
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div key={report.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h3 className="font-semibold text-slate-900">{report.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{report.format} • {report.period}</p>
          </div>
          <button className="rounded-xl bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800">
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportDownloadUI;
