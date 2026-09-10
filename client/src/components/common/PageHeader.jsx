import React from 'react';

const PageHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={['flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className].join(' ')}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
