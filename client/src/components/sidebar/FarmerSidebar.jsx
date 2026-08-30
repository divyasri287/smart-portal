import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, QrCode, Clock, CreditCard, History, HelpCircle, User } from 'lucide-react';

export const FarmerSidebar = ({ onCloseMobile }) => {
  const links = [
    { to: '/farmer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/farmer/book-slot', label: 'Book Slot', icon: CalendarPlus },
    { to: '/farmer/token', label: 'Token', icon: QrCode },
    { to: '/farmer/procurement-status', label: 'Status', icon: Clock },
    { to: '/farmer/payment-status', label: 'Payment', icon: CreditCard },
    { to: '/farmer/history', label: 'History', icon: History },
    { to: '/farmer/help', label: 'Help & Grievance', icon: HelpCircle },
    { to: '/farmer/profile', label: 'Farmer Profile', icon: User },
  ];

  return (
    <nav className="flex flex-col gap-1 p-3">
      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Farmer Module Menu
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

export default FarmerSidebar;
