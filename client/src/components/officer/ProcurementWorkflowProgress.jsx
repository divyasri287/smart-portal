import React from 'react';
import { Check } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 1, label: 'QR Scanned', shortLabel: 'QR Scan' },
  { id: 2, label: 'Verified', shortLabel: 'Verify' },
  { id: 3, label: 'Quality OK', shortLabel: 'Quality' },
  { id: 4, label: 'Weighed', shortLabel: 'Weight' },
  { id: 5, label: 'Summary', shortLabel: 'Summary' },
  { id: 6, label: 'Receipt', shortLabel: 'Receipt' },
];

export const ProcurementWorkflowProgress = ({ currentStep = 1 }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 shadow-2xs select-none">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Procurement Workflow Progress
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md font-mono">
          Step {currentStep} of {WORKFLOW_STEPS.length}
        </span>
      </div>

      <div className="flex items-center w-full">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-700 border-2 border-emerald-700 text-white shadow-2xs'
                      : isCurrent
                      ? 'bg-emerald-800 border-2 border-emerald-800 text-white ring-3 ring-emerald-100 shadow-xs scale-105'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[9px] sm:text-xs mt-1 text-center truncate w-full px-0.5 transition-colors ${
                    isCurrent
                      ? 'text-emerald-900 font-bold'
                      : isCompleted
                      ? 'text-slate-700 font-semibold'
                      : 'text-slate-400 font-normal'
                  }`}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.shortLabel}</span>
                </span>
              </div>

              {/* Connecting Line between steps */}
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mb-4 mx-0.5 transition-colors ${
                    step.id < currentStep ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProcurementWorkflowProgress;
