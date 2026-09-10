import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  FileSpreadsheet, 
  BarChart3, 
  AlertTriangle,
  Bell,
  User,
  Shield,
  Building2
} from 'lucide-react';

export const ManagerSidebar = ({ onCloseMobile }) => {
  const mainLinks = [
    { to: '/manager/dashboard', label: 'Command Centre', icon: LayoutDashboard, badge: null },
    { to: '/manager/queue-monitoring', label: 'Queue Oversight', icon: Activity, badge: 'Live' },
    { to: '/manager/slot-management', label: 'Slot Allocation', icon: Calendar, badge: null },
    { to: '/manager/officer-management', label: 'Officer Deployment', icon: ShieldCheck, badge: '8 On Duty' },
    { to: '/manager/reports', label: 'Centre Reports', icon: FileSpreadsheet, badge: null },
    { to: '/manager/analytics', label: 'Mandi Analytics', icon: BarChart3, badge: null },
    { to: '/manager/issues', label: 'Grievances & Issues', icon: AlertTriangle, badge: '2 Open', badgeColor: 'bg-amber-100 text-amber-800' },
  ];

  const secondaryLinks = [
    { to: '/manager/notifications', label: 'Centre Alerts', icon: Bell, badge: '3' },
    { to: '/manager/profile', label: 'Centre Profile', icon: User, badge: null },
  ];

  return (
    <nav className="flex flex-col h-full bg-white p-3 text-[#111827] font-['Inter']">
      {/* Mandi Identity Header */}
      <div className="px-3.5 py-3 mb-2 bg-gradient-to-r from-emerald-950 via-[#166534] to-[#15803D] text-white rounded-[16px] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-amber-300" />
          <span className="text-[10px] font-extrabold font-['Poppins'] tracking-wider uppercase text-amber-200">
            Centre Manager
          </span>
        </div>
        <p className="text-xs font-bold font-['Poppins'] truncate">Salem Mandi (TN-4)</p>
        <p className="text-[10px] text-emerald-200 font-['Roboto_Mono']">Chief: Anand Kumar</p>
      </div>

      {/* Main Navigation Group */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-['Poppins']">
          Core Operations
        </div>
        {mainLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#166534] text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-[#166534]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-['Poppins']">{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] font-bold font-['Roboto_Mono'] px-2 py-0.5 rounded-full ${
                    link.badgeColor || 'bg-emerald-100 text-[#166534]'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="my-3 border-t border-[#E5E7EB]" />

      {/* System Settings & Setup Group */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-['Poppins']">
          Management & Setup
        </div>
        {secondaryLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#166534] text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-[#166534]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-['Poppins']">{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold font-['Roboto_Mono'] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Support Info */}
      <div className="mt-auto pt-4 border-t border-[#E5E7EB] px-1">
        <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[11px] text-slate-600">
          <div className="flex items-center gap-2 text-[#166534] font-bold font-['Poppins'] mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>NIC Mandi Portal</span>
          </div>
          <p className="text-[10px] text-slate-500 font-['Inter']">Helpline: 1800-180-1551</p>
          <p className="text-[10px] text-slate-500 font-['Roboto_Mono']">System v2.4</p>
        </div>
      </div>
    </nav>
  );
};

export default ManagerSidebar;
