import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label className="block w-full text-sm font-medium text-slate-700">
      {label && (
        <span className="mb-1.5 block">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={[
          'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100',
          className,
        ].join(' ')}
        {...props}
      />
    </label>
  );
};

export default Input;
