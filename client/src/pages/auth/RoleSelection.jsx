import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Tractor, ClipboardCheck, Building2, Landmark } from 'lucide-react';

const ROLE_TILES = [
  {
    id: 'farmer',
    label: 'Farmer',
    subLabel: 'Annadata / Kisan',
    icon: Tractor,
    color: 'bg-emerald-700 hover:bg-emerald-800',
    border: 'border-emerald-600',
  },
  {
    id: 'officer',
    label: 'Procurement Officer',
    subLabel: 'Field Procurement Staff',
    icon: ClipboardCheck,
    color: 'bg-emerald-800 hover:bg-emerald-900',
    border: 'border-emerald-700',
  },
  {
    id: 'manager',
    label: 'Centre Manager',
    subLabel: 'Mandi / Centre Head',
    icon: Building2,
    color: 'bg-teal-800 hover:bg-teal-900',
    border: 'border-teal-700',
  },
  {
    id: 'admin',
    label: 'Government Admin',
    subLabel: 'State / National Directorate',
    icon: Landmark,
    color: 'bg-slate-800 hover:bg-slate-900',
    border: 'border-slate-700',
  },
];

export const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    if (!selectedRole) return;
    navigate(`/login/${selectedRole}`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto select-none cursor-default">
      {/* Welcome Header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 mb-3">
          <ShieldCheck className="w-10 h-10 text-emerald-700" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome to Smart Procurement Portal
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Select your role to access the Government MSP System
        </p>
      </div>

      {/* Role Tiles */}
      <div className="grid grid-cols-2 gap-3">
        {ROLE_TILES.map((tile) => {
          const Icon = tile.icon;
          const isSelected = selectedRole === tile.id;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setSelectedRole(tile.id)}
              className={`relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 text-white font-bold transition-all cursor-pointer select-none
                ${tile.color} ${tile.border}
                ${isSelected ? 'ring-4 ring-offset-2 ring-emerald-400 scale-[1.02] shadow-lg' : 'shadow-sm opacity-90 hover:opacity-100 hover:scale-[1.01]'}
              `}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="w-3 h-3 bg-emerald-600 rounded-full block" />
                </span>
              )}
              <Icon className="w-7 h-7 text-white" />
              <span className="text-sm font-extrabold text-center leading-tight">{tile.label}</span>
              <span className="text-[10px] font-medium text-white/70 text-center">{tile.subLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedRole}
        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-all cursor-pointer select-none"
      >
        Continue →
      </button>

      <p className="text-center text-[11px] text-slate-400">
        This is an official Government of India portal. Unauthorised access is prohibited.
      </p>
    </div>
  );
};

export default RoleSelection;
