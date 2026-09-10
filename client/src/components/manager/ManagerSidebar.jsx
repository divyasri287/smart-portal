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
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import managerStorage from '../../utils/managerStorage';

export const ManagerSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(() => managerStorage.getProfile());
  const [centreStatus, setCentreStatus] = useState(() => managerStorage.getCentreStatus());

  useEffect(() => {
    // Listen for status/profile changes
    const interval = setInterval(() => {
      setProfile(managerStorage.getProfile());
      setCentreStatus(managerStorage.getCentreStatus());
    }, 1000);
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

  return (
    <aside className="flex flex-col h-full bg-white border-r border-slate-200 select-none">
      {/* Centre Manager Mandi Header */}
      <div className="p-4 border-b border-emerald-900 bg-emerald-800 text-white shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-white/10 rounded-lg">
            <Building2 className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-200 block">
              Govt Procurement Centre
            </span>
            <span className="text-xs font-black tracking-tight text-white block">
              Centre Manager Portal
            </span>
          </div>
        </div>

        {/* Centre Name & Real-Time Status */}
        <div className="bg-emerald-900/90 border border-emerald-700/60 rounded-xl p-2.5 mt-2">
          <p className="text-xs font-bold text-white truncate leading-tight">
            {profile.centreName || 'Salem Main Procurement Centre #402'}
          </p>
          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-emerald-800 text-[11px]">
            <span className="text-emerald-200 font-medium truncate">
              {profile.name || 'Anil Kumar'}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                centreStatus === 'Open'
                  ? 'bg-emerald-500 text-emerald-950'
                  : 'bg-rose-500 text-white'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  centreStatus === 'Open' ? 'bg-emerald-950 animate-pulse' : 'bg-white'
                }`}
              />
              {centreStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links - Exactly the 8 required menu items */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button (Bottom of Sidebar) */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 shadow-2xs transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default ManagerSidebar;
