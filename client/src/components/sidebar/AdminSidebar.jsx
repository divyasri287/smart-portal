import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import adminStorage from '../../utils/adminStorage';

export const AdminSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profile, setProfile] = useState(() => adminStorage.getProfile());
  const [pStats, setPStats] = useState(() => adminStorage.getPaymentStats());
  const [centres, setCentres] = useState(() => adminStorage.getCentres());
  const [notifs, setNotifs] = useState(() => adminStorage.getNotifications());

  useEffect(() => {
    const sync = () => {
      setProfile(adminStorage.getProfile());
      setPStats(adminStorage.getPaymentStats());
      setCentres(adminStorage.getCentres());
      setNotifs(adminStorage.getNotifications());
    };
    sync();
    const interval = setInterval(sync, 2000);
    return () => clearInterval(interval);
  }, []);

  const openCentresCount = centres.filter((c) => c.status === 'Open').length;

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/admin/state-analytics', label: 'State Analytics', icon: BarChart2, badge: null },
    { to: '/admin/district-analytics', label: 'District Analytics', icon: MapPin, badge: null },
    {
      to: '/admin/centre-monitoring',
      label: 'Centre Monitoring',
      icon: Building2,
      badge: openCentresCount > 0 ? openCentresCount + ' Open' : null,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    { to: '/admin/users', label: 'User Management', icon: Users, badge: null },
    {
      to: '/admin/payments',
      label: 'Payment Management',
      icon: CreditCard,
      badge: pStats.pendingCount > 0 ? pStats.pendingCount + ' Pending' : null,
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    { to: '/admin/reports', label: 'Reports', icon: FileSpreadsheet, badge: null },
    {
      to: '/admin/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: notifs.length > 0 ? String(notifs.length) : null,
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    { to: '/admin/profile', label: 'Profile', icon: User, badge: null },
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
      {/* Profile pill */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/70 shrink-0">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200/70">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate leading-tight">
              {profile.adminName || 'Dr. Sunita Verma'}
            </p>
            <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="truncate">Government Admin</span>
            </p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Admin Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ' +
                (isActive
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-900')
              }
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span className={'text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ml-1 font-semibold ' + link.badgeColor}>
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 bg-slate-50/60 shrink-0 p-2.5">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
        <p className="text-[9px] text-slate-400 text-center mt-2">Dept. of Food &amp; PD · SIH 2026</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
