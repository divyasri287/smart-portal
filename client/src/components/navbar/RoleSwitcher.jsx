import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../constants/roles';

export const RoleSwitcher = () => {
  const { role, switchRole } = useAuth();

  return (
    <div className="flex items-center gap-1 bg-emerald-900/40 p-1 rounded-lg text-xs">
      <span className="text-emerald-200 px-2 font-medium hidden lg:inline">Switch Module View:</span>
      <select
        value={role}
        onChange={(e) => switchRole(e.target.value)}
        className="bg-emerald-950 text-emerald-100 font-semibold px-2 py-1 rounded-md border border-emerald-700/50 focus:outline-hidden focus:ring-1 focus:ring-emerald-400 cursor-pointer"
      >
        <option value={ROLES.FARMER}>{ROLE_LABELS[ROLES.FARMER]}</option>
        <option value={ROLES.OFFICER}>{ROLE_LABELS[ROLES.OFFICER]}</option>
        <option value={ROLES.MANAGER}>{ROLE_LABELS[ROLES.MANAGER]}</option>
        <option value={ROLES.ADMIN}>{ROLE_LABELS[ROLES.ADMIN]}</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
