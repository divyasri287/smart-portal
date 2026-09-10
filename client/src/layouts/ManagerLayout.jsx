import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Building2, User, CalendarClock, ShieldCheck, ListOrdered } from 'lucide-react';
import ManagerSidebar from '../components/manager/ManagerSidebar';
import ToastContainer from '../components/notifications/ToastContainer';
import managerStorage from '../utils/managerStorage';

export const ManagerLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(() => managerStorage.getProfile());
  const [centreStatus, setCentreStatus] = useState(() => managerStorage.getCentreStatus());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncState = () => {
      setProfile(managerStorage.getProfile());
      setCentreStatus(managerStorage.getCentreStatus());
    };
    syncState();
    const interval = setInterval(syncState, 1500);
    return () => clearInterval(interval);
  }, []);

  const isDashboard =
    location.pathname === '/manager/dashboard' ||
    location.pathname === '/manager' ||
    location.pathname === '/manager/';

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900 select-none cursor-default">
      {/* ── 1. TOP GOVERNMENT STRIP (EXACTLY MATCHING OFFICER MODULE) ── */}
      <header className="shrink-0 z-30 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
        <div className="bg-emerald-950 px-3 sm:px-6 py-1 text-[10px] sm:text-[11px] font-medium text-emerald-200 flex justify-between items-center border-b border-emerald-900/60">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="tracking-wide font-semibold">GOVERNMENT OF INDIA</span>
            <span className="text-emerald-500">|</span>
            <span className="hidden md:inline">MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION</span>
            <span className="md:hidden">MINISTRY OF CONSUMER AFFAIRS</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-emerald-300 font-mono tracking-wider shrink-0">
            CENTRE MANAGER WORKSTATION · KHARIF 2026
          </div>
        </div>

        {/* ── 2. MAIN HEADER BAR ── */}
        <div className="px-3 sm:px-6 h-14 flex items-center justify-between gap-2.5">
          {/* Left: Mobile Toggle & Brand Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-emerald-800 text-white focus:outline-hidden transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/manager/dashboard" className="flex items-center gap-2.5 group min-w-0">
              <div className="bg-white p-1.5 rounded-md shadow-xs flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-emerald-800" />
              </div>
              <div className="leading-tight truncate">
                <span className="font-bold text-sm sm:text-base tracking-tight block text-white truncate">
                  SMART PROCUREMENT
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-200 uppercase tracking-widest block font-medium truncate">
                  Centre Manager Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Centre Manager Profile Pill & Quick Queue/Slot Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Clickable Manager Profile Pill */}
            <Link
              to="/manager/profile"
              title="Click to view & edit Centre Profile"
              className="group flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-950 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-700/60 hover:border-emerald-500 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 group-hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-3.5 h-3.5 text-emerald-200" />
              </div>
              <div className="hidden sm:block text-left max-w-[140px] md:max-w-[180px]">
                <p className="text-xs font-semibold text-white leading-tight truncate group-hover:text-emerald-200 transition-colors">
                  {profile.name || 'Anil Kumar'}
                </p>
                <p className="text-[9px] text-emerald-300 font-mono leading-none mt-0.5 truncate">
                  {profile.centreCode || 'CEN-TN-SLM-402'}
                </p>
              </div>
            </Link>

            {/* Quick Action Button (Visible on Dashboard) */}
            {isDashboard && (
              <button
                onClick={() => navigate('/manager/queue-monitoring')}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold border border-emerald-300/60 hover:shadow-lg cursor-pointer"
              >
                <ListOrdered className="w-4 h-4 shrink-0 text-slate-950 font-bold" />
                <span className="hidden xs:inline sm:inline">Live Queue</span>
                <span className="xs:hidden sm:hidden">Queue</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── 3. FULL-HEIGHT BODY SHELL WITH SEPARATE INDEPENDENT SCROLLING ── */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Desktop Sticky/Fixed Sidebar */}
        <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-white border-r border-slate-200 shrink-0 h-full overflow-y-auto shadow-xs">
          <ManagerSidebar onCloseMobile={() => {}} />
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex flex-col w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between p-3.5 border-b border-emerald-800 bg-emerald-900 text-white">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-300" />
                  <span className="font-bold text-sm">Manager Navigation</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ManagerSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Manager Content with Independent Vertical Scroll */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 bg-slate-50 min-w-0">
          <div className="max-w-7xl mx-auto space-y-4">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManagerLayout;
