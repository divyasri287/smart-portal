import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  MapPin,
  Building2,
  Users,
  CreditCard,
  FileSpreadsheet,
  Bell,
  User,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import adminStorage from '../../utils/adminStorage';

export const AdminSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const profile = adminStorage.getProfile();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/state-analytics', label: 'State Analytics', icon: BarChart2 },
    { to: '/admin/district-analytics', label: 'District Analytics', icon: MapPin },
    { to: '/admin/centre-monitoring', label: 'Centre Monitoring', icon: Building2 },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/payments', label: 'Payment Management', icon: CreditCard },
    { to: '/admin/reports', label: 'Reports', icon: FileSpreadsheet },
    { to: '/admin/notifications', label: 'Notifications', icon: Bell },
    { to: '/admin/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/select-role');
    if (onCloseMobile) onCloseMobile();
  };

  const initials = profile.adminName
    ? profile.adminName.replace('Dr. ', '').split(' ').map((n) => n[0]).slice(0, 2).join('')
    : 'SV';

  return (
    <div className="flex flex-col h-full bg-white select-none border-r border-slate-200">
      {/* Admin Profile Strip (Officer Module Match) */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/80 shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
          <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate leading-tight">
              {profile.adminName || 'Dr. Sunita Verma'}
            </p>
            <p className="text-[10px] text-green-700 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse shrink-0" />
              <span className="truncate">Government Admin</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Admin Portal Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-green-800 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-green-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button (Bottom) */}
      <div className="border-t border-slate-200 bg-slate-50/60 p-3 shrink-0">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 shadow-2xs transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-rose-600" />
          <span>Logout</span>
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
          Dept. of Food &amp; Public Distribution · SIH 2026
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
