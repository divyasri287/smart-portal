import React from 'react';

export const PrimaryButton = ({ children, onClick, icon: Icon, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-200 text-white font-semibold text-sm px-4 py-2.5 rounded-md shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default PrimaryButton;
