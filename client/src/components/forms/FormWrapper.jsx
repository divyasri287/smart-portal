import React from 'react';

export const FormWrapper = ({ children, title, subtitle, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs max-w-2xl mx-auto space-y-6">
      {(title || subtitle) && (
        <div className="border-b border-slate-200 pb-3">
          {title && <h3 className="font-bold text-slate-900 text-lg">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </form>
  );
};

export default FormWrapper;
