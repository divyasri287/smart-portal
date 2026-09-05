import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ArrowRight, Building2, Layers, TrendingUp, CheckCircle2 } from 'lucide-react';
import { stateData, districtData } from '../../data/adminData';

export const StateOverview = () => {
  const navigate = useNavigate();
  const [selectedStateId, setSelectedStateId] = useState('ST-TN');
  const [search, setSearch] = useState('');

  const filtered = stateData.filter(s =>
    s.state.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );
  const selected = stateData.find(s => s.id === selectedStateId) || stateData[0];
  const matchDistricts = districtData.filter(d => d.state === selected.state);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span className="text-[#166534] font-bold">State Overview</span>
            <span>/</span><span>District</span><span>/</span><span>Centre</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">State & District Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">Hierarchy: State → District → Centre &nbsp;|&nbsp; Select a state card to drill down</p>
        </div>
        <button onClick={() => navigate('/admin/district-overview')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors">
          District Overview <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search state name or code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-[#15803D] bg-white" />
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-2 rounded-lg">
          {stateData.length} State Directorates
        </span>
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(st => {
          const isSelected = selectedStateId === st.id;
          return (
            <div key={st.id} onClick={() => setSelectedStateId(st.id)}
              className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all shadow-sm hover:shadow-md ${isSelected ? 'border-[#166534] ring-2 ring-[#166534]/20' : 'border-[#E5E7EB] hover:border-[#166534]/40'}`}>
              {/* State head */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#166534]/10 flex items-center justify-center text-sm font-black text-[#166534]">{st.code}</div>
                  <div>
                    <p className="font-bold text-[#111827]">{st.state}</p>
                    <p className="text-[11px] text-slate-400">{st.activeMandis} active mandis</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#166534] bg-[#166534]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />{st.growth}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Procurement Target</span>
                <span className="text-[#166534] font-mono">{st.completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                <div className="h-2 bg-[#166534] rounded-full" style={{ width: `${st.completionPercentage}%` }} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E7EB] text-xs">
                <div>
                  <p className="text-slate-400 font-medium">Achieved</p>
                  <p className="font-bold text-[#111827] font-mono">{(st.achievedTons / 100000).toFixed(1)}L MT</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">DBT Disbursed</p>
                  <p className="font-bold text-[#15803D] font-mono">₹{st.dbtDisbursedCr} Cr</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected State Drilldown */}
      {selected && (
        <div className="bg-white rounded-2xl border border-[#166534]/30 ring-1 ring-[#166534]/10 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#166534]" />
                <h2 className="font-bold text-lg text-[#111827]">{selected.state} — State Profile</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200">{selected.status}</span>
              </div>
              <p className="text-xs text-slate-500">Districts: {selected.districts.join(' · ')}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-medium">Season Target Progress</p>
              <p className="text-3xl font-black text-[#166534] font-mono">{selected.completionPercentage}%</p>
            </div>
          </div>

          {/* State stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Season Target', val: `${(selected.targetTons / 100000).toFixed(1)}L MT` },
              { label: 'Achieved', val: `${(selected.achievedTons / 100000).toFixed(1)}L MT`, green: true },
              { label: 'DBT Payout', val: `₹${selected.dbtDisbursedCr} Cr`, amber: true },
              { label: 'Farmers', val: selected.registeredFarmers.toLocaleString() },
            ].map(item => (
              <div key={item.label} className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-4">
                <p className="text-[11px] text-slate-400 font-medium">{item.label}</p>
                <p className={`text-lg font-bold font-mono mt-0.5 ${item.green ? 'text-[#166534]' : item.amber ? 'text-[#d97706]' : 'text-[#111827]'}`}>{item.val}</p>
              </div>
            ))}
          </div>

          {/* District breakdown within selected state */}
          {matchDistricts.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#111827] mb-3">Districts in {selected.state}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {matchDistricts.map(d => (
                  <div key={d.id} className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-3 space-y-1.5 hover:border-[#15803D] transition-colors">
                    <p className="font-bold text-sm text-[#111827]">{d.district}</p>
                    <p className="text-xs font-semibold text-[#15803D]">{d.activeCentres} Centres</p>
                    <p className="text-[11px] text-slate-400 font-mono">₹{d.dbtTotalCr} Cr DBT</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StateOverview;
