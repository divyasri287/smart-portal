import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Calendar, ShieldAlert, BarChart3, AlertTriangle } from 'lucide-react';

export const ManagerSidebar = ({ onCloseMobile }) => {
  const links = [
    { to: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/manager/queue-monitoring', label: 'Queue Oversight', icon: Activity },
    { to: '/manager/slot-management', label: 'Slot Allocation', icon: Calendar },
    { to: '/manager/officer-management', label: 'Officer Deployment', icon: ShieldAlert },
    { to: '/manager/reports', label: 'Centre Reports', icon: BarChart3 },
    { to: '/manager/issues', label: 'Grievance & Issues', icon: AlertTriangle },
    { to: '/manager/analytics', label: 'Mandi Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="flex flex-col gap-1 p-3">
      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Manager Module Menu
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

export default ManagerSidebar;
