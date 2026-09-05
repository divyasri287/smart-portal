import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Filter, TrendingUp, Landmark, MapPin, Building2, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import AnalyticsCards from '../../components/admin/AnalyticsCards';
import { analyticsData } from '../../data/adminData';

export const Analytics = () => {
  const navigate = useNavigate();
  const [season, setSeason] = useState('Kharif 2026');

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/payment-monitoring')} className="hover:text-[#166534]">
              Payment Monitoring
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">Analytics</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/reports')} className="hover:text-[#166534]">
              State Reports
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">National Procurement Analytics & Insights</h1>
          <p className="text-sm text-slate-500 mt-1">
            Government Admin portal for analyzing overall system throughput, volume progression, and DBT financial velocity
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#E5E7EB] text-sm shadow-2xs">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="bg-transparent font-semibold text-[#166534] focus:outline-none cursor-pointer"
            >
              <option value="Kharif 2026">Season: Kharif 2026</option>
              <option value="Rabi 2025">Season: Rabi 2025</option>
              <option value="Kharif 2025">Season: Kharif 2025</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/admin/reports')}
            className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            State Reports <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Top 4 Analytics KPI Cards ── */}
      <AnalyticsCards kpis={analyticsData.kpis} />

      {/* ── Analytics Visual Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Statistics & Payment Trends Bar Visualizer */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
            <div>
              <h3 className="font-bold text-lg text-[#111827]">Monthly Procurement & Payment Growth</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Grain Volume vs. Payment Disbursement Velocity ({season})
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#166534] inline-block" />
                <span className="text-slate-700">Procured Volume (MT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#F59E0B] inline-block" />
                <span className="text-slate-700">Payments Disbursed (₹ Cr)</span>
              </div>
            </div>
          </div>

          {/* Bar chart container */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-[#E5E7EB] pb-2 font-mono text-xs">
            {analyticsData.monthlyStatistics.map((item) => {
              const maxVal = 2000000;
              const heightVol = Math.max(15, (item.volumeMT / maxVal) * 100);
              const heightPay = Math.max(15, (item.paymentsCr / 20) * 100);

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full px-1">
                    {/* Volume Bar */}
                    <div
                      className="w-1/2 bg-[#166534] rounded-t-md transition-all group-hover:bg-[#14532d]"
                      style={{ height: `${heightVol}%` }}
                      title={`Volume: ${(item.volumeMT / 100000).toFixed(1)}L MT`}
                    />
                    {/* Payment Bar */}
                    <div
                      className="w-1/3 bg-[#F59E0B] rounded-t-md transition-all group-hover:bg-amber-600"
                      style={{ height: `${heightPay}%` }}
                      title={`Payment: ₹ ${item.paymentsCr} Cr`}
                    />
                  </div>
                  <span className="font-sans font-semibold text-[#111827] text-xs">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pt-1">
            <span>Peak Month: August (18.5 Lakh MT / ₹ 18.5 Cr)</span>
            <span className="text-[#166534] font-mono flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Overall Growth: +12.4% Season-over-Season
            </span>
          </div>
        </div>

        {/* State & District Performance Breakdown Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-[#111827]">State Efficiency Ranking</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Mandi Target Fulfillment & DBT Speed</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#111827]">Tamil Nadu (Salem / Namakkal)</span>
                <span className="font-mono text-[#166534] font-bold">95.6%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full bg-[#166534]" style={{ width: '95.6%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">1,250 Mandis operational · ₹2.8 Cr DBT</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#111827]">Punjab (Ludhiana / Patiala)</span>
                <span className="font-mono text-[#166534] font-bold">94.4%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full bg-[#166534]" style={{ width: '94.4%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">980 Mandis operational · ₹6.2 Cr DBT</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#111827]">Haryana (Karnal / Ambala)</span>
                <span className="font-mono text-[#166534] font-bold">92.8%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full bg-[#166534]" style={{ width: '92.8%' }} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">740 Mandis operational · ₹4.1 Cr DBT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

