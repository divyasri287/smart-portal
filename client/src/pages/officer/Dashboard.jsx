import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import {
  QrCode, Users, Scale, CheckCircle2, Search, FileText,
  History, ArrowRight, Clock, Wheat, TrendingUp, ShieldCheck
} from 'lucide-react';
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

const QuickActionCard = ({ icon: Icon, title, desc, onClick, color = 'green' }) => {
  const colors = {
    green: 'bg-green-800 hover:bg-green-900',
    amber: 'bg-amber-500 hover:bg-amber-600',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    slate: 'bg-slate-700 hover:bg-slate-800',
  };
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white rounded-xl p-5 text-left w-full group transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-white/20 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
      </div>
      <p className="font-semibold text-sm leading-tight">{title}</p>
      <p className="text-xs text-white/70 mt-1">{desc}</p>
    </button>
  );
};

export const OfficerDashboard = () => {
  const navigate = useNavigate();
  const liveQueue = queueData.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Procurement Officer Workstation"
        subtitle="Ludhiana Mandi Centre 4 · Inspector Vikram Sharma · Morning Shift (08:00 AM – 04:00 PM)"
        action={
          <PrimaryButton icon={QrCode} onClick={() => navigate('/officer/scan-qr')}>
            Scan QR Gate Token
          </PrimaryButton>
        }
      />

      {/* Officer Badge Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gradient-to-r from-green-800 to-green-700 text-white rounded-xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Badge: INS-PB-8891 · Centre: Ludhiana Mandi Centre 4</p>
            <p className="text-xs text-green-200 mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Today: 05 Sep 2026 · Shift Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs bg-white/20 rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          <span className="font-medium">On Duty</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Vehicles in Queue" value="12" subtitle="Active Mandi Bays" icon={Users} color="amber" />
        <StatsCard title="Tokens Verified" value="28 Today" subtitle="Gate Entry Passes" icon={QrCode} color="emerald" />
        <StatsCard title="Weight Logged" value="3,420 Qtl" subtitle="Digital Weighbridge" icon={Scale} color="blue" />
        <StatsCard title="Quality Approved" value="95%" subtitle="Moisture < 14%" icon={CheckCircle2} color="indigo" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickActionCard icon={QrCode} title="Scan QR Token" desc="Verify gate token" onClick={() => navigate('/officer/scan-qr')} color="green" />
          <QuickActionCard icon={Search} title="Search Farmer" desc="Find by name or ID" onClick={() => navigate('/officer/search-farmer')} color="amber" />
          <QuickActionCard icon={FileText} title="Procurement Summary" desc="Review & submit entry" onClick={() => navigate('/officer/submit-procurement')} color="indigo" />
          <QuickActionCard icon={History} title="History" desc="View past records" onClick={() => navigate('/officer/history')} color="slate" />
        </div>
      </div>

      {/* Live Queue Table */}
      <Card
        title="Live Mandi Queue & Inspection Status"
        subtitle="Real-time vehicle queue at this procurement centre"
        headerAction={
          <SecondaryButton onClick={() => navigate('/officer/queue')}>View Full Queue</SecondaryButton>
        }
      >
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Farmer</th>
                <th className="px-4 py-3 hidden sm:table-cell">Commodity</th>
                <th className="px-4 py-3 hidden md:table-cell">Entry Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {liveQueue.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{item.tokenNo}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-slate-800">{item.farmerName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.vehicleNo}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1">
                      <Wheat className="w-3 h-3 text-amber-500" /> {item.commodity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{item.gateEntryTime}</td>
                  <td className="px-4 py-3"><StatusPill status={item.status} /></td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/officer/farmer-details/${item.id}`)}
                      className="text-xs bg-green-800 hover:bg-green-900 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MSP Info Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { crop: 'Paddy (Grade A)', rate: '₹ 2,300 / Qtl', icon: '🌾' },
          { crop: 'Wheat', rate: '₹ 2,275 / Qtl', icon: '🌿' },
          { crop: 'Mustard', rate: '₹ 5,650 / Qtl', icon: '🟡' },
        ].map((item) => (
          <div key={item.crop} className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs text-slate-500 font-medium">MSP Rate 2026</p>
                <p className="text-xs font-bold text-slate-800">{item.crop}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-700">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{item.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerDashboard;
