import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className={`w-full rounded-2xl border border-slate-200 bg-white shadow-2xl ${sizeClasses[size] || sizeClasses.md}`}>
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="px-5 py-4">{children}</div>

        {footer && <div className="border-t border-slate-200 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
