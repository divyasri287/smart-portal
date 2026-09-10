import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, ShieldCheck, User } from 'lucide-react';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md border-b border-emerald-700">
      {/* Top Govt Info Banner */}
      <div className="bg-emerald-950 px-4 py-1 text-[11px] font-medium text-emerald-200 flex justify-between items-center border-b border-emerald-900">
        <div className="flex items-center gap-2">
          <span>GOVERNMENT OF INDIA</span>
          <span className="text-emerald-500">|</span>
          <span>MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION</span>
        </div>
        <div className="hidden sm:block text-emerald-300">
          Digital MSP Procurement Platform
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-md hover:bg-emerald-700 focus:outline-hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-white p-1.5 rounded-md shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <span className="font-bold text-lg leading-none tracking-tight block text-white">
                SMART PROCUREMENT
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-widest block font-medium">
                Unified MSP Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Logged-in User Badge */}
        {user && (
          <div className="flex items-center gap-2 bg-emerald-900/60 px-3 py-1.5 rounded-md border border-emerald-700/50">
            <User className="w-4 h-4 text-emerald-200" />
            <span className="text-xs font-semibold text-emerald-100">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
