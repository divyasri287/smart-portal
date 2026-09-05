import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Landmark, Building2, Users, ArrowRight,
  Activity, CheckCircle2, Clock, Layers, TrendingUp,
  BarChart3, FileText, ShieldCheck
} from 'lucide-react';
import {
  adminProfile, dashboardOverviewStats, stateData,
  analyticsData, paymentMonitoringData
} from '../../data/adminData';

/* ── tiny reusable primitives (only used inside this page) ── */
const KpiCard = ({ title, value, sub, icon: Icon, accent = '#166534' }) => (
  <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
    <div className="p-3 rounded-xl shrink-0" style={{ background: `${accent}18` }}>
      <Icon className="w-5 h-5" style={{ color: accent }} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">{title}</p>
      <p className="text-xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{value}</p>
      {sub && <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">{sub}</p>}
    </div>
  </div>
);

const NavBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#111827] bg-[#F8FAFC] hover:bg-[#166534]/5 hover:text-[#166534] border border-[#E5E7EB] hover:border-[#166534]/30 transition-all group"
  >
    <span>{label}</span>
    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] group-hover:translate-x-0.5 transition-all" />
  </button>
);

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    { title: 'Total States', value: dashboardOverviewStats.totalStates, sub: 'Monitored Directorates', icon: MapPin, accent: '#166534' },
    { title: 'Total Districts', value: dashboardOverviewStats.totalDistricts, sub: 'Active Mandi Clusters', icon: Building2, accent: '#15803D' },
    { title: 'Total Centres', value: dashboardOverviewStats.totalCentres, sub: 'Registered Procurement Yards', icon: Layers, accent: '#0369a1' },
    { title: 'Active Centres', value: dashboardOverviewStats.activeCentres, sub: `${dashboardOverviewStats.inactiveCentres} Inactive`, icon: CheckCircle2, accent: '#166534' },
    { title: 'Total Payments', value: dashboardOverviewStats.totalPayments, sub: 'Overall Allocated Budget', icon: Landmark, accent: '#b45309' },
    { title: 'Pending Payments', value: dashboardOverviewStats.pendingPayments, sub: 'In Clearing Process', icon: Clock, accent: '#d97706' },
  ];

  return (
    <div className="space-y-7">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-[#166534]/10 text-[#166534] border border-[#166534]/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Government Admin
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">National Procurement Control Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">{adminProfile.department} &nbsp;|&nbsp; {adminProfile.name}</p>
        </div>
        <button
          onClick={() => navigate('/admin/state-overview')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <MapPin className="w-4 h-4" /> State Overview
        </button>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k) => <KpiCard key={k.title} {...k} />)}
      </div>

      {/* ── State Summary Strip ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#111827]">State Procurement Progress</h2>
          <button onClick={() => navigate('/admin/state-overview')} className="text-xs font-semibold text-[#15803D] hover:underline flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateData.slice(0, 3).map((st) => (
            <div key={st.id} onClick={() => navigate('/admin/state-overview')}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-5 cursor-pointer hover:border-[#166534]/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#166534]/10 flex items-center justify-center text-xs font-black text-[#166534]">{st.code}</div>
                  <div>
                    <p className="font-bold text-sm text-[#111827]">{st.state}</p>
                    <p className="text-[11px] text-slate-400">{st.activeMandis} Mandis</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#166534] bg-[#166534]/10 px-2 py-0.5 rounded-full">{st.growth}</span>
              </div>
              <div className="mb-1 flex justify-between text-[11px] font-semibold">
                <span className="text-slate-500">Target Progress</span>
                <span className="text-[#166534] font-mono">{st.completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-[#166534] rounded-full transition-all" style={{ width: `${st.completionPercentage}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-xs">
                <span className="text-slate-500">{(st.achievedTons / 100000).toFixed(1)}L MT achieved</span>
                <span className="font-semibold text-[#15803D] font-mono">₹{st.dbtDisbursedCr} Cr DBT</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Grid: Activity Feed + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Analytics mini-cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#111827]">Analytics Summary</h2>
            <button onClick={() => navigate('/admin/analytics')} className="text-xs font-semibold text-[#15803D] hover:underline flex items-center gap-1">Full Analytics <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analyticsData.kpis.slice(0, 2).map((k) => (
              <div key={k.title} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{k.title}</p>
                <p className="text-2xl font-bold text-[#111827] font-mono mt-1">{k.value}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#166534]" />
                  <span className="text-xs font-semibold text-[#166534]">{k.change}</span>
                  <span className="text-[11px] text-slate-400">{k.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="font-bold text-sm text-[#111827] mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#166534]" /> Recent Government Activities
            </h3>
            <div className="space-y-3">
              {analyticsData.recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.type === 'success' ? 'bg-[#166534]' : act.type === 'warning' ? 'bg-amber-500' : act.type === 'payment' ? 'bg-blue-500' : 'bg-slate-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-[#111827] leading-snug">{act.text}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Navigation Controls */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#111827]">Admin Controls</h2>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm space-y-2">
            <NavBtn label="Monitor All Centres" onClick={() => navigate('/admin/centre-monitoring')} />
            <NavBtn label="State / District Monitoring" onClick={() => navigate('/admin/state-overview')} />
            <NavBtn label="Payment Monitoring" onClick={() => navigate('/admin/payment-monitoring')} />
            <NavBtn label="Analytics Dashboard" onClick={() => navigate('/admin/analytics')} />
            <NavBtn label="State Reports & Downloads" onClick={() => navigate('/admin/reports')} />
            <NavBtn label="User Roles & Access" onClick={() => navigate('/admin/users')} />
            <NavBtn label="Admin Profile" onClick={() => navigate('/admin/profile')} />
          </div>

          {/* Payment Quick Summary */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-[#111827]">Payment Quick View</h3>
            {[
              { label: 'Total', value: dashboardOverviewStats.totalPayments, color: '#166534' },
              { label: 'Completed', value: dashboardOverviewStats.completedPayments, color: '#15803D' },
              { label: 'Pending', value: dashboardOverviewStats.pendingPayments, color: '#d97706' },
              { label: 'Failed', value: dashboardOverviewStats.failedPayments, color: '#dc2626' },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">{r.label}</span>
                <span className="font-bold font-mono" style={{ color: r.color }}>{r.value}</span>
              </div>
            ))}
            <button onClick={() => navigate('/admin/payment-monitoring')}
              className="w-full mt-1 text-xs font-semibold text-[#166534] border border-[#166534]/30 hover:bg-[#166534]/5 py-2 rounded-lg transition-colors">
              View Full Payment Ledger →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
