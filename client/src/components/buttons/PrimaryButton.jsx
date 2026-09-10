import React from 'react';

const PrimaryButton = ({
  children,
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#14532d] disabled:cursor-not-allowed disabled:opacity-60',
        className,
      ].join(' ')}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};

export default PrimaryButton;
