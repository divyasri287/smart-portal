import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, QrCode, Clock, CreditCard, History, HelpCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FarmerSidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <nav className="flex h-full flex-col bg-[#f3f3f3]">
      <div className="bg-[#0d6b5a] px-3 py-1.5 border-b border-[#0b5648]">
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white leading-4">
          FARMER MODULE MENU
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col pt-0">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0d6b5a] text-white shadow-inner'
                      : 'text-slate-800 hover:bg-slate-200 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="bg-[#f3f3f3] p-2 pt-1.5 shrink-0">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-2 py-2 text-[14px] font-medium text-slate-800 transition hover:bg-slate-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

export default FarmerSidebar;
