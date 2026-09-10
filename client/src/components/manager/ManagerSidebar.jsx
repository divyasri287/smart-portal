import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ListOrdered,
  CalendarClock,
  UserCheck,
  FileText,
  AlertTriangle,
  Bell,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import managerStorage from '../../utils/managerStorage';

export const ManagerSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(() => managerStorage.getProfile());
  const [centreStatus, setCentreStatus] = useState(() => managerStorage.getCentreStatus());

  useEffect(() => {
    const syncState = () => {
      setProfile(managerStorage.getProfile());
      setCentreStatus(managerStorage.getCentreStatus());
    };
    syncState();
    const interval = setInterval(syncState, 1500);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { to: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/manager/queue-monitoring', label: 'Queue Monitoring', icon: ListOrdered },
    { to: '/manager/slot-management', label: 'Slot Management', icon: CalendarClock },
    { to: '/manager/officer-management', label: 'Officer Management', icon: UserCheck },
    { to: '/manager/reports', label: 'Reports', icon: FileText },
    { to: '/manager/issues', label: 'Issues', icon: AlertTriangle },
    { to: '/manager/notifications', label: 'Notifications', icon: Bell },
    { to: '/manager/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/select-role');
    if (onCloseMobile) onCloseMobile();
  };

  const initials = profile.name
    ? profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
    : 'AK';

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* ── TOP STATUS PILL CARD (MATCHES OFFICER SIDEBAR DESIGN EXACTLY) ── */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/70 shrink-0">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200/70">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate leading-tight">
              {profile.name || 'Anil Kumar'}
            </p>
            <p className="text-[10px] text-emerald-700 font-medium truncate flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  centreStatus === 'Open' ? 'bg-emerald-600 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span>{profile.centreCode || 'CEN-TN-SLM-402'}</span>
              <span>·</span>
              <span className="font-bold">{centreStatus === 'Open' ? 'Centre Open' : 'Closed'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION LINKS (EXACTLY 8 ITEMS) ── */}
      <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Operations Menu
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

      {/* ── BOTTOM AREA: LOGOUT BUTTON & CENTRE FOOTER (MATCHES OFFICER EXACTLY) ── */}
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
          <p className="font-semibold text-slate-600 truncate">
            {profile.centreName || 'Salem Main Procurement Centre #402'}
          </p>
          <p className="text-[9px] mt-0.5 text-slate-400">Season Kharif 2026</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;
