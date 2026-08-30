import React from 'react';
import { Clock } from 'lucide-react';

export const ComingSoon = () => {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-6 space-y-3">
      <Clock className="w-12 h-12 text-emerald-700 animate-pulse" />
      <h2 className="text-xl font-bold text-slate-900">Module Under Construction</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        This sub-module is designated for backend expansion during subsequent hackathon rounds.
      </p>
    </div>
  );
};

export default ComingSoon;
