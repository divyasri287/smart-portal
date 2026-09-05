import React from 'react';
import { MapPin, TrendingUp, Building2, Landmark, CheckCircle2 } from 'lucide-react';

export const StateCards = ({ states, selectedState, onSelectState }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {states.map((st) => {
        const isSelected = selectedState === st.id;
        return (
          <div
            key={st.id}
            onClick={() => onSelectState && onSelectState(st.id)}
            className={`bg-white rounded-2xl border p-6 transition-all duration-200 cursor-pointer shadow-xs ${
              isSelected
                ? 'border-[#166534] ring-2 ring-[#166534]/20 shadow-md'
                : 'border-[#E5E7EB] hover:border-[#15803D] hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#166534]" />
                  <h3 className="font-semibold text-lg text-[#111827] tracking-tight">{st.state}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Code: {st.code} • {st.activeMandis} Mandis</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5" />
                {st.growth}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-600">Procurement Progress</span>
                  <span className="font-bold text-[#166534] font-mono">{st.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#166534] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(st.completionPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E7EB]">
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Achieved Volume</span>
                  <span className="text-sm font-bold text-[#111827] font-mono">
                    {(st.achievedTons / 100000).toFixed(2)} Lakh MT
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">DBT Disbursed</span>
                  <span className="text-sm font-bold text-[#15803D] font-mono">
                    ₹ {st.dbtDisbursedCr} Cr
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StateCards;
