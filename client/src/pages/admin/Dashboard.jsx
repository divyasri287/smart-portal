import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Wheat,
  ArrowRight,
  CalendarDays,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => adminStorage.getDashboardStats());
  const [profile, setProfile] = useState(() => adminStorage.getProfile());
  const [pStats, setPStats] = useState(() => adminStorage.getPaymentStats());

  useEffect(() => {
    const sync = () => {
      setStats(adminStorage.getDashboardStats());
      setProfile(adminStorage.getProfile());
      setPStats(adminStorage.getPaymentStats());
    };
    sync();
    const interval = setInterval(sync, 3000);
    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    { title: 'Total Centres', value: stats.totalCentres, sub: 'Procurement Mandis', icon: Building2, iconColor: 'text-emerald-800', iconBg: 'bg-emerald-50 border-emerald-100' },
    { title: 'Centres Open', value: stats.centresOpen, sub: 'Active and Accepting', icon: CheckCircle2, iconColor: 'text-emerald-700', iconBg: 'bg-emerald-50 border-emerald-100' },
    { title: 'Centres Closed', value: stats.centresClosed, sub: 'Standby / Off-shift', icon: XCircle, iconColor: 'text-rose-600', iconBg: 'bg-rose-50 border-rose-100' },
    { title: 'Registered Farmers', value: '5,820', sub: 'Verified Beneficiaries', icon: Users, iconColor: 'text-blue-700', iconBg: 'bg-blue-50 border-blue-100' },
    { title: "Today's Bookings", value: stats.todayFarmers.toLocaleString('en-IN'), sub: 'Tokens Issued Today', icon: CalendarDays, iconColor: 'text-violet-700', iconBg: 'bg-violet-50 border-violet-100' },
    { title: "Today's Procurement", value: stats.todayProcurement, sub: 'Weighbridge Total', icon: Wheat, iconColor: 'text-amber-700', iconBg: 'bg-amber-50 border-amber-100' },
    { title: 'Pending Payments', value: '₹ ' + pStats.pendingAmount.toLocaleString('en-IN'), sub: pStats.pendingCount + ' Farmers Awaiting DBT', icon: Clock, iconColor: 'text-amber-700', iconBg: 'bg-amber-50 border-amber-100' },
  ];

  const quickActions = [
    { label: 'View Centres', desc: 'Monitor and control procurement centres', link: '/admin/centre-monitoring', icon: Building2 },
    { label: 'Manage Users', desc: 'Administer officers and centre managers', link: '/admin/users', icon: Users },
    { label: 'View Payments', desc: 'Process pending DBT payments to farmers', link: '/admin/payments', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 pb-10 font-sans select-none">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Government Admin Portal
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {profile.adminName} · {profile.department}
        </p>
      </div>

      {/* 4 top metric cards */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Today's Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCards.slice(0, 4).map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-500">{c.title}</p>
                  <div className={'p-1.5 rounded-lg border ' + c.iconBg}>
                    <Icon className={'w-3.5 h-3.5 ' + c.iconColor} />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 font-mono">{c.value}</p>
                <p className="text-[11px] text-slate-400 mt-1">{c.sub}</p>
              </div>
            );
          })}
        </div>
        {/* 3 bottom metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {metricCards.slice(4).map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-500">{c.title}</p>
                  <div className={'p-1.5 rounded-lg border ' + c.iconBg}>
                    <Icon className={'w-3.5 h-3.5 ' + c.iconColor} />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 font-mono leading-tight">{c.value}</p>
                <p className="text-[11px] text-slate-400 mt-1">{c.sub}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-700 hover:shadow-xs transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{action.label}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{action.desc}</p>
                <button
                  type="button"
                  onClick={() => navigate(action.link)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
