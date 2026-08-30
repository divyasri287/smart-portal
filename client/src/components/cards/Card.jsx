import React from 'react';

export const Card = ({ children, title, subtitle, className = '', headerAction }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-5 shadow-xs ${className}`}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            {title && <h3 className="font-semibold text-slate-900 text-base">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
