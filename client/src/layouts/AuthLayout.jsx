import React from 'react';
import { Outlet } from 'react-router-dom';
import ToastContainer from '../components/notifications/ToastContainer';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans select-none cursor-default">
      {/* Top Green Accent Bar matching original design */}
      <div className="h-2.5 bg-emerald-800 w-full shrink-0 shadow-xs" />

      {/* Main Content Area - perfectly centered */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
