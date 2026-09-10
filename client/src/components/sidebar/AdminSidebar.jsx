import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MapPin, Building2, Landmark, FileSpreadsheet, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/state-analytics', label: 'State Analytics', icon: MapPin },
    { to: '/admin/district-analytics', label: 'District Analytics', icon: MapPin },
    { to: '/admin/centre-monitoring', label: 'Centres Master', icon: Building2 },
    { to: '/admin/payments', label: 'DBT Payments Audit', icon: Landmark },
    { to: '/admin/reports', label: 'National Reports', icon: FileSpreadsheet },
    { to: '/admin/users', label: 'User Roles & Access', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/select-role');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Admin Module Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 hover:text-rose-700 border border-rose-200 shadow-2xs transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
