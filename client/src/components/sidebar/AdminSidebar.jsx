import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Building2, Landmark, FileSpreadsheet, Users } from 'lucide-react';

export const AdminSidebar = ({ onCloseMobile }) => {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/state-analytics', label: 'State Analytics', icon: MapPin },
    { to: '/admin/district-analytics', label: 'District Analytics', icon: MapPin },
    { to: '/admin/centre-monitoring', label: 'Centres Master', icon: Building2 },
    { to: '/admin/payments', label: 'DBT Payments Audit', icon: Landmark },
    { to: '/admin/reports', label: 'National Reports', icon: FileSpreadsheet },
    { to: '/admin/users', label: 'User Roles & Access', icon: Users },
  ];

  return (
    <nav className="flex flex-col gap-1 p-3">
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
  );
};

export default AdminSidebar;
