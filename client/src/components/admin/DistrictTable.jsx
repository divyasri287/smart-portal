import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DistrictTable = ({ districts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = ['All', ...new Set(districts.map((d) => d.state))];

  const filteredDistricts = districts.filter((d) => {
    const matchesSearch =
      d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || d.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search district or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#15803D] focus:border-[#15803D] text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-[#E5E7EB] text-[#111827] bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All States' : st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4">Active Mandis</th>
              <th className="py-3 px-4">Procured (Quintals)</th>
              <th className="py-3 px-4">DBT Total</th>
              <th className="py-3 px-4">Quality Pass Rate</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#111827] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#166534] shrink-0" />
                    {row.district}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{row.state}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-mono font-medium">{row.activeCentres} Mandis</td>
                  <td className="py-3.5 px-4 text-[#111827] font-mono font-semibold">
                    {row.totalProcuredQuintals.toLocaleString()} Qtl
                  </td>
                  <td className="py-3.5 px-4 text-[#15803D] font-mono font-bold">
                    ₹ {row.dbtTotalCr} Cr
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{row.moisturePassRate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'Optimal'
                          ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                          : row.status === 'High Volume'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {row.status === 'Optimal' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                  No district data matches your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictTable;
