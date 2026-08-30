import { useToastContext } from '../context/ToastContext';

export const useToast = () => {
  const context = useToastContext();
  return {
    showToast: context?.addToast || ((msg) => alert(msg)),
    removeToast: context?.removeToast || (() => {}),
  };
};
