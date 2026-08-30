import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import FarmerSidebar from './FarmerSidebar';
import OfficerSidebar from './OfficerSidebar';
import ManagerSidebar from './ManagerSidebar';
import AdminSidebar from './AdminSidebar';
import { X } from 'lucide-react';

export const SidebarLayout = ({ isOpenMobile, onCloseMobile }) => {
  const { role } = useAuth();

  const renderRoleSidebar = () => {
    switch (role) {
      case ROLES.FARMER:
        return <FarmerSidebar onCloseMobile={onCloseMobile} />;
      case ROLES.OFFICER:
        return <OfficerSidebar onCloseMobile={onCloseMobile} />;
      case ROLES.MANAGER:
        return <ManagerSidebar onCloseMobile={onCloseMobile} />;
      case ROLES.ADMIN:
        return <AdminSidebar onCloseMobile={onCloseMobile} />;
      default:
        return <FarmerSidebar onCloseMobile={onCloseMobile} />;
    }
  };

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-slate-200 shrink-0 min-h-[calc(100vh-4rem)]">
        {renderRoleSidebar()}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative flex flex-col w-4/5 max-w-xs bg-white h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-800 text-white">
              <span className="font-bold text-sm">Navigation Menu</span>
              <button onClick={onCloseMobile} className="p-1 rounded-md hover:bg-emerald-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{renderRoleSidebar()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarLayout;
