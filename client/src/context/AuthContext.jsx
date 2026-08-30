import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(ROLES.FARMER);
  const [user, setUser] = useState({
    id: 'USR-2026-8891',
    name: 'Ramesh Singh (Farmer)',
    role: ROLES.FARMER,
    district: 'Ludhiana',
    state: 'Punjab',
  });

  const switchRole = (newRole) => {
    setRole(newRole);
    const mockNames = {
      [ROLES.FARMER]: 'Ramesh Singh (Farmer)',
      [ROLES.OFFICER]: 'Inspector Vikram Sharma (Officer)',
      [ROLES.MANAGER]: 'Anil Kumar (Centre Manager)',
      [ROLES.ADMIN]: 'Dr. Sunita Verma (State Admin)',
      [ROLES.GUEST]: 'Visitor / Guest',
    };
    setUser((prev) => ({
      ...prev,
      role: newRole,
      name: mockNames[newRole] || 'User',
    }));
  };

  const logout = () => {
    setRole(ROLES.GUEST);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, setRole, switchRole, logout }}>
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
