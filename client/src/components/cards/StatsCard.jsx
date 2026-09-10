import React from 'react';

const colorMap = {
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100 text-emerald-700',
    text: 'text-emerald-700',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-700',
    text: 'text-amber-700',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-700',
    text: 'text-blue-700',
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'bg-indigo-100 text-indigo-700',
    text: 'text-indigo-700',
  },
  violet: {
    bg: 'bg-violet-50',
    icon: 'bg-violet-100 text-violet-700',
    text: 'text-violet-700',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'bg-rose-100 text-rose-700',
    text: 'text-rose-700',
  },
};

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'emerald', onClick }) => {
  const palette = colorMap[color] || colorMap.emerald;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-left transition hover:-translate-y-0.5 hover:shadow-md',
        palette.bg,
        onClick ? 'cursor-pointer' : 'cursor-default'
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        {Icon && (
          <div className={['flex h-11 w-11 items-center justify-center rounded-xl', palette.icon].join(' ')}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </button>
  );
};

export default StatsCard;
