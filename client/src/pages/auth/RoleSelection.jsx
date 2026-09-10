import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Tractor, ClipboardCheck, Building2, Landmark } from 'lucide-react';

const ROLE_TILES = [
  {
    id: 'farmer',
    label: 'Farmer',
    icon: Tractor,
    color: 'bg-emerald-700 hover:bg-emerald-800',
    border: 'border-emerald-600',
  },
  {
    id: 'officer',
    label: 'Procurement Officer',
    icon: ClipboardCheck,
    color: 'bg-emerald-800 hover:bg-emerald-900',
    border: 'border-emerald-700',
  },
  {
    id: 'manager',
    label: 'Centre Manager',
    icon: Building2,
    color: 'bg-teal-800 hover:bg-teal-900',
    border: 'border-teal-700',
  },
  {
    id: 'admin',
    label: 'Government Admin',
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
      {/* Welcome Header - Subtitle removed */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-12 h-12 text-emerald-700" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Welcome to Smart Procurement Portal
        </h1>
      </div>

      {/* Role Tiles - Subtitles removed */}
      <div className="grid grid-cols-2 gap-3.5">
        {ROLE_TILES.map((tile) => {
          const Icon = tile.icon;
          const isSelected = selectedRole === tile.id;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setSelectedRole(tile.id)}
              className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 text-white font-bold transition-all cursor-pointer select-none
                ${tile.color} ${tile.border}
                ${isSelected ? 'ring-4 ring-offset-2 ring-emerald-400 scale-[1.02] shadow-lg' : 'shadow-sm opacity-90 hover:opacity-100 hover:scale-[1.01]'}
              `}
            >
              {isSelected && (
                <span className="absolute top-2.5 right-2.5 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="w-3 h-3 bg-emerald-600 rounded-full block" />
                </span>
              )}
              <Icon className="w-8 h-8 text-white" />
              <span className="text-base font-extrabold text-center leading-tight">{tile.label}</span>
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
