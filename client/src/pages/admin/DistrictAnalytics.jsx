import React, { useState, useMemo } from 'react';
import { Search, BarChart2 } from 'lucide-react';

const DISTRICT_DATA = [
  { name: 'Ludhiana', state: 'Punjab', centres: 2, procurement: 4200, todayProcurement: 215, paymentStatus: '100% Cleared' },
  { name: 'Salem', state: 'Tamil Nadu', centres: 2, procurement: 3850, todayProcurement: 142, paymentStatus: '98% Disbursed' },
  { name: 'Thanjavur', state: 'Tamil Nadu', centres: 1, procurement: 3600, todayProcurement: 178, paymentStatus: '96% Disbursed' },
  { name: 'Karnal', state: 'Haryana', centres: 1, procurement: 3100, todayProcurement: 111, paymentStatus: '95% Disbursed' },
  { name: 'Sangrur', state: 'Punjab', centres: 1, procurement: 2800, todayProcurement: 95, paymentStatus: '100% Cleared' },
  { name: 'Ambala', state: 'Haryana', centres: 1, procurement: 2500, todayProcurement: 84, paymentStatus: '94% Disbursed' },
  { name: 'Erode', state: 'Tamil Nadu', centres: 1, procurement: 2100, todayProcurement: 0, paymentStatus: '100% Cleared' },
  { name: 'Namakkal', state: 'Tamil Nadu', centres: 1, procurement: 1530, todayProcurement: 0, paymentStatus: '100% Cleared' },
];

const BAR_MAX = Math.max(...DISTRICT_DATA.map((d) => d.procurement));

export const DistrictAnalytics = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return DISTRICT_DATA.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">District Analytics</h1>
      </div>

      {/* ── SEARCH DISTRICT ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search district name or state..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-green-700 bg-slate-50/60"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Showing {filtered.length} of {DISTRICT_DATA.length} Districts
        </span>
      </div>

      {/* ── COMPARISON BAR CHART ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-green-700" />
          <h2 className="font-bold text-sm text-slate-900">District Procurement Comparison (MT)</h2>
        </div>
        <div className="space-y-3">
          {filtered.map((d) => {
            const pct = Math.round((d.procurement / BAR_MAX) * 100);
            return (
              <div key={d.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">
                    {d.name} <span className="text-slate-400 font-normal">({d.state})</span>
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {d.procurement.toLocaleString()} MT
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 bg-green-800 rounded-full transition-all duration-300"
                    style={{ width: pct + '%' }}
                  />
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">No districts match your search.</p>
          )}
        </div>
      </div>

      {/* ── DISTRICT RANKING TABLE (SUBTITLE REMOVED) ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-slate-900">District Ranking Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">District Name</th>
                <th className="py-3 px-4">Total Centres</th>
                <th className="py-3 px-4">Total Procurement</th>
                <th className="py-3 px-4">Today's Procurement</th>
                <th className="py-3 px-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d, index) => (
                <tr key={d.name} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-500">
                    #{index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{d.name}</p>
                    <p className="text-[10px] text-slate-400">{d.state}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {d.centres} Mandis
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-green-800 text-sm">
                    {d.procurement.toLocaleString()} MT
                  </td>
                  <td className="py-3 px-4">
                    {d.todayProcurement > 0 ? (
                      <span className="font-mono font-semibold text-slate-900">
                        {d.todayProcurement} MT
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">0 (Closed)</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-800 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      {d.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No district records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistrictAnalytics;
