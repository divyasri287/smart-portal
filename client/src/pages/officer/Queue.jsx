import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import SearchBox from '../../components/inputs/SearchBox';
import { QrCode, Eye, Wheat, Clock, Users } from 'lucide-react';
import queueData from '../../data/queue.json';

const statusConfig = {
  'In Queue': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Quality Verified': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Weight Logged': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  'Pending Verification': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  'Receipt Generated': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
};

const StatusPill = ({ status }) => {
  const cfg = statusConfig[status] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

export const Queue = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const statuses = ['All', 'In Queue', 'Pending Verification', 'Quality Verified', 'Weight Logged', 'Receipt Generated'];

  const filtered = queueData.filter((item) => {
    const matchSearch =
      item.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      item.tokenNo.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicleNo.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || item.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    total: queueData.length,
    inQueue: queueData.filter((i) => i.status === 'In Queue').length,
    pendingVerification: queueData.filter((i) => i.status === 'Pending Verification').length,
    done: queueData.filter((i) => i.status === 'Receipt Generated').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Today's Queue"
        subtitle="Real-time list of vehicles arriving at procurement bays · 05 Sep 2026"
        action={
          <button
            onClick={() => navigate('/officer/scan-qr')}
            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <QrCode className="w-4 h-4" /> Scan QR
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Vehicles', value: counts.total, icon: Users, color: 'text-slate-700 bg-slate-50 border-slate-200' },
          { label: 'In Queue', value: counts.inQueue, icon: Clock, color: 'text-amber-700 bg-amber-50 border-amber-200' },
          { label: 'Pending Verify', value: counts.pendingVerification, icon: Eye, color: 'text-rose-700 bg-rose-50 border-rose-200' },
          { label: 'Completed', value: counts.done, icon: Wheat, color: 'text-green-700 bg-green-50 border-green-200' },
        ].map((s) => (
          <div key={s.label} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${s.color}`}>
            <s.icon className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xl font-bold leading-none">{s.value}</p>
              <p className="text-[11px] font-medium mt-0.5 opacity-80">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBox
            placeholder="Search by token, farmer name, or vehicle no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                filter === s
                  ? 'bg-green-800 text-white border-green-800'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-green-700 hover:text-green-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="px-4 py-3">Token No</th>
                <th className="px-4 py-3">Farmer</th>
                <th className="px-4 py-3 hidden sm:table-cell">Vehicle</th>
                <th className="px-4 py-3 hidden md:table-cell">Commodity</th>
                <th className="px-4 py-3 hidden md:table-cell">Bay</th>
                <th className="px-4 py-3 hidden lg:table-cell">Entry Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400 text-sm">
                    No records match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{item.tokenNo}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-slate-800">{item.farmerName}</div>
                      <div className="text-[11px] text-slate-400">{item.id}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 hidden sm:table-cell">{item.vehicleNo}</td>
                    <td className="px-4 py-3 text-xs text-slate-700 hidden md:table-cell">{item.commodity}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 hidden md:table-cell">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">{item.bayAssigned}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 hidden lg:table-cell">{item.gateEntryTime}</td>
                    <td className="px-4 py-3"><StatusPill status={item.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => navigate(`/officer/farmer-details/${item.id}`)}
                          className="text-[11px] bg-green-800 hover:bg-green-900 text-white font-medium px-2.5 py-1.5 rounded-md transition-colors"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => navigate('/officer/scan-qr')}
                          className="text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium px-2.5 py-1.5 rounded-md transition-colors"
                        >
                          <QrCode className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 px-1 text-[11px] text-slate-400">
          Showing {filtered.length} of {queueData.length} records
        </div>
      </Card>
    </div>
  );
};

export default Queue;
