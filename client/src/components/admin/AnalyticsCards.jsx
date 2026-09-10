import React from 'react';

const AnalyticsCards = ({ kpis = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">{item.icon}</div>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{item.value}</p>
          <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
