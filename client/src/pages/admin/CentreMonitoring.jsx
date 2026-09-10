import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  CheckCircle2,
  Eye,
  Power,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const CentreMonitoring = () => {
  const [centres, setCentres] = useState(() => adminStorage.getCentres());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setCentres(adminStorage.getCentres());
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleToggleStatus = (centre) => {
    const updated = adminStorage.toggleCentreStatus(centre.id);
    setCentres(adminStorage.getCentres());
    if (selectedCentre && selectedCentre.id === centre.id) {
      setSelectedCentre(updated);
    }
    showToast(`Centre "${centre.name}" is now ${updated.status.toUpperCase()}.`);
  };

  const filtered = centres.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase()) ||
      c.manager.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCentres = centres.length;
  const openCount = centres.filter((c) => c.status === 'Open').length;
  const closedCount = centres.filter((c) => c.status === 'Closed').length;
  const totalQueue = centres.reduce((sum, c) => sum + (c.todayQueue || 0), 0);

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Centre Monitoring</h1>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── 4 SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Centres</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{totalCentres}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Registered Mandis</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-green-700">Centres Open</p>
          <p className="text-2xl font-extrabold text-green-800 font-mono mt-1">{openCount}</p>
          <p className="text-[11px] text-green-600 mt-0.5">Accepting Farmer Slots</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-rose-700">Centres Closed</p>
          <p className="text-2xl font-extrabold text-rose-700 font-mono mt-1">{closedCount}</p>
          <p className="text-[11px] text-rose-500 mt-0.5">Standby / Off-shift</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Current Queue</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{totalQueue}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Total Vehicles in Line</p>
        </div>
      </div>

      {/* ── SEARCH & STATUS FILTER ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search centre name, district, or manager..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-green-700 bg-slate-50/60"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
          {['All', 'Open', 'Closed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-green-800 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── CENTRES TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Centre Name</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4">Manager</th>
                <th className="py-3.5 px-4">Current Queue</th>
                <th className="py-3.5 px-4">Today's Procurement</th>
                <th className="py-3.5 px-4">Centre Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No procurement centres found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const isOpen = c.status === 'Open';
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-green-800 shrink-0" />
                          <span>{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {c.district}, {c.state}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-semibold">
                        {c.manager}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {c.todayQueue} Vehicles
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-green-800">
                        {c.todayProcuredMT} MT
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            isOpen
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOpen ? 'bg-green-600 animate-pulse' : 'bg-rose-600'
                            }`}
                          />
                          <span>{c.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedCentre(c)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>View</span>
                          </button>

                          {isOpen ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(c)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Power className="w-3.5 h-3.5 text-rose-600" />
                              <span>Close Centre</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(c)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors cursor-pointer"
                            >
                              <Power className="w-3.5 h-3.5 text-green-700" />
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-200" />
                <h3 className="font-bold text-base">{selectedCentre.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCentre(null)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-600">Current Gate Status:</span>
                <span className={`font-bold ${selectedCentre.status === 'Open' ? 'text-green-800' : 'text-rose-700'}`}>
                  {selectedCentre.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-400 font-semibold">Today's Queue</p>
                  <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                    {selectedCentre.todayQueue} Vehicles
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-400 font-semibold">Today's Procurement</p>
                  <p className="text-lg font-bold text-green-800 font-mono mt-0.5">
                    {selectedCentre.todayProcuredMT} MT
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Manager In-Charge
                </p>
                <p className="text-sm font-bold text-slate-900">{selectedCentre.manager}</p>
                <p className="text-slate-600 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {selectedCentre.managerPhone}
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {selectedCentre.managerEmail}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedCentre)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer border ${
                  selectedCentre.status === 'Open'
                    ? 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100'
                    : 'text-green-800 bg-green-50 border-green-200 hover:bg-green-100'
                }`}
              >
                {selectedCentre.status === 'Open' ? 'Close Centre' : 'Open Centre'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCentre(null)}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentreMonitoring;
