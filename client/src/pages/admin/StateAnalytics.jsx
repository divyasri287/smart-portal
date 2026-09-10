import React from 'react';
import { BarChart2, TrendingUp, Users, Wheat, Building2, Award } from 'lucide-react';

const TOP_DISTRICTS = [
  { name: 'Ludhiana', procurement: 4200, farmers: 980, centres: 2 },
  { name: 'Salem', procurement: 3850, farmers: 870, centres: 2 },
  { name: 'Thanjavur', procurement: 3600, farmers: 820, centres: 1 },
  { name: 'Karnal', procurement: 3100, farmers: 720, centres: 1 },
  { name: 'Sangrur', procurement: 2800, farmers: 650, centres: 1 },
  { name: 'Ambala', procurement: 2500, farmers: 580, centres: 1 },
];

const MONTHLY_DATA = [
  { month: 'Apr', value: 1800 },
  { month: 'May', value: 2400 },
  { month: 'Jun', value: 2100 },
  { month: 'Jul', value: 3200 },
  { month: 'Aug', value: 4600 },
  { month: 'Sep', value: 3900 },
];

const BAR_MAX = Math.max(...TOP_DISTRICTS.map((d) => d.procurement));
const LINE_MAX = Math.max(...MONTHLY_DATA.map((d) => d.value));

export const StateAnalytics = () => {
  return (
    <div className="space-y-6 pb-10 font-sans select-none">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <BarChart2 className="w-3.5 h-3.5" />
            State Level
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">State Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kharif Season 2026 — State-wide procurement summary</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: 'Total Procurement', value: '24,680 MT', icon: Wheat, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Farmers Served', value: '5,820', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Procurement Value', value: '₹ 56.12 Cr', icon: TrendingUp, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Active Centres', value: '6', icon: Building2, color: 'text-violet-700', bg: 'bg-violet-50 border-violet-100' },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500">{c.label}</p>
                <div className={'p-1.5 rounded-lg border ' + c.bg}>
                  <Icon className={'w-3.5 h-3.5 ' + c.color} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">{c.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-emerald-700" />
            <h2 className="font-bold text-sm text-slate-900">Top Performing Districts</h2>
          </div>
          <div className="space-y-3.5">
            {TOP_DISTRICTS.map((d) => {
              const pct = Math.round((d.procurement / BAR_MAX) * 100);
              return (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{d.name}</span>
                    <span className="font-mono text-slate-500">{d.procurement.toLocaleString()} MT</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 bg-emerald-700 rounded-full" style={{ width: pct + '%' }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{d.farmers.toLocaleString()} farmers · {d.centres} centre{d.centres > 1 ? 's' : ''}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h2 className="font-bold text-sm text-slate-900">Monthly Procurement (MT)</h2>
          </div>
          <div className="relative h-44">
            <svg viewBox="0 0 300 150" className="w-full h-full" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="30" y1={8 + i * 35} x2="295" y2={8 + i * 35} stroke="#e2e8f0" strokeWidth="1" />
              ))}
              <polyline
                points={MONTHLY_DATA.map((d, i) => {
                  const x = 30 + (i * (265 / (MONTHLY_DATA.length - 1)));
                  const y = 138 - Math.round((d.value / LINE_MAX) * 130);
                  return x + ',' + y;
                }).join(' ')}
                fill="none"
                stroke="#166534"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {MONTHLY_DATA.map((d, i) => {
                const x = 30 + (i * (265 / (MONTHLY_DATA.length - 1)));
                const y = 138 - Math.round((d.value / LINE_MAX) * 130);
                return (
                  <g key={d.month}>
                    <circle cx={x} cy={y} r="4" fill="#166534" />
                    <text x={x} y="148" textAnchor="middle" fontSize="9" fill="#94a3b8">{d.month}</text>
                    <text x={x} y={y - 7} textAnchor="middle" fontSize="8" fill="#166534" fontWeight="700">
                      {(d.value / 1000).toFixed(1)}K
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1">MT procured per month (Apr – Sep 2026)</p>
        </div>
      </div>

      {/* District summary table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-slate-900">District Summary</h2>
          <p className="text-xs text-slate-400 mt-0.5">All districts sorted by procurement volume</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Centres</th>
                <th className="py-3 px-4">Procurement (MT)</th>
                <th className="py-3 px-4">Farmers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TOP_DISTRICTS.map((d) => (
                <tr key={d.name} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{d.name}</td>
                  <td className="py-3 px-4 text-slate-600">{d.centres}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{d.procurement.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-600">{d.farmers.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StateAnalytics;
