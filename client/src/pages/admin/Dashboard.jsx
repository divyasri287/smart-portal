import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  CreditCard,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Wheat,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Zap,
  Landmark,
  Scale,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => adminStorage.getDashboardStats());
  const [centres, setCentres] = useState(() => adminStorage.getCentres());
  const [profile, setProfile] = useState(() => adminStorage.getProfile());
  const [pStats, setPStats] = useState(() => adminStorage.getPaymentStats());

  useEffect(() => {
    const sync = () => {
      setStats(adminStorage.getDashboardStats());
      setCentres(adminStorage.getCentres());
      setProfile(adminStorage.getProfile());
      setPStats(adminStorage.getPaymentStats());
    };
    sync();
    const interval = setInterval(sync, 2000);
    return () => clearInterval(interval);
  }, []);

  const summaryCards = [
    {
      title: 'Total Centres',
      value: stats.totalCentres,
      subtitle: 'Registered Mandi Depots',
      icon: Building2,
      color: 'emerald',
      badge: 'National Grid',
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      title: 'Centres Open',
      value: stats.centresOpen,
      subtitle: 'Active & Accepting Grain',
      icon: CheckCircle2,
      color: 'green',
      badge: 'Operational',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Centres Closed',
      value: stats.centresClosed,
      subtitle: 'Maintenance / Off-Shift',
      icon: XCircle,
      color: 'rose',
      badge: 'Standby',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      title: "Today's Farmers",
      value: stats.todayFarmers.toLocaleString('en-IN'),
      subtitle: 'Tokens Verified Today',
      icon: Users,
      color: 'blue',
      badge: 'Live Attendance',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: "Today's Procurement",
      value: stats.todayProcurement,
      subtitle: 'Paddy, Wheat & Millets',
      icon: Wheat,
      color: 'amber',
      badge: 'Weighbridge Total',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      title: 'Pending Payments',
      value: '₹ ' + pStats.pendingAmount.toLocaleString('en-IN'),
      subtitle: `${pStats.pendingCount} Farmers Awaiting DBT`,
      icon: Clock,
      color: 'amber',
      badge: 'DBT Batch Queue',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
  ];

  const quickActions = [
    {
      title: 'Monitor Mandi Centres',
      desc: 'Verify bay operations, toggle Open/Closed status, and oversee queues',
      icon: Building2,
      link: '/admin/centre-monitoring',
      buttonText: 'Open Centre Master',
    },
    {
      title: 'Manage Staff Directory',
      desc: 'Deploy procurement officers & assign managers across mandi centres',
      icon: Users,
      link: '/admin/users',
      buttonText: 'Administer Personnel',
    },
    {
      title: 'Batch DBT Payments',
      desc: 'Bulk approve farmer transactions & generate PFMS bank payment scrolls',
      icon: CreditCard,
      link: '/admin/payments',
      buttonText: 'Process DBT Batch',
    },
    {
      title: 'Procurement Reports',
      desc: 'Download certified Daily, Weekly and Monthly procurement summaries',
      icon: FileSpreadsheet,
      link: '/admin/reports',
      buttonText: 'Generate Audit Reports',
    },
  ];

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-12">
      {/* ── TOP WORKSTATION BANNER (AUTHORITATIVE GOVERNMENT THEME) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold bg-emerald-800 text-white shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              National Procurement Directorate
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              {profile.clearance || 'Level 4 National Admin'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Government Admin Directorate
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {profile.department} · <strong className="text-slate-900 font-semibold">{profile.adminName}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold shadow-2xs">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Kharif Harvest Season 2026</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            National MSP Grid: Synced & Active
          </p>
        </div>
      </div>

      {/* ── DBT BATCH NOTICE BANNER (IMMEDIATE ACTIONABLE VALUE) ── */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
        <div className="flex items-start md:items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-800/80 border border-emerald-600/50 text-amber-300 shrink-0">
            <Zap className="w-5 h-5 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                DBT Statutory Clearing Mandate
              </span>
              <span className="text-[10px] bg-emerald-700 text-emerald-100 px-2 py-0.2 rounded-full font-mono font-bold">
                &lt; 48 Hours SLA
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">
              Currently <strong className="text-white font-bold">{pStats.pendingCount} farmers</strong> awaiting payment clearance (Total: <strong className="text-white font-mono font-bold">₹ {pStats.pendingAmount.toLocaleString('en-IN')}</strong>).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/payments')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          <CreditCard className="w-4 h-4 text-slate-950" />
          <span>Process DBT Batch Run</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── 6 SUMMARY CARDS (EXACTLY AS SPECIFIED) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            Today's Procurement Summary
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real-time LocalStorage State</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {summaryCards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 truncate">{c.title}</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1 tracking-tight">
                    {c.value}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-2 truncate">{c.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CORE ADMIN QUICK ACTIONS ── */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3">
          Administrative Workstation Controls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-700 hover:shadow-xs transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(action.link)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <span>{action.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RECENT CENTRES STATUS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900">Procurement Centres Live State</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live operational status, queue congestion, and active handling capacity
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/centre-monitoring')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All {centres.length} Centres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Centre Name</th>
                <th className="py-3 px-4">District & State</th>
                <th className="py-3 px-4">Manager In-Charge</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Today's Queue</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {centres.slice(0, 5).map((centre) => {
                const isOpen = centre.status === 'Open';
                return (
                  <tr key={centre.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
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
                            'w-1.5 h-1.5 rounded-full ' + (isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600')
                          }
                        />
                        <span>{centre.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {centre.todayQueue} Vehicles
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {centre.capacityMT} MT/day
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate('/admin/centre-monitoring')}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        Monitor
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
