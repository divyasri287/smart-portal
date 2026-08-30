import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, QrCode, Search, Scale, CheckCircle2, FileText, History } from 'lucide-react';

export const OfficerSidebar = ({ onCloseMobile }) => {
  const links = [
    { to: '/officer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Mandi Queue', icon: Users },
    { to: '/officer/scan-qr', label: 'Scan QR Token', icon: QrCode },
    { to: '/officer/search-farmer', label: 'Verification', icon: Search },
    { to: '/officer/weight-check', label: 'Weight Check', icon: Scale },
    { to: '/officer/quality-check', label: 'Quality Check', icon: CheckCircle2 },
    { to: '/officer/submit-procurement', label: 'Submit Entry', icon: FileText },
    { to: '/officer/history', label: 'Officer History', icon: History },
  ];

  return (
    <nav className="flex flex-col gap-1 p-3">
      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Officer Module Menu
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

export default OfficerSidebar;
