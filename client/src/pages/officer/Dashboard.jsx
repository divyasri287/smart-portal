import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/cards/Card';
import {
  QrCode,
  Users,
  Scale,
  CheckCircle2,
  Clock,
  Wheat,
  TrendingUp,
  Building2,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

const statusConfig = {
  'In Queue': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Quality Verified': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Weight Logged': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  'Pending Verification': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  'Receipt Generated': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
};

const StatusPill = ({ status }) => {
  const cfg = statusConfig[status] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

export const OfficerDashboard = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setQueue(officerStorage.getQueue());
    setHistory(officerStorage.getHistory());
    setProfile(officerStorage.getProfile());
  }, []);

  const liveQueue = queue.slice(0, 6);

  // 4 KPI Card Metrics
  const vehiclesInQueue = queue.filter(q => q.status === 'In Queue' || q.status === 'Pending Verification' || q.status === 'Quality Verified' || q.status === 'Weight Logged').length;
  const tokensVerified = history.length > 0 ? history.length : queue.filter(q => q.status === 'Receipt Generated').length + 18;
  const totalWeightLogged = history.reduce((sum, h) => sum + (h.netWeightQtl || 0), 0);
  const displayWeight = totalWeightLogged > 0 ? totalWeightLogged : 1420;
  const qualityApprovedCount = history.filter(h => h.gradeResult === 'Grade A' || h.gradeResult === 'FAQ').length;
  const qualityPassRate = history.length > 0 ? Math.round((qualityApprovedCount / history.length) * 100) : 96;

  // Format Inspector name cleanly without "Inspector Inspector" duplication
  const getCleanInspectorName = (rawName) => {
    if (!rawName) return 'Inspector Vikram Sharma';
    const trimmed = rawName.trim();
    return trimmed.toLowerCase().startsWith('inspector') ? trimmed : `Inspector ${trimmed}`;
  };

  const handleInspect = (item) => {
    officerStorage.setActiveSession({
      tokenNo: item.tokenNo,
      farmerId: item.id,
      farmerName: item.farmerName,
      vehicleNo: item.vehicleNo,
      commodity: item.commodity,
      bayAssigned: item.bayAssigned,
      district: item.district || 'Ludhiana, Punjab',
    });

    if (item.status === 'Quality Verified') {
      navigate('/officer/weight-check');
    } else if (item.status === 'Weight Logged') {
      navigate('/officer/submit-procurement');
    } else {
      navigate(`/officer/farmer-details/${item.id}`);
    }
  };

  return (
    <div className="space-y-4 select-none cursor-default">
      {/* A. MANDI WORKSTATION HEADER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white rounded-xl p-4 sm:p-4.5 shadow-xs border border-emerald-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-white tracking-tight">
                {profile.centreAssigned || 'Ludhiana Mandi Centre 4'}
              </h1>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded-md font-mono border border-emerald-600/40">
                Bay 1 – 6 Active
              </span>
            </div>
            <p className="text-xs text-emerald-200 flex items-center gap-2 mt-0.5">
              <span className="font-semibold">{getCleanInspectorName(profile.name)}</span>
              <span className="text-emerald-400">·</span>
              <span className="font-mono text-[11px] text-emerald-300">{profile.badgeNo || 'INS-PB-8891'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50 text-[11px] text-emerald-200 font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shift: {profile.shift || '08:00 AM – 04:00 PM'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-400/20 px-2.5 py-1 rounded-lg border border-emerald-300/30 text-[11px] font-bold text-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>On-Duty</span>
          </div>
        </div>
      </div>

      {/* B. EXACTLY 4 COMPACT KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Vehicles in Queue */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Vehicles in Queue</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">{vehiclesInQueue}</p>
            <p className="text-[11px] text-amber-700 font-medium mt-1">Waiting at Mandi Bays</p>
          </div>
        </div>

        {/* 2. Tokens Verified */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Tokens Verified</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">{tokensVerified}</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">Receipts Processed</p>
          </div>
        </div>

        {/* 3. Weight Logged */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Weight Logged</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">
              {displayWeight.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">Qtl</span>
            </p>
            <p className="text-[11px] text-blue-700 font-medium mt-1">Digital Weighbridge</p>
          </div>
        </div>

        {/* 4. Quality Approved */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Quality Approved</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">{qualityPassRate}%</p>
            <p className="text-[11px] text-indigo-700 font-medium mt-1">Moisture permissible &lt; 14%</p>
          </div>
        </div>
      </div>

      {/* C. LIVE MANDI QUEUE & VEHICLE INSPECTION STATUS */}
      <Card title="Live Mandi Queue & Vehicle Inspection Status">
        <div className="overflow-x-auto -mx-1">
          {liveQueue.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-semibold text-slate-600">No vehicles waiting in queue</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Use "Scan QR Gate Token" to intake arriving farmers.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                  <th className="px-3.5 py-2.5">Token No</th>
                  <th className="px-3.5 py-2.5">Farmer & Vehicle</th>
                  <th className="px-3.5 py-2.5 hidden sm:table-cell">Commodity</th>
                  <th className="px-3.5 py-2.5 hidden md:table-cell">Bay</th>
                  <th className="px-3.5 py-2.5 hidden lg:table-cell">Entry Time</th>
                  <th className="px-3.5 py-2.5">Status</th>
                  <th className="px-3.5 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {liveQueue.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono text-xs font-bold text-slate-900 whitespace-nowrap">
                      {item.tokenNo}
                    </td>
                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-slate-800">{item.farmerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.vehicleNo}</div>
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-700 hidden sm:table-cell whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Wheat className="w-3 h-3 text-amber-500" /> {item.commodity}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-600 hidden md:table-cell whitespace-nowrap">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-[11px]">
                        {item.bayAssigned}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-500 hidden lg:table-cell font-mono whitespace-nowrap">
                      {item.gateEntryTime || '09:15 AM'}
                    </td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap">
                      <StatusPill status={item.status} />
                    </td>
                    <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleInspect(item)}
                        className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* D. MSP RATES KHARIF 2026 REFERENCE STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { crop: 'Paddy (Grade A)', rate: '₹ 2,300 / Qtl', icon: '🌾' },
          { crop: 'Wheat', rate: '₹ 2,275 / Qtl', icon: '🌿' },
          { crop: 'Mustard', rate: '₹ 5,650 / Qtl', icon: '🟡' },
        ].map((item) => (
          <div
            key={item.crop}
            className="bg-amber-50/70 border border-amber-200/80 rounded-lg px-3.5 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">MSP Kharif 2026</p>
                <p className="text-xs font-bold text-slate-800">{item.crop}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-800">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-bold font-mono">{item.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerDashboard;
