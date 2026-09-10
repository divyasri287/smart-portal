import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  XCircle,
  Wheat,
  Users,
  CreditCard,
  ShieldCheck,
  UserCheck,
  FileSpreadsheet,
  ArrowRight,
  Clock,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => adminStorage.getDashboardStats());
  const [pStats, setPStats] = useState(() => adminStorage.getPaymentStats());

  useEffect(() => {
    const sync = () => {
      setStats(adminStorage.getDashboardStats());
      setPStats(adminStorage.getPaymentStats());
    };
    sync();
    const interval = setInterval(sync, 2500);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { title: 'Total Centres', value: stats.totalCentres, subtitle: 'Registered Mandis', icon: Building2, color: 'green' },
    { title: 'Centres Open', value: stats.centresOpen, subtitle: 'Accepting Grain', icon: CheckCircle2, color: 'emerald' },
    { title: 'Centres Closed', value: stats.centresClosed, subtitle: 'Standby / Off-shift', icon: XCircle, color: 'rose' },
    { title: "Today's Procurement", value: stats.todayProcurement || '18,450 MT', subtitle: 'Weighbridge Recorded', icon: Wheat, color: 'amber' },
    { title: 'Total Registered Farmers', value: '5,820', subtitle: 'Aadhaar Verified', icon: Users, color: 'blue' },
    { title: 'Pending Payments', value: '₹ ' + pStats.pendingAmount.toLocaleString('en-IN'), subtitle: `${pStats.pendingCount} Farmers Awaiting`, icon: CreditCard, color: 'amber' },
    { title: 'Active Officers', value: stats.activeOfficers || 8, subtitle: 'On Yard Duty', icon: ShieldCheck, color: 'indigo' },
    { title: 'Active Managers', value: stats.activeManagers || 8, subtitle: 'Depot Chiefs', icon: UserCheck, color: 'violet' },
  ];

  const quickActions = [
    { title: 'View Centres', desc: 'Monitor status and open/close mandi gates', icon: Building2, link: '/admin/centre-monitoring' },
    { title: 'Manage Users', desc: 'Administer officers and centre managers', icon: Users, link: '/admin/users' },
    { title: 'View Payments', desc: 'Approve and clear pending DBT transactions', icon: CreditCard, link: '/admin/payments' },
    { title: 'Reports', desc: 'Download certified daily and monthly audit files', icon: FileSpreadsheet, link: '/admin/reports' },
  ];

  const recentActivities = [
    { id: 1, title: 'Recently Approved Payment', desc: 'Payment of ₹ 1,11,360 to S. Arumugam (Token TKN-TN-8843) marked as completed.', time: '12 mins ago', icon: CreditCard, iconColor: 'text-green-700 bg-green-50 border-green-200' },
    { id: 2, title: 'Newly Added Officer', desc: 'Officer INS-TN-5501 (P. Selvakumar) assigned to Salem Main Procurement Centre.', time: '45 mins ago', icon: ShieldCheck, iconColor: 'text-blue-700 bg-blue-50 border-blue-200' },
    { id: 3, title: 'Recently Opened Centre', desc: 'Thanjavur Direct Purchase Centre marked Open for farmer slot intake.', time: '2 hours ago', icon: Building2, iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  ];

  const iconStyles = {
    green: 'bg-green-50 text-green-800 border-green-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    violet: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
      </div>

      {/* ── 8 CLEAN SUMMARY STATS CARDS ── */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Today's Procurement Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {statCards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-500 truncate">{c.title}</p>
                  <div className={`p-1.5 rounded-lg border ${iconStyles[c.color] || iconStyles.green}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">{c.value}</p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">{c.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4 QUICK ACTIONS ── */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                type="button"
                onClick={() => navigate(action.link)}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-green-700 hover:shadow-xs transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-800 mb-3 group-hover:bg-green-800 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{action.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{action.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-800 group-hover:text-green-900">
                  <span>Open {action.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RECENT ACTIVITIES (SUBTITLE REMOVED) ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-slate-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/60 transition-colors">
                <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${act.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">{act.title}</p>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> {act.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
