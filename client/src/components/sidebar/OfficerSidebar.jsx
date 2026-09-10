import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  Search,
  FileText,
  BarChart3,
  History,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import officerStorage from '../../utils/officerStorage';

export const OfficerSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const profile = officerStorage.getProfile();

  const getCleanInspectorName = (name) => {
    if (!name) return 'Inspector Vikram Sharma';
    const trimmed = name.trim();
    return trimmed.toLowerCase().startsWith('inspector') ? trimmed : `Inspector ${trimmed}`;
  };

  const displayName = getCleanInspectorName(profile.name);

  const links = [
    { to: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/scan-qr', label: 'Scan QR Token', icon: QrCode },
    { to: '/officer/search-farmer', label: 'Search Farmer', icon: Search },
    { to: '/officer/submit-procurement', label: 'Procurement Summary', icon: FileText },
    { to: '/officer/reports', label: 'Reports', icon: BarChart3 },
    { to: '/officer/history', label: 'History', icon: History },
    { to: '/officer/report-issue', label: 'Report Issue', icon: AlertTriangle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/select-role');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Sidebar Officer Quick Status Card */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/70 shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/70">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {profile.name ? profile.name.replace(/^inspector\s+/i, '').split(' ').map(n => n[0]).join('').slice(0, 2) : 'VS'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate leading-tight">
              {displayName}
            </p>
            <p className="text-[10px] text-emerald-700 font-medium truncate flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {profile.badgeNo || 'INS-PB-8891'} · On-Duty
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Procurement Operations
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section: Logout Button & Centre Info */}
      <div className="mt-auto border-t border-slate-200 bg-slate-50/60 shrink-0">
        <div className="p-2.5">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 hover:text-rose-700 border border-rose-200 shadow-2xs transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="px-3 pb-3 pt-0.5 text-[10px] text-slate-400 text-center">
          <p className="font-semibold text-slate-600 truncate">{profile.centreAssigned || 'Salem Main Procurement Centre'}</p>
          <p className="text-[9px] mt-0.5 text-slate-400">Season Kharif 2026</p>
        </div>
      </div>
    </div>
  );
};

export default OfficerSidebar;
