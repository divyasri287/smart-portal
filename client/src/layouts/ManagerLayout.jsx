import React from 'react';
import { Outlet } from 'react-router-dom';

export const ManagerLayout = () => {
  return (
    <div className="w-full space-y-6">
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
