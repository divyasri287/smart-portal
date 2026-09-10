import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, User, QrCode, Edit3 } from 'lucide-react';
import OfficerSidebar from '../components/sidebar/OfficerSidebar';
import ToastContainer from '../components/notifications/ToastContainer';
import InspectorProfileModal from '../components/officer/InspectorProfileModal';
import officerStorage from '../utils/officerStorage';

export const OfficerLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState(() => officerStorage.getProfile());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync profile on mount and storage events
    setProfile(officerStorage.getProfile());
  }, []);

  const handleProfileUpdated = (newProfile) => {
    setProfile(newProfile);
  };

  // Check if we are currently on the dashboard page
  const isDashboard = location.pathname === '/officer/dashboard' || location.pathname === '/officer' || location.pathname === '/officer/';

  // Format inspector name cleanly without duplication
  const getCleanInspectorName = (rawName) => {
    if (!rawName) return 'Inspector Vikram Sharma';
    const trimmed = rawName.trim();
    return trimmed.toLowerCase().startsWith('inspector') ? trimmed : `Inspector ${trimmed}`;
  };

  const displayName = getCleanInspectorName(profile.name);

  return (
    <div className="officer-portal-root h-screen w-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900 select-auto">
      {/* FIXED / STICKY OFFICER HEADER */}
      <header className="shrink-0 z-30 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
        {/* Top Government Strip */}
        <div className="bg-emerald-950 px-3 sm:px-6 py-1 text-[10px] sm:text-[11px] font-medium text-emerald-200 flex justify-between items-center border-b border-emerald-900/60">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="tracking-wide">GOVERNMENT OF INDIA</span>
            <span className="text-emerald-500">|</span>
            <span className="hidden md:inline">MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION</span>
            <span className="md:hidden">MINISTRY OF CONSUMER AFFAIRS</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-emerald-300 font-mono tracking-wider shrink-0">
            OFFICER WORKSTATION · KHARIF 2026
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="px-3 sm:px-6 h-14 flex items-center justify-between gap-2.5">
          {/* Left: Hamburger & Portal Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-emerald-800 text-white focus:outline-hidden transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/officer/dashboard" className="flex items-center gap-2.5 group min-w-0">
              <div className="bg-white p-1.5 rounded-md shadow-xs flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
              </div>
              <div className="leading-tight truncate">
                <span className="font-bold text-sm sm:text-base tracking-tight block text-white truncate">
                  SMART PROCUREMENT
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-200 uppercase tracking-widest block font-medium truncate">
                  Procurement Officer Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Inspector Profile & Primary Scan QR Button (Dashboard only) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* CLICKABLE INSPECTOR PROFILE BUTTON */}
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              title="Click to view & edit Inspector profile"
              className="group flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-950 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-700/60 hover:border-emerald-500 transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 group-hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-3.5 h-3.5 text-emerald-200" />
              </div>
              <div className="hidden sm:block text-left max-w-[140px] md:max-w-[170px]">
                <p className="text-xs font-semibold text-white leading-tight truncate group-hover:text-emerald-200 transition-colors">
                  {displayName}
                </p>
                <p className="text-[9px] text-emerald-300 font-mono leading-none mt-0.5 flex items-center gap-1">
                  <span>{profile.badgeNo || 'INS-PB-8891'}</span>
                  <Edit3 className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 text-emerald-400" />
                </p>
              </div>
            </button>

            {/* PRIMARY ACTION: SCAN QR GATE TOKEN BUTTON (Visible ONLY on Dashboard) */}
            {isDashboard && (
              <button
                onClick={() => navigate('/officer/scan-qr')}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold border border-emerald-300/60 hover:shadow-lg"
              >
                <QrCode className="w-4 h-4 shrink-0 text-slate-950 font-bold" />
                <span className="hidden xs:inline sm:inline">Scan QR Gate Token</span>
                <span className="xs:hidden sm:hidden">Scan QR</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* FULL-HEIGHT BODY SHELL WITH SEPARATE INDEPENDENT SCROLLING */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* DESKTOP STICKY/FIXED SIDEBAR WITH INDEPENDENT SCROLL */}
        <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-white border-r border-slate-200 shrink-0 h-full overflow-y-auto shadow-xs">
          <OfficerSidebar onCloseMobile={() => {}} />
        </aside>

        {/* MOBILE DRAWER SIDEBAR */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex flex-col w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between p-3.5 border-b border-emerald-800 bg-emerald-900 text-white">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span className="font-bold text-sm">Officer Navigation</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <OfficerSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* MAIN OFFICER CONTENT WITH INDEPENDENT VERTICAL SCROLL */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 bg-slate-50 min-w-0">
          <div className="max-w-7xl mx-auto space-y-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* INSPECTOR PROFILE EDIT MODAL */}
      <InspectorProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onProfileUpdated={handleProfileUpdated}
      />

      <ToastContainer />
    </div>
  );
};

export default OfficerLayout;
