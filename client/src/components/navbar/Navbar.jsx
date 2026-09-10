import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, ShieldCheck, User } from 'lucide-react';

export const Navbar = ({ onToggleMobileSidebar, onToggleDesktopSidebar, isDesktopSidebarOpen = true }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md border-b border-emerald-700">
      <div className="bg-emerald-950 px-4 py-1 text-[11px] font-medium text-emerald-200 flex justify-between items-center border-b border-emerald-900">
        <div className="flex items-center gap-2">
          <span>GOVERNMENT OF TAMIL NADU</span>
          <span className="text-emerald-500">|</span>
          <span>DEPARTMENT OF AGRICULTURE & FARMERS WELFARE</span>
        </div>
        <div className="hidden sm:block text-emerald-300">
          Tamil Nadu MSP Procurement Platform
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-md hover:bg-emerald-700 focus:outline-hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={onToggleDesktopSidebar}
            className="hidden md:flex p-2 rounded-md hover:bg-emerald-700 focus:outline-hidden"
            aria-label={isDesktopSidebarOpen ? 'Hide Navigation Sidebar' : 'Show Navigation Sidebar'}
            title={isDesktopSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            <Menu className="w-5 h-5 text-white" />
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
                Tamil Nadu MSP Portal
              </span>
            </div>
          </Link>
        </div>

        {user && (
          <Link
            to="/farmer/profile"
            className="flex items-center gap-2 bg-emerald-900/60 px-3 py-1.5 rounded-md border border-emerald-700/50 transition hover:bg-emerald-700"
          >
            <User className="w-4 h-4 text-emerald-200" />
            <span className="text-xs font-semibold text-emerald-100">
              {user.name}
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
