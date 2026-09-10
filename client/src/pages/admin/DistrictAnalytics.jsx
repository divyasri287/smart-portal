import React, { useState, useMemo } from 'react';
import { MapPin, Search, BarChart2 } from 'lucide-react';

const DISTRICT_DATA = [
  { name: 'Ludhiana', state: 'Punjab', centres: 2, procurement: 4200, farmers: 980, todayProcurement: 215 },
  { name: 'Salem', state: 'Tamil Nadu', centres: 2, procurement: 3850, farmers: 870, todayProcurement: 142 },
  { name: 'Thanjavur', state: 'Tamil Nadu', centres: 1, procurement: 3600, farmers: 820, todayProcurement: 178 },
  { name: 'Karnal', state: 'Haryana', centres: 1, procurement: 3100, farmers: 720, todayProcurement: 111 },
  { name: 'Sangrur', state: 'Punjab', centres: 1, procurement: 2800, farmers: 650, todayProcurement: 95 },
  { name: 'Ambala', state: 'Haryana', centres: 1, procurement: 2500, farmers: 580, todayProcurement: 84 },
  { name: 'Erode', state: 'Tamil Nadu', centres: 1, procurement: 2100, farmers: 480, todayProcurement: 0 },
  { name: 'Namakkal', state: 'Tamil Nadu', centres: 1, procurement: 1530, farmers: 350, todayProcurement: 0 },
];

const BAR_MAX = Math.max(...DISTRICT_DATA.map((d) => d.procurement));

export const DistrictAnalytics = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    DISTRICT_DATA.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  return (
    <div className="space-y-6 pb-10 font-sans select-none">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <MapPin className="w-3.5 h-3.5" />
            District Level
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">District Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Compare districts by procurement volume, farmers served, and today's activity</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: 'Districts Monitored', value: DISTRICT_DATA.length },
          { label: 'Total Centres', value: DISTRICT_DATA.reduce((s, d) => s + d.centres, 0) },
          { label: 'Total Procurement', value: DISTRICT_DATA.reduce((s, d) => s + d.procurement, 0).toLocaleString() + ' MT' },
          { label: 'Total Farmers', value: DISTRICT_DATA.reduce((s, d) => s + d.farmers, 0).toLocaleString() },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search district or state..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
          {filtered.length} of {DISTRICT_DATA.length} Districts
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-emerald-700" />
            <h2 className="font-bold text-sm text-slate-900">District-wise Procurement (MT)</h2>
          </div>
          <div className="space-y-3">
            {filtered.map((d) => {
              const pct = Math.round((d.procurement / BAR_MAX) * 100);
              return (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      {d.name} <span className="text-slate-400 font-normal">({d.state})</span>
                    </span>
                    <span className="font-mono text-slate-500">{d.procurement.toLocaleString()} MT</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 bg-emerald-700 rounded-full" style={{ width: pct + '%' }} />
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No districts match your search.</p>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-bold text-sm text-slate-900">District Summary Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Centres</th>
                  <th className="py-3 px-3">Total (MT)</th>
                  <th className="py-3 px-3">Farmers</th>
                  <th className="py-3 px-3">Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-slate-800">{d.name}</p>
                      <p className="text-[10px] text-slate-400">{d.state}</p>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{d.centres}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{d.procurement.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-slate-600">{d.farmers.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      {d.todayProcurement > 0
                        ? <span className="font-mono font-bold text-emerald-700">{d.todayProcurement} MT</span>
                        : <span className="text-slate-300 text-[10px]">Closed</span>
                      }
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">No districts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictAnalytics;
