import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, QrCode, Search, UserCheck,
  Scale, CheckCircle2, FileText, History, User
} from 'lucide-react';

export const OfficerSidebar = ({ onCloseMobile }) => {
  const links = [
    { to: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: "Today's Queue", icon: Users },
    { to: '/officer/scan-qr', label: 'Scan QR Token', icon: QrCode },
    { to: '/officer/search-farmer', label: 'Search Farmer', icon: Search },
    { to: '/officer/verify-farmer/FRM-1001', label: 'Verify Farmer', icon: UserCheck },
    { to: '/officer/quality-check', label: 'Quality Check', icon: CheckCircle2 },
    { to: '/officer/weight-check', label: 'Weight Entry', icon: Scale },
    { to: '/officer/submit-procurement', label: 'Procurement Summary', icon: FileText },
    { to: '/officer/history', label: 'History', icon: History },
    { to: '/officer/profile', label: 'My Profile', icon: User },
  ];

  return (
    <nav className="flex flex-col gap-0.5 p-3">
      <div className="px-3 py-2 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Officer Module
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
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default OfficerSidebar;
