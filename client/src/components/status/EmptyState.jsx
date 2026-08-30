import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = 'No Records Found', description = 'There are no active entries available at this moment.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-300 rounded-lg text-center gap-3">
      <div className="p-3 bg-slate-100 rounded-full text-slate-500">
        <Inbox className="w-8 h-8" />
      </div>
      <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
