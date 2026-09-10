import React from 'react';
import { FileSpreadsheet, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReportCard = ({
  title = "Daily Grain Intake & Procurement Report",
  date = "2026-09-05",
  totalTonnage = "1,480 Tons",
  farmersServed = 342,
  dbtDisbursed = "₹ 3.32 Crores",
  moistureAvg = "12.8%",
  onDownloadPdf,
  onDownloadCsv
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between"
    >
      <div>
        {/* Title Bar */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Poppins'] font-bold text-[#111827] text-base leading-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-500 font-['Inter'] flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="font-['Roboto_Mono']">{date}</span> • Verified Audit
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-1 rounded-full bg-emerald-100 text-[#166534] flex items-center gap-1 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Certified
          </span>
        </div>

        {/* Core Report Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 font-['Inter']">
          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
            <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Total Procured</p>
            <p className="text-lg font-bold font-['Roboto_Mono'] text-[#166534] mt-0.5">{totalTonnage}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Grade-A Grain</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
            <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Farmers Served</p>
            <p className="text-lg font-bold font-['Roboto_Mono'] text-[#111827] mt-0.5">{farmersServed}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Direct Slots</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
            <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">DBT Disbursed</p>
            <p className="text-lg font-bold font-['Roboto_Mono'] text-[#F59E0B] mt-0.5">{dbtDisbursed}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">PFMS Verified</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
            <p className="text-[10px] text-slate-400 font-bold uppercase font-['Poppins']">Avg Moisture</p>
            <p className="text-lg font-bold font-['Roboto_Mono'] text-slate-800 mt-0.5">{moistureAvg}</p>
            <p className="text-[10px] text-[#166534] mt-0.5">&lt; 14% Standard</p>
          </div>
        </div>
      </div>

      {/* Export Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 font-['Poppins']">
        <button
          onClick={onDownloadPdf}
          className="flex-1 h-11 bg-[#166534] hover:bg-[#14532d] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF</span>
        </button>

        <button
          onClick={onDownloadCsv}
          className="flex-1 h-11 bg-white hover:bg-[#f0fdf4] text-[#166534] border border-[#166534] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Download CSV</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCard;
