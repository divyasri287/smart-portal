import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock, ShieldCheck, Database } from 'lucide-react';

export const AnalyticsCards = ({ kpis }) => {
  const getIcon = (title) => {
    if (title.includes('Speed')) return Activity;
    if (title.includes('Moisture')) return ShieldCheck;
    if (title.includes('Payout')) return Clock;
    return Database;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = getIcon(kpi.title);
        const isPositive = kpi.change.startsWith('+');

        return (
          <div key={idx} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-[#166534]">
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                  isPositive
                    ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 block">{kpi.title}</span>
              <h3 className="text-2xl font-bold text-[#111827] font-mono mt-0.5 tracking-tight">{kpi.value}</h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1">{kpi.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsCards;
