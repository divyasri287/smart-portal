import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import {
  ShieldCheck, MapPin, Clock, Edit3, BarChart3,
  CheckCircle2, TrendingUp, Award, Zap, Star
} from 'lucide-react';
import officersData from '../../data/officers.json';

const StatBadge = ({ icon: Icon, label, value, color = 'green' }) => {
  const colors = {
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  };
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center ${colors[color]}`}>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold leading-none">{value}</p>
      <p className="text-[11px] font-medium opacity-80 leading-tight">{label}</p>
    </div>
  );
};

export const OfficerProfile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const officer = officersData[0];

  const todayStats = [
    { icon: CheckCircle2, label: 'Tokens Verified', value: '28', color: 'green' },
    { icon: BarChart3, label: 'Avg. Process Time', value: '14 min', color: 'blue' },
    { icon: TrendingUp, label: 'Quality Pass Rate', value: '96.4%', color: 'indigo' },
    { icon: Zap, label: 'Rejections Today', value: '1', color: 'amber' },
  ];

  const performanceStats = [
    { label: 'Total Procurements (Season)', value: '342', icon: Award },
    { label: 'Total Weight Logged (Qtl)', value: '18,420', icon: BarChart3 },
    { label: 'Total MSP Paid (₹)', value: '₹ 4.2 Cr', icon: TrendingUp },
    { label: 'Farmer Satisfaction Score', value: '4.8 / 5', icon: Star },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Procurement Officer — Personal & Professional Details"
        action={
          <SecondaryButton icon={Edit3} onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel Edit' : 'Edit Profile'}
          </SecondaryButton>
        }
      />

      {/* Profile Hero */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold">VS</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{officer.name}</h2>
            <p className="text-green-200 mt-1 text-sm">Procurement Inspector · Food Corporation of India</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-green-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Badge: {officer.badgeNo}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {officer.centreAssigned}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {officer.shift}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-xl px-4 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-300 animate-pulse" />
              <span className="text-sm font-bold">On Duty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Performance */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Today's Performance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {todayStats.map((s) => (
            <StatBadge key={s.label} icon={s.icon} label={s.label} value={s.value} color={s.color} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Details */}
        <Card title="Officer Details" subtitle="Personal and assignment information">
          {editing ? (
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: officer.name, name: 'name' },
                { label: 'Badge Number', value: officer.badgeNo, name: 'badge' },
                { label: 'Centre Assigned', value: officer.centreAssigned, name: 'centre' },
                { label: 'Shift', value: officer.shift, name: 'shift' },
              ].map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors"
                  />
                </div>
              ))}
              <PrimaryButton className="w-full justify-center" onClick={() => setEditing(false)}>
                Save Changes
              </PrimaryButton>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: officer.name },
                { label: 'Officer ID', value: officer.id, mono: true },
                { label: 'Badge Number', value: officer.badgeNo, mono: true },
                { label: 'Centre Assigned', value: officer.centreAssigned },
                { label: 'Current Shift', value: officer.shift },
                { label: 'Status', value: officer.status, badge: true },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-xs text-slate-400 font-medium min-w-[120px]">{row.label}</span>
                  {row.badge ? (
                    <span className="text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                      {row.value}
                    </span>
                  ) : (
                    <span className={`text-xs font-semibold text-slate-800 text-right ${row.mono ? 'font-mono' : ''}`}>
                      {row.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Season Performance */}
        <Card title="Season Performance" subtitle="Kharif 2026 statistics">
          <div className="space-y-4">
            {performanceStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <stat.icon className="w-4 h-4 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-base font-bold text-slate-900 font-mono leading-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-800">Performance Rating</p>
                <p className="text-xs text-amber-600 mt-0.5">Based on season 2026 metrics</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-700">A+</p>
                <div className="flex gap-0.5 mt-1 justify-end">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={`text-sm ${s <= 4 ? 'text-amber-500' : 'text-amber-300'}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Today's Queue", path: '/officer/queue' },
            { label: 'Scan QR Token', path: '/officer/scan-qr' },
            { label: 'Search Farmer', path: '/officer/search-farmer' },
            { label: 'View History', path: '/officer/history' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="text-sm font-semibold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-400 rounded-xl px-4 py-3 transition-all text-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OfficerProfile;
