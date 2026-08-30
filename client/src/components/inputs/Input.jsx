import React from 'react';

export const Input = ({ label, type = 'text', placeholder, value, onChange, name, error, required = false }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-white border ${error ? 'border-rose-500' : 'border-slate-300'} text-slate-900 rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors`}
      />
      {error && <span className="text-xs text-rose-600 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;
