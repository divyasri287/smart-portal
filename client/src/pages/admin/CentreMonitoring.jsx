import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, Filter, CheckCircle2, XCircle, Layers, ArrowRight, ShieldCheck, MapPin, Phone, User, Activity } from 'lucide-react';
import Modal from '../../components/dialogs/Modal';
import { centreMonitoringData, dashboardOverviewStats } from '../../data/adminData';

export const CentreMonitoring = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCentre, setSelectedCentre] = useState(null);

  const statuses = ['All', 'Active', 'Inactive'];

  const filteredCentres = centreMonitoringData.filter((c) => {
    const matchesSearch =
      c.centreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.centreCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/district-overview')} className="hover:text-[#166534]">
              District Overview
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">Centre Monitoring</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/payment-monitoring')} className="hover:text-[#166534]">
              Payment Monitoring
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Procurement Centre Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">
            Government Admin portal to monitor operational status, weighbridge capacity, and manager contact across all centres
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/payment-monitoring')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          Payment Monitoring <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Top Monitoring KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#166534]/10 text-[#166534]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Mandi Centres</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.totalCentres}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Registered Procurement Hubs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#15803D]/10 text-[#15803D]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Centres</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.activeCentres}</p>
            <p className="text-[11px] text-[#15803D] font-semibold mt-0.5">Operational & Live Procuring</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#d97706]/10 text-[#d97706]">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inactive Centres</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.inactiveCentres}</p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">Offline / Maintenance Yard</p>
          </div>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search particular centre, manager, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D] text-sm bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-52 px-3 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] bg-[#F8FAFC] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All Statuses (Active / Inactive)' : `Status: ${st}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clean Table: Centre | District | Status */}
        <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-slate-700 font-semibold border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-4">Centre Code</th>
                <th className="py-3 px-4">Centre Name</th>
                <th className="py-3 px-4">District (State)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredCentres.length > 0 ? (
                filteredCentres.map((c) => (
                  <tr key={c.centreCode} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#166534]">{c.centreCode}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#111827]">{c.centreName}</div>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <User className="w-3 h-3 text-slate-400" /> Manager: {c.manager}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {c.district} <span className="text-xs text-slate-400 font-normal">({c.state})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === 'Active'
                            ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {c.status === 'Active' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCentre(c)}
                        className="bg-white hover:bg-[#166534]/5 text-[#166534] border border-[#166534]/30 hover:border-[#166534] font-semibold rounded-lg px-3 py-1.5 transition-all text-xs shadow-2xs"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                    No centre matches your search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Centre Detail Modal ── */}
      {selectedCentre && (
        <Modal
          isOpen={Boolean(selectedCentre)}
          onClose={() => setSelectedCentre(null)}
          title={`Centre Information: ${selectedCentre.centreName}`}
        >
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#111827] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#166534]" /> {selectedCentre.centreName}
                </h4>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedCentre.status === 'Active'
                      ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {selectedCentre.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                District: <span className="font-semibold text-[#111827]">{selectedCentre.district}</span> ({selectedCentre.state})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white">
                <span className="text-[11px] font-sans text-slate-500 block">Centre Manager</span>
                <span className="font-bold text-[#111827] block truncate">{selectedCentre.manager}</span>
                <span className="text-xs text-slate-500 font-mono block mt-0.5">{selectedCentre.phone}</span>
              </div>

              <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white">
                <span className="text-[11px] font-sans text-slate-500 block">Capacity Utilized</span>
                <span className="font-bold text-[#166534] text-lg block">{selectedCentre.capacityUtilized}</span>
              </div>

              <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white">
                <span className="text-[11px] font-sans text-slate-500 block">Active Weighbridges</span>
                <span className="font-bold text-[#111827] block">{selectedCentre.activeWeighbridges} Weighbridges</span>
              </div>

              <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white">
                <span className="text-[11px] font-sans text-slate-500 block">Procured Today</span>
                <span className="font-bold text-[#15803D] block">{selectedCentre.procuredTodayTons} Tons</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCentre(null)}
                className="bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl px-5 py-2 text-sm shadow-xs transition-colors"
              >
                Close Modal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CentreMonitoring;

