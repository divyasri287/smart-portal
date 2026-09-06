import React from 'react';
import { Truck, Clock, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const QueueMonitorCard = ({
  title = "Gate 1 - North Entrance",
  vehicleCount = 6,
  maxCapacity = 15,
  flowRate = "14 Trucks / hr",
  avgWaitTime = "12 Mins",
  status = "normal", // normal, warning, congested
  assignedInspector = "Insp. Balwinder Singh",
  onActionClick
}) => {
  const percentage = Math.min(Math.round((vehicleCount / maxCapacity) * 100), 100);

  const getStatusBadge = () => {
    switch (status) {
      case 'warning':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Moderate Flow
          </span>
        );
      case 'congested':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
            <ShieldAlert className="w-3.5 h-3.5" />
            Congested
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-1 rounded-full bg-emerald-100 text-[#166534] border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Smooth Traffic
          </span>
        );
    }
  };

  const getProgressBarColor = () => {
    if (percentage > 80) return 'bg-red-500';
    if (percentage > 55) return 'bg-[#F59E0B]';
    return 'bg-[#166534]';
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-['Poppins'] font-bold text-[#111827] text-base leading-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
              Inspector: <span className="font-medium text-slate-800">{assignedInspector}</span>
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Count & Meter */}
        <div className="my-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-['Roboto_Mono'] text-[#111827]">
                {vehicleCount} <span className="text-xs font-normal text-slate-500 font-['Inter']">Vehicles</span>
              </div>
              <p className="text-[11px] text-slate-500 font-['Inter']">Max Capacity: {maxCapacity} trucks</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold font-['Roboto_Mono'] text-[#166534]">{percentage}%</span>
            <p className="text-[10px] text-slate-400 font-['Poppins']">Capacity</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-['Inter'] mb-4">
          <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F59E0B]" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Avg Wait</p>
              <p className="font-semibold text-slate-800 font-['Roboto_Mono']">{avgWaitTime}</p>
            </div>
          </div>
          <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#166534]" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Throughput</p>
              <p className="font-semibold text-slate-800 font-['Roboto_Mono']">{flowRate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onActionClick}
        className="w-full h-11 bg-white hover:bg-[#f0fdf4] text-[#166534] border border-[#166534] font-semibold text-xs font-['Poppins'] rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span>Manage Queue Flow</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default QueueMonitorCard;
