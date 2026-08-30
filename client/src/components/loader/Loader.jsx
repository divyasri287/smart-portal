import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ text = 'Loading data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
      <span className="text-sm font-medium text-slate-600">{text}</span>
    </div>
  );
};

export default Loader;
