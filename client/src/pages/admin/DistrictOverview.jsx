import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Landmark, ArrowRight, Search, CheckCircle2, ShieldCheck, BarChart2 } from 'lucide-react';
import DistrictTable from '../../components/admin/DistrictTable';
import { districtData, stateData } from '../../data/adminData';

export const DistrictOverview = () => {
  const navigate = useNavigate();
  const [selectedStateFilter, setSelectedStateFilter] = useState('Tamil Nadu');
  const [districtSearch, setDistrictSearch] = useState('');

  const totalProcuredQuintals = districtData.reduce((acc, d) => acc + d.totalProcuredQuintals, 0);
  const totalDbtCr = districtData.reduce((acc, d) => acc + d.dbtTotalCr, 0).toFixed(1);
  const totalActiveMandis = districtData.reduce((acc, d) => acc + d.activeCentres, 0);

  const filteredDistricts = districtData.filter((d) => {
    const matchesState = selectedStateFilter === 'All' || d.state === selectedStateFilter;
    const matchesSearch =
      d.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
      d.state.toLowerCase().includes(districtSearch.toLowerCase());
    return matchesState && matchesSearch;
  });

  const states = ['Tamil Nadu', 'Punjab', 'Haryana', 'All'];

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/state-overview')} className="text-[#166534] font-bold hover:underline">
              State Overview
            </button>
            <span>/</span>
            <span className="text-[#111827] font-bold">District Overview</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/centre-monitoring')} className="hover:text-[#166534]">
              Centre Monitoring
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">District-Level Procurement Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">
            Hierarchy: State  ➔  District  ➔  Centre &nbsp;|&nbsp; District-wise grain volume, mandi clusters, and compliance ledger
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/centre-monitoring')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          Centre Monitoring <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#166534]/10 text-[#166534]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monitored Districts</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{districtData.length} Districts</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">TN, Punjab, Haryana</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#15803D]/10 text-[#15803D]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Mandi Clusters</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{totalActiveMandis} Mandis</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Operational Procurement Yards</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#0369a1]/10 text-[#0369a1]">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Procured Volume</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{(totalProcuredQuintals / 1000).toFixed(0)}K Qtl</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Verified Weighbridge Net Volume</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#d97706]/10 text-[#d97706]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total District DBT</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">₹ {totalDbtCr} Cr</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Disbursed to Farmer Accounts</p>
          </div>
        </div>
      </div>

      {/* ── State Selector & District Grid ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-bold text-lg text-[#111827]">State Mandi Clusters</h2>
            <p className="text-xs text-slate-500 font-medium">Select a state to filter district procurement status</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E5E7EB]">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedStateFilter === st
                    ? 'bg-[#166534] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#166534] hover:bg-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* District Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDistricts.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] hover:border-[#15803D] hover:bg-white transition-all space-y-2 group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#166534] shrink-0" />
                  <span className="font-bold text-sm text-[#111827]">{d.district}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200">
                  {d.status}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-semibold text-[#15803D] font-mono">{d.activeCentres} Operational Mandis</p>
                <p className="text-slate-500 text-[11px] font-medium">
                  State: <span className="font-semibold text-[#111827]">{d.state}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">{(d.totalProcuredQuintals / 1000).toFixed(0)}K Qtl</span>
                <span className="font-bold text-[#166534]">₹{d.dbtTotalCr} Cr DBT</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full District Performance Ledger Table ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827] tracking-tight">District Performance Ledger</h2>
          <span className="text-xs font-semibold text-slate-500 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-lg">
            Showing {filteredDistricts.length} District Records
          </span>
        </div>
        <DistrictTable districts={filteredDistricts} />
      </div>
    </div>
  );
};

export default DistrictOverview;

