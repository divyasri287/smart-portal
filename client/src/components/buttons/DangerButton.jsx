import React from 'react';

export const DangerButton = ({ children, onClick, icon: Icon, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:ring-rose-200 text-white font-medium text-sm px-4 py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default DangerButton;
