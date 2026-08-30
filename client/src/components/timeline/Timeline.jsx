import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

export const Timeline = ({ steps = [] }) => {
  return (
    <div className="py-4">
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const isDone = step.completed;
          const isCurrent = step.current;

          return (
            <div key={idx} className="relative flex items-start gap-3">
              <div className={`absolute -left-6 top-0.5 rounded-full p-0.5 bg-white border-2 ${isDone ? 'border-emerald-600 text-emerald-600' : isCurrent ? 'border-amber-500 text-amber-500' : 'border-slate-300 text-slate-300'}`}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : isCurrent ? <Clock className="w-4 h-4 animate-pulse" /> : <Circle className="w-4 h-4" />}
              </div>
              <div className="pl-2">
                <h4 className={`text-sm font-semibold ${isDone ? 'text-emerald-900' : isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {step.title}
                </h4>
                {step.description && <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>}
                {step.timestamp && <span className="text-[10px] text-slate-400 font-mono mt-1 block">{step.timestamp}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
