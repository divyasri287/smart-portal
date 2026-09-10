import React, { useState } from 'react';
import StatisticsCard from '../../components/manager/StatisticsCard';
import { analyticsStats, hourlyArrivalData, moistureAuditBreakdown } from '../../data/manager/analytics';
import { 
  BarChart3, 
  Activity, 
  Clock, 
  PieChart, 
  Target,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ManagerAnalytics = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');

  const maxTrucks = Math.max(...hourlyArrivalData.map((d) => d.trucks));

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Mandi Operational Analytics &amp; Telemetry
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Real-time throughput metrics, hourly peak traffic curves, and quality acceptance ratios
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
          >
            <option value="Wheat">Grade-A Wheat Telemetry</option>
            <option value="Paddy">Paddy / Rice Telemetry</option>
            <option value="Mustard">Mustard Seed Telemetry</option>
          </select>
        </div>
      </div>

      {/* Top Metrics Cards — sourced from analyticsStats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Peak Traffic Window"
          value={analyticsStats.peakTrafficWindow}
          subtitle={analyticsStats.peakSub}
          trend={analyticsStats.peakTrend}
          isTrendPositive={false}
          icon={Clock}
          color="amber"
        />
        <StatisticsCard
          title="Avg Vehicle Turnaround"
          value={analyticsStats.avgTurnaround}
          subtitle={analyticsStats.turnaroundSub}
          trend={analyticsStats.turnaroundTrend}
          isTrendPositive={true}
          icon={Activity}
          color="emerald"
        />
        <StatisticsCard
          title="Quality Approval Rate"
          value={analyticsStats.qualityApprovalRate}
          subtitle={analyticsStats.qualitySub}
          trend={analyticsStats.qualityTrend}
          isTrendPositive={true}
          icon={ShieldCheck}
          color="blue"
        />
        <StatisticsCard
          title="Monthly Target Achieved"
          value={analyticsStats.monthlyTarget}
          subtitle={analyticsStats.targetSub}
          trend={analyticsStats.targetTrend}
          isTrendPositive={true}
          icon={Target}
          color="emerald"
        />
      </div>

      {/* Custom Bar Chart + Moisture Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart — sourced from hourlyArrivalData */}
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 font-['Poppins']">
            <div>
              <h2 className="font-bold text-base text-[#111827]">
                Hourly Vehicle Arrival Curve (Trucks / Hour)
              </h2>
              <p className="text-xs text-slate-500 font-['Inter']">
                Peak intake window identified between 10:00 AM and 12:00 PM
              </p>
            </div>
            <span className="text-xs font-bold text-[#166534] bg-emerald-100 px-2.5 py-1 rounded-full font-['Roboto_Mono']">
              Live Telemetry
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {hourlyArrivalData.map((d) => {
              const heightPercent = Math.round((d.trucks / maxTrucks) * 100);
              const isPeak = d.trucks === maxTrucks;

              return (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-bold font-['Roboto_Mono'] text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.trucks} Trucks
                  </span>
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6 }}
                      className={`w-full rounded-t-xl transition-all ${
                        isPeak ? 'bg-[#F59E0B]' : 'bg-[#166534] hover:bg-[#14532d]'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 font-['Poppins']">
                    {d.hour.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Moisture Rejection & Quality Breakdown — sourced from moistureAuditBreakdown */}
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 font-['Poppins']">
              <PieChart className="w-5 h-5 text-[#166534]" />
              <h3 className="font-bold text-base text-[#111827]">
                Moisture Standard Audit
              </h3>
            </div>

            <div className="space-y-4 font-['Inter']">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600">Passed (&lt; 14.0% Moisture)</span>
                  <span className="font-bold font-['Roboto_Mono'] text-[#166534]">
                    {moistureAuditBreakdown.passedPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full"
                    style={{ width: `${moistureAuditBreakdown.passedPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600">Conditional (14.1% - 15.0%)</span>
                  <span className="font-bold font-['Roboto_Mono'] text-[#F59E0B]">
                    {moistureAuditBreakdown.conditionalPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full"
                    style={{ width: `${moistureAuditBreakdown.conditionalPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600">Rejected (&gt; 15.0% Moisture)</span>
                  <span className="font-bold font-['Roboto_Mono'] text-red-600">
                    {moistureAuditBreakdown.rejectedPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${moistureAuditBreakdown.rejectedPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-[#F8FAFC] p-3.5 rounded-xl text-xs text-slate-600">
            <p className="font-bold font-['Poppins'] text-[#111827] mb-1">Lab Testing Device Status</p>
            <p className="text-[11px] text-slate-500 font-['Roboto_Mono']">
              {moistureAuditBreakdown.deviceStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAnalytics;
