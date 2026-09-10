import React from 'react';

const FormWrapper = ({ title, subtitle, children, className = '', onSubmit, ...props }) => {
  return (
    <form onSubmit={onSubmit} className={['rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className].join(' ')} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </form>
  );
};

export default FormWrapper;
