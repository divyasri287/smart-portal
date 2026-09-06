import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatisticsCard from '../../components/manager/StatisticsCard';
import QueueMonitorCard from '../../components/manager/QueueMonitorCard';
import { dashboardStats, gateTelemetry, dailyProcurementSummary } from '../../data/manager/dashboard';
import { 
  Activity, 
  Calendar, 
  Users, 
  AlertTriangle, 
  ArrowRight, 
  FileSpreadsheet,
  Clock,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [alertBannerVisible, setAlertBannerVisible] = useState(true);

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Command Centre Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#166534] to-[#15803D] text-white p-6 sm:p-8 rounded-[18px] shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#F59E0B] text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase font-['Poppins'] tracking-wider">
                Live Command Centre
              </span>
              <span className="text-emerald-200 text-xs font-['Roboto_Mono']">
                ID: PB-LDH-004
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Poppins'] text-white">
              Procurement Centre Manager Command
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-['Inter'] mt-1">
              Ludhiana Mandi Centre 4 • Chief Manager Anil Kumar • 4 Active Weighbridge Bays
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/manager/slot-management')}
              className="h-11 px-5 rounded-xl bg-[#F59E0B] hover:bg-[#d97706] text-slate-950 font-bold text-xs font-['Poppins'] transition-all shadow-xs flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Configure Slots</span>
            </button>

            <button
              onClick={() => navigate('/manager/queue-monitoring')}
              className="h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-['Poppins'] backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>Live Queue Flow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Alert Notice Banner */}
      {alertBannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-[18px] bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-200 text-amber-900 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold font-['Poppins']">
                Gate 2 Traffic Notice: Moderate Congestion Detected
              </p>
              <p className="text-[11px] text-amber-800 font-['Inter']">
                8 trucks waiting in queue at Gate 2. Flow rate: 8 trucks/hr. Inspector Harpreet Kaur assigned.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/manager/queue-monitoring')}
              className="h-9 px-3.5 rounded-xl bg-[#166534] text-white hover:bg-[#14532d] text-xs font-semibold font-['Poppins'] transition-all shadow-xs"
            >
              Inspect Queue
            </button>
            <button
              onClick={() => setAlertBannerVisible(false)}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold px-2 py-1 font-['Poppins']"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {/* Core Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Daily Capacity Utilized"
          value={dashboardStats.dailyCapacity}
          subtitle={dashboardStats.capacitySub}
          trend={dashboardStats.capacityTrend}
          isTrendPositive={true}
          icon={Activity}
          color="emerald"
        />
        <StatisticsCard
          title="Avg Turnaround Time"
          value={dashboardStats.avgTurnaround}
          subtitle={dashboardStats.turnaroundSub}
          trend={dashboardStats.turnaroundTrend}
          isTrendPositive={true}
          icon={Clock}
          color="amber"
        />
        <StatisticsCard
          title="Officers Deployed"
          value={dashboardStats.officersDeployed}
          subtitle={dashboardStats.officersSub}
          trend={dashboardStats.officersTrend}
          isTrendPositive={true}
          icon={Users}
          color="blue"
        />
        <StatisticsCard
          title="Pending Grievances"
          value={dashboardStats.pendingGrievances}
          subtitle={dashboardStats.grievancesSub}
          trend={dashboardStats.grievancesTrend}
          isTrendPositive={false}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Live Queue Cards Snapshot */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-['Poppins'] text-[#111827]">
              Live Bay & Gate Telemetry
            </h2>
            <p className="text-xs text-slate-500 font-['Inter']">
              Real-time congestion monitor for Ludhiana Mandi entry points
            </p>
          </div>
          <button
            onClick={() => navigate('/manager/queue-monitoring')}
            className="text-xs font-semibold text-[#166534] hover:underline flex items-center gap-1 font-['Poppins']"
          >
            <span>View All Gates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gateTelemetry.map((gate) => (
            <QueueMonitorCard
              key={gate.id}
              title={gate.title}
              vehicleCount={gate.vehicleCount}
              maxCapacity={gate.maxCapacity}
              flowRate={gate.flowRate}
              avgWaitTime={gate.avgWaitTime}
              status={gate.status}
              assignedInspector={gate.assignedInspector}
              onActionClick={() => navigate('/manager/queue-monitoring')}
            />
          ))}
        </div>
      </div>

      {/* Quick Controls & Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Manager Actions */}
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                Quick Command Actions
              </h3>
            </div>

            <div className="space-y-2.5 font-['Inter']">
              <button
                onClick={() => navigate('/manager/queue-monitoring')}
                className="w-full text-left p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-emerald-50 border border-[#E5E7EB] hover:border-[#166534] transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 font-['Poppins']">
                  <Activity className="w-4 h-4 text-[#166534]" />
                  <span>Monitor Live Queue Congestion</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/manager/slot-management')}
                className="w-full text-left p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-emerald-50 border border-[#E5E7EB] hover:border-[#166534] transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 font-['Poppins']">
                  <Calendar className="w-4 h-4 text-[#166534]" />
                  <span>Adjust Hourly Slot Limits & Caps</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/manager/officer-management')}
                className="w-full text-left p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-emerald-50 border border-[#E5E7EB] hover:border-[#166534] transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 font-['Poppins']">
                  <Users className="w-4 h-4 text-[#166534]" />
                  <span>Inspect Officer Roster & Shifts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/manager/issues')}
                className="w-full text-left p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-emerald-50 border border-[#E5E7EB] hover:border-[#166534] transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 font-['Poppins']">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                  <span>Resolve Grievances & Disputes</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#166534] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-['Inter']">
            <span>Shift Status: Active</span>
            <span className="text-[#166534] font-bold font-['Roboto_Mono']">08:00 - 18:00</span>
          </div>
        </div>

        {/* Daily Procurement Tonnage Audit Summary */}
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 font-['Poppins']">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#166534]" />
              <h3 className="font-bold text-base text-[#111827]">
                Today's Procurement Tonnage Summary
              </h3>
            </div>
            <button
              onClick={() => navigate('/manager/reports')}
              className="text-xs text-[#166534] font-semibold hover:underline"
            >
              Full Reports Hub
            </button>
          </div>

          <div className="space-y-4 font-['Inter']">
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Procured Grain</p>
                <p className="text-lg font-bold font-['Roboto_Mono'] text-[#166534] mt-0.5">{dailyProcurementSummary.totalTonnage}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Farmers Served</p>
                <p className="text-lg font-bold font-['Roboto_Mono'] text-[#111827] mt-0.5">{dailyProcurementSummary.farmersServed}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">DBT Settled</p>
                <p className="text-lg font-bold font-['Roboto_Mono'] text-[#F59E0B] mt-0.5">{dailyProcurementSummary.dbtSettled}</p>
              </div>
            </div>

            {/* Audit Log Items */}
            <div className="space-y-2.5 text-xs">
              {dailyProcurementSummary.batches.map((batch) => (
                <div key={batch.id} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#111827] font-['Poppins']">{batch.name}</p>
                    <p className="text-[11px] text-slate-500 font-['Roboto_Mono']">{batch.details}</p>
                  </div>
                  <span className="font-['Roboto_Mono'] text-[#166534] font-bold text-sm">{batch.tonnage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
