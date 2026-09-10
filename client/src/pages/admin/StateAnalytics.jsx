import React from 'react';
import {
  BarChart2,
  Wheat,
  Users,
  CreditCard,
  Building2,
  TrendingUp,
  Award,
} from 'lucide-react';

const TOP_DISTRICTS = [
  { name: 'Ludhiana', state: 'Punjab', procurement: 4200, farmers: 980, centres: 2 },
  { name: 'Salem', state: 'Tamil Nadu', procurement: 3850, farmers: 870, centres: 2 },
  { name: 'Thanjavur', state: 'Tamil Nadu', procurement: 3600, farmers: 820, centres: 1 },
  { name: 'Karnal', state: 'Haryana', procurement: 3100, farmers: 720, centres: 1 },
  { name: 'Sangrur', state: 'Punjab', procurement: 2800, farmers: 650, centres: 1 },
  { name: 'Ambala', state: 'Haryana', procurement: 2500, farmers: 580, centres: 1 },
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
  // EXACT 4 SUMMARY CARDS SPECIFIED BY USER
  const summaryCards = [
    {
      label: 'Total Procurement',
      value: '24,680 MT',
      sub: 'Kharif Season Total',
      icon: Wheat,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      label: 'Total Farmers Served',
      value: '5,820',
      sub: 'Unique Beneficiaries',
      icon: Users,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      label: 'Total Payment Released',
      value: '₹ 56.12 Cr',
      sub: 'DBT Bank Clearance',
      icon: CreditCard,
      color: 'text-green-700 bg-green-50 border-green-200',
    },
    {
      label: 'Active Centres',
      value: '6 Operational',
      sub: 'Out of 8 Registered',
      icon: Building2,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER ── */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">
            <BarChart2 className="w-3.5 h-3.5" />
            State Level Analytics
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">State Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          State-wide procurement volume, farmer participation, and DBT disbursements
        </p>
      </div>

      {/* ── 4 SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {summaryCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500 truncate">{c.label}</p>
                <div className={`p-1.5 rounded-lg border ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">{c.value}</p>
              <p className="text-[11px] text-slate-400 mt-1 truncate">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── CHARTS ROW: ONE BAR CHART + ONE LINE CHART ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ONE CLEAN BAR CHART (Top Performing Districts) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-green-700" />
            <h2 className="font-bold text-sm text-slate-900">Top Performing Districts (Procurement MT)</h2>
          </div>
          <div className="space-y-3.5">
            {TOP_DISTRICTS.map((d) => {
              const pct = Math.round((d.procurement / BAR_MAX) * 100);
              return (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">
                      {d.name} <span className="text-slate-400 font-normal">({d.state})</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {d.procurement.toLocaleString()} MT
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 bg-green-800 rounded-full transition-all duration-300"
                      style={{ width: pct + '%' }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {d.farmers.toLocaleString()} farmers served · {d.centres} active centre{d.centres > 1 ? 's' : ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ONE SIMPLE LINE CHART (Monthly Procurement Trend) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <h2 className="font-bold text-sm text-slate-900">Monthly Procurement Trend (MT)</h2>
            </div>
            <div className="relative h-48 pt-2">
              <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="none">
                {/* Horizontal reference lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="30"
                    y1={15 + i * 35}
                    x2="310"
                    y2={15 + i * 35}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Line Path */}
                <polyline
                  points={MONTHLY_DATA.map((d, i) => {
                    const x = 35 + i * (265 / (MONTHLY_DATA.length - 1));
                    const y = 135 - Math.round((d.value / LINE_MAX) * 115);
                    return x + ',' + y;
                  }).join(' ')}
                  fill="none"
                  stroke="#166534"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Data Points and Labels */}
                {MONTHLY_DATA.map((d, i) => {
                  const x = 35 + i * (265 / (MONTHLY_DATA.length - 1));
                  const y = 135 - Math.round((d.value / LINE_MAX) * 115);
                  return (
                    <g key={d.month}>
                      <circle cx={x} cy={y} r="4" fill="#166534" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={x} y="152" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="500">
                        {d.month}
                      </text>
                      <text x={x} y={y - 7} textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">
                        {(d.value / 1000).toFixed(1)}k
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Monthly grain volume procured under MSP (Kharif Season 2026)
          </p>
        </div>
      </div>

      {/* ── ONE SMALL SUMMARY TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-slate-900">District Performance Summary</h2>
          <p className="text-xs text-slate-500 mt-0.5">Summary of top district procurement numbers</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Active Centres</th>
                <th className="py-3 px-4">Procurement (MT)</th>
                <th className="py-3 px-4">Farmers Served</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TOP_DISTRICTS.map((d) => (
                <tr key={d.name} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{d.name}</td>
                  <td className="py-3 px-4 text-slate-600">{d.state}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{d.centres} Mandis</td>
                  <td className="py-3 px-4 font-mono font-bold text-green-800">
                    {d.procurement.toLocaleString()} MT
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {d.farmers.toLocaleString()}
                  </td>
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
