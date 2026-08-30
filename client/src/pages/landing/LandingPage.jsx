import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import Card from '../../components/cards/Card';
import VoiceAssistantPlaceholder from '../../components/voice/VoiceAssistantPlaceholder';
import { ShieldCheck, Calendar, QrCode, Scale, CreditCard, ArrowRight, Activity, Users, Building2 } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleSelectModule = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-xl p-8 shadow-lg border border-emerald-700 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-700/80 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-500/50">
            <ShieldCheck className="w-4 h-4" /> Smart India Hackathon Innovation Platform
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Smart Grain Procurement & Logistics Portal
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Eliminating mandi crowding through AI token generation, moisture quality verification, automated weighbridge integration, and direct bank account transfers (DBT).
          </p>

          <div className="pt-2">
            <VoiceAssistantPlaceholder />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs text-center">
          <p className="text-2xl font-bold text-emerald-800">4,250+</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Procurement Centres</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs text-center">
          <p className="text-2xl font-bold text-amber-700">1.2M+</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Farmers Enrolled</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs text-center">
          <p className="text-2xl font-bold text-blue-700">₹ 8,400 Cr</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">DBT Disbursed</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs text-center">
          <p className="text-2xl font-bold text-indigo-700">98.4%</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">On-Time Queue Resolution</p>
        </div>
      </div>

      {/* Module Quick Access Portals */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Select Portal Module</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Farmer Portal Card */}
          <Card className="hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between" title={ROLE_LABELS[ROLES.FARMER]}>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-600">
                Book slot, track token status, view quality inspection details, and check DBT payments.
              </p>
            </div>
            <PrimaryButton onClick={() => handleSelectModule(ROLES.FARMER, '/farmer/dashboard')} className="w-full">
              Enter Farmer Portal <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </Card>

          {/* Officer Portal Card */}
          <Card className="hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between" title={ROLE_LABELS[ROLES.OFFICER]}>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-600">
                Scan QR tokens, record moisture & quality grades, log weighbridge readings, and print digital receipts.
              </p>
            </div>
            <PrimaryButton onClick={() => handleSelectModule(ROLES.OFFICER, '/officer/dashboard')} className="w-full">
              Enter Officer Portal <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </Card>

          {/* Manager Portal Card */}
          <Card className="hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between" title={ROLE_LABELS[ROLES.MANAGER]}>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-600">
                Monitor mandi queue congestion, configure daily slot limits, assign inspectors, and handle disputes.
              </p>
            </div>
            <PrimaryButton onClick={() => handleSelectModule(ROLES.MANAGER, '/manager/dashboard')} className="w-full">
              Enter Manager Portal <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </Card>

          {/* Admin Portal Card */}
          <Card className="hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between" title={ROLE_LABELS[ROLES.ADMIN]}>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-600">
                State and district analytics, national procurement monitoring, user roles audit, and payment releases.
              </p>
            </div>
            <PrimaryButton onClick={() => handleSelectModule(ROLES.ADMIN, '/admin/dashboard')} className="w-full">
              Enter Admin Portal <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
