import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('sih_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem('sih_role');
    return savedRole || null;
  });

  const login = (selectedRole, customUser = null) => {
    const mockProfiles = {
      [ROLES.FARMER]: {
        id: 'FRM-1001',
        name: 'M. Karthik',
        role: ROLES.FARMER,
        district: 'Salem',
        state: 'Tamil Nadu',
      },
      [ROLES.OFFICER]: {
        id: 'OFF-204',
        name: 'V. Balasubramaniam',
        role: ROLES.OFFICER,
        centre: 'Salem Main Procurement Centre',
      },
      [ROLES.MANAGER]: {
        id: 'MGR-501',
        name: 'Anand Kumar',
        role: ROLES.MANAGER,
        centre: 'Salem Centre #402',
      },
      [ROLES.ADMIN]: {
        id: 'ADM-901',
        name: 'Dr. S. Meenakshi',
        role: ROLES.ADMIN,
        department: 'Tamil Nadu Agricultural Department',
      },
    };

    const userObj = customUser || mockProfiles[selectedRole] || {
      id: 'USR-2026',
      name: 'Authenticated User',
      role: selectedRole,
    };

    setRole(selectedRole);
    setUser(userObj);
    sessionStorage.setItem('sih_role', selectedRole);
    sessionStorage.setItem('sih_user', JSON.stringify(userObj));
    localStorage.removeItem('sih_role');
    localStorage.removeItem('sih_user');
  };

  const switchRole = (newRole) => {
    login(newRole);
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    sessionStorage.removeItem('sih_role');
    sessionStorage.removeItem('sih_user');
    localStorage.removeItem('sih_role');
    localStorage.removeItem('sih_user');
  };

  const isAuthenticated = Boolean(user && role);

  return (
    <AuthContext.Provider value={{ role, user, isAuthenticated, login, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
