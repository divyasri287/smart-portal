import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  X,
  Power,
  Phone,
  Mail,
  MapPin,
  Scale,
  Activity,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const CentreMonitoring = () => {
  const [centres, setCentres] = useState(() => adminStorage.getCentres());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Open' | 'Closed'
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  useEffect(() => {
    setCentres(adminStorage.getCentres());
  }, []);

  const handleToggleStatus = (centre) => {
    const updated = adminStorage.toggleCentreStatus(centre.id);
    setCentres(adminStorage.getCentres());
    if (selectedCentre && selectedCentre.id === centre.id) {
      setSelectedCentre(updated);
    }
    setActionNotice(
      `Centre "${centre.name}" is now ${updated.status.toUpperCase()}.`
    );
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Filtered centres
  const filteredCentres = centres.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCentres = centres.length;
  const openCount = centres.filter((c) => c.status === 'Open').length;
  const closedCount = centres.filter((c) => c.status === 'Closed').length;
  const totalQueue = centres.reduce((sum, c) => sum + (c.todayQueue || 0), 0);

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              Depot Infrastructure
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Procurement Centre Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time status, operational gate control, and live queue oversight across all Mandis
          </p>
        </div>
      </div>

      {/* ── ACTION NOTICE TOAST ── */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* ── TOP SUMMARY CARDS (MAX 4 AS SPECIFIED) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-slate-500">Total Centres</p>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{totalCentres}</p>
          <p className="text-[11px] text-slate-400 mt-1">Registered Mandis</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-emerald-700">Centres Open</p>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono">{openCount}</p>
          <p className="text-[11px] text-emerald-600 mt-1">Accepting Farmer Slots</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-rose-700">Centres Closed</p>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-800 font-mono">{closedCount}</p>
          <p className="text-[11px] text-rose-500 mt-1">Standby / Off-shift</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-slate-500">Total Queue</p>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{totalQueue}</p>
          <p className="text-[11px] text-slate-400 mt-1">Vehicles in Line</p>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by centre name or district..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter:</span>
          {['All', 'Open', 'Closed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ' +
                (statusFilter === st
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
              }
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── CENTRES TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Centre Name</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4">Manager</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Today's Queue</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredCentres.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No procurement centres found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCentres.map((centre) => {
                  const isOpen = centre.status === 'Open';
                  return (
                    <tr key={centre.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-emerald-800 shrink-0" />
                          <span>{centre.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {centre.district}, {centre.state}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {centre.manager}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                            (isOpen
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200')
                          }
                        >
                          <span
                            className={
                              'w-1.5 h-1.5 rounded-full ' +
                              (isOpen ? 'bg-emerald-600' : 'bg-rose-600')
                            }
                          />
                          <span>{centre.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {centre.todayQueue} Vehicles
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          {/* View Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedCentre(centre)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>View</span>
                          </button>

                          {/* Open Centre / Close Centre Button */}
                          {isOpen ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(centre)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                              title="Close this centre for slot booking"
                            >
                              <Power className="w-3.5 h-3.5 text-rose-600" />
                              <span>Close Centre</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(centre)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                              title="Open this centre for slot booking"
                            >
                              <Power className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Open Centre</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── VIEW CENTRE DETAILS MODAL ── */}
      {selectedCentre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="font-bold text-base">{selectedCentre.name}</h3>
                  <p className="text-xs text-emerald-200 font-mono">
                    ID: {selectedCentre.id} · {selectedCentre.district}, {selectedCentre.state}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCentre(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Centre Status Banner */}
              <div
                className={
                  'p-3 rounded-xl border flex items-center justify-between ' +
                  (selectedCentre.status === 'Open'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900')
                }
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span
                    className={
                      'w-2 h-2 rounded-full ' +
                      (selectedCentre.status === 'Open'
                        ? 'bg-emerald-600 animate-pulse'
                        : 'bg-rose-600')
                    }
                  />
                  <span>Status: {selectedCentre.status.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(selectedCentre)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border shadow-2xs hover:bg-slate-50 cursor-pointer"
                >
                  {selectedCentre.status === 'Open' ? 'Close Centre Now' : 'Open Centre Now'}
                </button>
              </div>

              {/* Grid Attributes */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <p className="text-[11px] font-semibold text-slate-500">Active Weighbridge Bays</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
                    {selectedCentre.activeBays} Bays
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <p className="text-[11px] font-semibold text-slate-500">Daily Handling Capacity</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
                    {selectedCentre.capacityMT} MT / Day
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <p className="text-[11px] font-semibold text-slate-500">Vehicles in Queue</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
                    {selectedCentre.todayQueue} Vehicles
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <p className="text-[11px] font-semibold text-slate-500">Today's Procurement</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
                    {selectedCentre.todayProcuredMT} MT
                  </p>
                </div>
              </div>

              {/* Manager Contact Info */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Centre Manager In-Charge
                </p>
                <p className="text-sm font-bold text-slate-900">{selectedCentre.manager}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCentre.managerPhone}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCentre.managerEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCentre(null)}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 text-xs cursor-pointer"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentreMonitoring;
