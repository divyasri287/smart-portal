import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Building2, 
  ChevronDown, 
  Clock,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ManagerNavbar = ({ onToggleMobileSidebar, notificationCount = 3 }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const todayDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-xs">
      {/* Top National Portal Bar */}
      <div className="bg-[#166534] text-white text-xs px-4 sm:px-6 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-medium tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Govt. of India | National Agricultural Procurement System
          </span>
          <span className="hidden md:inline-block text-emerald-300">|</span>
          <span className="hidden md:inline-block text-emerald-100 font-mono">
            Mandi Code: PB-LDH-004
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden sm:flex items-center gap-1 text-emerald-100">
            <Clock className="w-3 h-3 text-amber-300" />
            {todayDate}
          </span>
          <span className="bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500">
            Operational 08:00 - 18:00
          </span>
        </div>
      </div>

      {/* Main Manager Header */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Centre Identity */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 text-slate-600 hover:text-[#166534] hover:bg-emerald-50 rounded-xl transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <Link to="/manager/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#15803D] flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Poppins'] font-bold text-slate-900 text-base sm:text-lg leading-tight">
                  Ludhiana Central Mandi
                </h1>
                <span className="hidden lg:inline-block bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                  Centre No. 4
                </span>
              </div>
              <p className="text-xs text-slate-500 font-['Inter'] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Gate Operations Active • 4 Bays Online
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden lg:flex items-center max-w-md w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Token, Farmer ID, Vehicle No, or Officer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-xs bg-slate-50 border border-[#E5E7EB] rounded-xl focus:bg-white focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 transition-all font-['Inter']"
          />
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Button */}
          <Link
            to="/manager/notifications"
            className="relative p-2.5 rounded-xl border border-[#E5E7EB] hover:bg-emerald-50 text-slate-700 hover:text-[#166534] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {notificationCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-[#E5E7EB] hover:border-[#166534]/40 hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#166534] text-white font-bold flex items-center justify-center text-xs font-['Poppins']">
                AK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#111827] font-['Poppins'] leading-tight">
                  Anil Kumar
                </p>
                <p className="text-[10px] text-slate-500 font-['Inter']">Chief Centre Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-2 z-50"
                >
                  <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
                    <p className="text-xs font-bold text-slate-900 font-['Poppins']">Anil Kumar</p>
                    <p className="text-[11px] text-slate-500">manager.ludhiana@procure.gov.in</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-md">
                      ID: MGR-PB-4402
                    </span>
                  </div>

                  <Link
                    to="/manager/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#166534] rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Manager Profile & Setup</span>
                  </Link>

                  <Link
                    to="/manager/notifications"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#166534] rounded-lg transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notification Settings</span>
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout Command Portal</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagerNavbar;
