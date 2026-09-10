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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onToggleDesktopSidebar={() => setDesktopSidebarOpen((prev) => !prev)}
        isDesktopSidebarOpen={desktopSidebarOpen}
      />
      <div className="flex-1 flex w-full">
        <SidebarLayout
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          isDesktopSidebarOpen={desktopSidebarOpen}
        />
        {/* Only apply left margin if the sidebar is fixed (Farmer role). In normal flex flow, no margin-left is needed! */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 ${
            isFarmerRole && desktopSidebarOpen ? 'md:ml-60' : 'md:ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
