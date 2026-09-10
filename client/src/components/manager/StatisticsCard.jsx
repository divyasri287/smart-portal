import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatisticsCard = ({
  title = "Daily Capacity Utilized",
  value = "78%",
  subtitle = "450 / 600 Slots Booked",
  trend = "+5.4%",
  isTrendPositive = true,
  icon: Icon = Activity,
  color = "emerald", // emerald, amber, blue, red
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'amber':
        return {
          iconBg: 'bg-amber-100 text-amber-800',
          borderHover: 'hover:border-amber-400',
          badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-100 text-blue-800',
          borderHover: 'hover:border-blue-400',
          badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'red':
        return {
          iconBg: 'bg-red-100 text-red-800',
          borderHover: 'hover:border-red-400',
          badgeStyle: 'bg-red-100 text-red-800 border-red-200',
        };
      default:
        return {
          iconBg: 'bg-emerald-100 text-[#166534]',
          borderHover: 'hover:border-[#166534]',
          badgeStyle: 'bg-emerald-100 text-[#166534] border-emerald-200',
        };
    }
  };

  const styles = getColorStyles();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white rounded-[18px] border border-[#E5E7EB] ${styles.borderHover} shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className={`w-11 h-11 rounded-2xl ${styles.iconBg} flex items-center justify-center font-bold shadow-xs`}>
            <Icon className="w-5 h-5" />
          </div>

          {trend && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-1 rounded-full border ${
                isTrendPositive
                  ? 'bg-emerald-100 text-[#166534] border-emerald-200'
                  : 'bg-red-100 text-red-700 border-red-200'
              }`}
            >
              {isTrendPositive ? (
                <TrendingUp className="w-3 h-3 text-[#166534]" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
              {trend}
            </span>
          )}
        </div>

        {/* Title & Value */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide font-['Poppins']">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-['Roboto_Mono'] my-1.5 leading-tight">
          {value}
        </h3>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-slate-500 font-['Inter'] mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default StatisticsCard;
