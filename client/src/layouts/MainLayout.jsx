import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import SidebarLayout from '../components/sidebar/SidebarLayout';
import Footer from '../components/footer/Footer';
import ToastContainer from '../components/notifications/ToastContainer';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';

export const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const { role } = useAuth();

  const isFarmerRole = role === ROLES.FARMER;

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sticky Top Navbar */}
      <div className="shrink-0 z-40">
        <Navbar
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onToggleDesktopSidebar={() => setDesktopSidebarOpen((prev) => !prev)}
          isDesktopSidebarOpen={desktopSidebarOpen}
        />
      </div>

      {/* Main Workstation Container: Independent scroll for Sidebar and Dashboard */}
      <div className="flex-1 flex w-full overflow-hidden">
        <SidebarLayout
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          isDesktopSidebarOpen={desktopSidebarOpen}
        />
        
        {/* Main Dashboard: Scrolls independently */}
        <main
          className={`flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0 flex flex-col ${
            isFarmerRole && desktopSidebarOpen ? 'md:ml-60' : 'md:ml-0'
          }`}
        >
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="mt-8 shrink-0">
            <Footer />
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
