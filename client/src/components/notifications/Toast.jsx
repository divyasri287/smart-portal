import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 shadow-lg rounded-md p-3 max-w-sm w-full animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-2.5">
        {icons[type] || icons.info}
        <span className="text-xs font-medium text-slate-800">{message}</span>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
