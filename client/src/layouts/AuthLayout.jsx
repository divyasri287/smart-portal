import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import RoleSwitcher from '../components/navbar/RoleSwitcher';
import { ShieldCheck } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-emerald-800 text-white py-4 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-300" />
          <span className="font-bold text-lg">Smart Procurement Portal</span>
        </div>
        <RoleSwitcher />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg border border-slate-200 p-6 shadow-md">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
