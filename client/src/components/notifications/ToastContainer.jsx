import React from 'react';
import { useToastContext } from '../../context/ToastContext';
import Toast from './Toast';

export const ToastContainer = () => {
  const context = useToastContext();
  if (!context || !context.toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {context.toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => context.removeToast(toast.id)} />
      ))}
    </div>
  );
};

export default ToastContainer;
