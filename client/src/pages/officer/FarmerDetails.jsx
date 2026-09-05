import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import {
  ArrowRight, ArrowLeft, ShieldCheck, MapPin, Phone, CreditCard,
  Wheat, BarChart3, User, Landmark
} from 'lucide-react';
import farmersData from '../../data/farmers.json';

const InfoRow = ({ label, value, mono = false }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{label}</span>
    <span className={`text-sm font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</span>
  </div>
);

export const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const farmer = farmersData.find((f) => f.id === id) || farmersData[0];

  const mspCapQtl = 250;
  const alreadyProcuredQtl = 0;
  const remainingQtl = mspCapQtl - alreadyProcuredQtl;
  const usedPercent = Math.round((alreadyProcuredQtl / mspCapQtl) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Details & Profile"
        subtitle={`Verification of Aadhaar, land records, and MSP quota · ${farmer.id}`}
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>
            Back
          </SecondaryButton>
        }
      />

      {/* Farmer Identity Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-5 text-white flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold">{farmer.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{farmer.name}</h2>
          <div className="flex flex-wrap gap-3 mt-1 text-sm text-green-200">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {farmer.id}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {farmer.district}, {farmer.state}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {farmer.mobile}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-400/20 border border-green-300/30 rounded-lg px-3 py-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-green-300" />
          <span className="text-sm font-semibold text-green-100">Aadhaar Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Details */}
        <Card title="Personal & Land Details" subtitle="Registered farmer master data">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Full Name" value={farmer.name} />
            <InfoRow label="Farmer ID" value={farmer.id} mono />
            <InfoRow label="Aadhaar (Masked)" value={farmer.aadhaar} mono />
            <InfoRow label="Mobile Number" value={farmer.mobile} />
            <InfoRow label="District" value={farmer.district} />
            <InfoRow label="State" value={farmer.state} />
          </div>
        </Card>

        {/* Crop & Bank Details */}
        <Card title="Crop & Banking Details" subtitle="MSP eligibility and payment information">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Primary Crop" value={farmer.cropType} />
            <InfoRow label="Landholding" value={`${farmer.acreage} Acres`} />
            <div className="col-span-2">
              <InfoRow label="Bank Account" value={farmer.bankAccount} mono />
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-xs text-green-800">
            <Landmark className="w-4 h-4 shrink-0 text-green-600" />
            Direct DBT transfer linked to registered bank account
          </div>
        </Card>

        {/* MSP Quota */}
        <Card title="MSP Procurement Quota" subtitle="Season 2026 sanctioned cap vs. utilisation">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 font-mono">{mspCapQtl}</p>
                <p className="text-xs text-slate-400 mt-0.5">Sanctioned Cap (Qtl)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700 font-mono">{alreadyProcuredQtl}</p>
                <p className="text-xs text-slate-400 mt-0.5">Already Procured</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600 font-mono">{remainingQtl}</p>
                <p className="text-xs text-slate-400 mt-0.5">Remaining Quota</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Quota Used: {usedPercent}%</span>
                <span>{alreadyProcuredQtl} / {mspCapQtl} Qtl</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-green-700 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${usedPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-800">
              <BarChart3 className="w-4 h-4 shrink-0 text-amber-600" />
              Farmer is eligible to sell up to <span className="font-bold mx-1">{remainingQtl} Quintals</span> this season
            </div>
          </div>
        </Card>

        {/* Verification Checklist */}
        <Card title="Verification Checklist" subtitle="Pre-procurement mandatory checks">
          <div className="space-y-3">
            {[
              { label: 'Aadhaar Biometric Authentication', status: 'verified' },
              { label: 'PM-KISAN Registered & Active', status: 'verified' },
              { label: 'Land Record (Girdawari) Verified', status: 'verified' },
              { label: 'MSP Quota Not Exceeded', status: 'verified' },
              { label: 'Bank Account Linked (DBT Active)', status: 'verified' },
            ].map((check, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 bg-green-50 border border-green-100 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700">{check.label}</span>
                <span className="ml-auto text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">OK</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <PrimaryButton
          icon={ArrowRight}
          onClick={() => navigate(`/officer/verify-farmer/${farmer.id}`)}
          className="flex-1 justify-center"
        >
          Proceed to Verify Farmer
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/officer/quality-check')} className="flex-1 justify-center">
          Skip to Quality Check
        </SecondaryButton>
        <SecondaryButton icon={Wheat} onClick={() => navigate('/officer/search-farmer')} className="sm:flex-none">
          Back to Search
        </SecondaryButton>
      </div>
    </div>
  );
};

export default FarmerDetails;
