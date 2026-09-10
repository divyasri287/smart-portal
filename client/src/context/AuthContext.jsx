import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';

const AuthContext = createContext();

// Valid Credentials for Staff Roles
const VALID_CREDENTIALS = {
  [ROLES.OFFICER]: { id: 'OFF001', password: 'officer123' },
  [ROLES.MANAGER]: { id: 'MGR001', password: 'manager123' },
  [ROLES.ADMIN]:   { id: 'ADM001', password: 'admin123'  },
};

const DEMO_PROFILES = {
  [ROLES.FARMER]: {
    id: 'FRM-1001',
    name: 'Ramesh Singh',
    role: ROLES.FARMER,
    mobile: '9876543210',
    district: 'Ludhiana',
    state: 'Punjab',
    village: 'Samrala',
    centre: 'Salem Main Procurement Centre',
  },
  [ROLES.OFFICER]: {
    id: 'OFF001',
    name: 'Vikram Sharma',
    role: ROLES.OFFICER,
    mobile: '9812345678',
    centre: 'Salem Main Procurement Centre',
    centreName: 'Salem Main Procurement Centre',
  },
  [ROLES.MANAGER]: {
    id: 'MGR001',
    name: 'Anil Kumar',
    role: ROLES.MANAGER,
    mobile: '9834567890',
    centre: 'Salem Centre #402',
    centreName: 'Salem Centre #402',
  },
  [ROLES.ADMIN]: {
    id: 'ADM001',
    name: 'Dr. Sunita Verma',
    role: ROLES.ADMIN,
    email: 'sunita.verma@gov.in',
    department: 'Ministry of Agriculture',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('spp_user') || localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('spp_role') || localStorage.getItem('role') || null;
  });

  const login = (selectedRole, identifier = '', password = '') => {
    if (!selectedRole) return { success: false, message: 'Please select a role.' };

    const targetRole = selectedRole.toLowerCase();

    // Farmer Login (by registered mobile number)
    if (targetRole === ROLES.FARMER) {
      const cleanMobile = String(identifier).trim().replace(/\D/g, '');
      if (cleanMobile.length !== 10) {
        return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
      }
      const profile = {
        ...DEMO_PROFILES[ROLES.FARMER],
        mobile: cleanMobile,
      };
      _saveSession(ROLES.FARMER, profile);
      return { success: true, user: profile };
    }

    // Staff Login (Officer, Manager, Admin)
    const cleanId = String(identifier).trim().toUpperCase();
    const cleanPass = String(password).trim();

    if (!cleanId) {
      return { success: false, message: `Please enter your ${targetRole.toUpperCase()} ID.` };
    }
    if (!cleanPass) {
      return { success: false, message: 'Please enter your Password.' };
    }

    const expected = VALID_CREDENTIALS[targetRole];
    if (!expected) {
      return { success: false, message: 'Invalid role.' };
    }

    // Check credentials
    if (cleanId !== expected.id || cleanPass !== expected.password) {
      return { success: false, message: `Invalid ${targetRole.toUpperCase()} ID or Password.` };
    }

    const profile = {
      ...DEMO_PROFILES[targetRole],
      id: cleanId,
    };

    _saveSession(targetRole, profile);
    return { success: true, user: profile };
  };

  const registerUser = (selectedRole, record, autoLogin = false) => {
    const stored = JSON.parse(localStorage.getItem('spp_farmers') || '[]');
    stored.push(record);
    localStorage.setItem('spp_farmers', JSON.stringify(stored));
    if (autoLogin) {
      _saveSession(selectedRole, record);
    }
    return { success: true, user: record };
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem('spp_role');
    localStorage.removeItem('spp_user');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('sih_role');
    localStorage.removeItem('sih_user');
  };

  const _saveSession = (r, u) => {
    setRole(r);
    setUser(u);
    const jsonU = JSON.stringify(u);
    localStorage.setItem('spp_role', r);
    localStorage.setItem('spp_user', jsonU);
    localStorage.setItem('role', r);
    localStorage.setItem('user', jsonU);
    localStorage.setItem('sih_role', r);
    localStorage.setItem('sih_user', jsonU);
  };

  const isAuthenticated = Boolean(user && role);

  return (
    <AuthContext.Provider value={{ role, user, isAuthenticated, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthContext;
