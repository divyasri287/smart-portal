import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { useToast } from '../../hooks/useToast';
import {
  ArrowRight, ArrowLeft, ShieldCheck, Check, ClipboardList,
  Fingerprint, FileText, Landmark, BarChart3
} from 'lucide-react';
import farmersData from '../../data/farmers.json';

const VerifyItem = ({ icon: Icon, title, detail, verified = true }) => (
  <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
    verified
      ? 'bg-green-50 border-green-200'
      : 'bg-amber-50 border-amber-200'
  }`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
      verified ? 'bg-green-100' : 'bg-amber-100'
    }`}>
      <Icon className={`w-5 h-5 ${verified ? 'text-green-700' : 'text-amber-700'}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
    </div>
    <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
      verified
        ? 'bg-green-100 text-green-700'
        : 'bg-amber-100 text-amber-700'
    }`}>
      {verified
        ? <><Check className="w-3 h-3" /> Verified</>
        : <>⚠ Pending</>
      }
    </div>
  </div>
);

export const VerifyFarmer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [officerNotes, setOfficerNotes] = useState('');
  const [approved, setApproved] = useState(false);

  const farmer = farmersData.find((f) => f.id === id) || farmersData[0];

  const handleApprove = () => {
    setApproved(true);
    showToast('✅ Farmer verified and approved for procurement!', 'success');
    setTimeout(() => navigate('/officer/quality-check'), 1200);
  };

  const checks = [
    {
      icon: Fingerprint,
      title: 'Aadhaar Biometric Authentication',
      detail: `Aadhaar ${farmer.aadhaar} — Biometric scan confirmed at gate terminal`,
      verified: true,
    },
    {
      icon: FileText,
      title: 'Land Records (Girdawari / J-Form)',
      detail: `Landholding: ${farmer.acreage} Acres in ${farmer.district}. Revenue records verified from State portal.`,
      verified: true,
    },
    {
      icon: BarChart3,
      title: 'MSP Quota Not Exceeded',
      detail: 'Sanctioned Cap: 250 Quintals · Procured this season: 0 Quintals · Remaining: 250 Qtl',
      verified: true,
    },
    {
      icon: Landmark,
      title: 'Bank Account & DBT Linkage',
      detail: `Account: ${farmer.bankAccount} — Active PFMS linkage confirmed`,
      verified: true,
    },
    {
      icon: ShieldCheck,
      title: 'PM-KISAN Registration',
      detail: 'Active beneficiary — Annual instalment credited. No de-duplication flag.',
      verified: true,
    },
    {
      icon: ClipboardList,
      title: 'No Prior Fraud / Blacklist Entry',
      detail: 'AGMARKNET lookup clear. No previous rejection record in this season.',
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verify Farmer"
        subtitle={`Complete verification before proceeding to Quality Check · ${farmer.id}`}
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(`/officer/farmer-details/${farmer.id}`)}>
            Back to Details
          </SecondaryButton>
        }
      />

      {/* Farmer Quick Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shrink-0">
          {farmer.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">{farmer.name}</p>
          <p className="text-xs text-slate-300 font-mono">{farmer.id} · {farmer.cropType} · {farmer.acreage} Acres</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-green-300">Verification In Progress</span>
        </div>
      </div>

      {/* Verification Checklist */}
      <Card title="Mandatory Verification Checks" subtitle="All checks must pass before farmer is approved for procurement">
        <div className="space-y-3">
          {checks.map((check, idx) => (
            <VerifyItem key={idx} {...check} />
          ))}
        </div>

        {/* All Clear Banner */}
        <div className="mt-5 p-4 bg-green-800 text-white rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm">All {checks.length} Checks Passed</p>
              <p className="text-xs text-green-200">Farmer is eligible for MSP procurement this session</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Officer Notes & Signature */}
      <Card title="Officer Remarks & Approval" subtitle="Add optional notes before signing off">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Officer Remarks (Optional)</label>
            <textarea
              rows={3}
              placeholder="Add any notes about this verification..."
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none transition-colors"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            <strong>Inspector Vikram Sharma</strong> · Badge: INS-PB-8891 · 
            Ludhiana Mandi Centre 4 · {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>

          {approved ? (
            <div className="flex items-center gap-2 text-green-700 font-semibold text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <Check className="w-4 h-4" /> Approved! Redirecting to Quality Check...
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton
                icon={ArrowRight}
                onClick={handleApprove}
                className="flex-1 justify-center"
              >
                Approve & Proceed to Quality Check
              </PrimaryButton>
              <SecondaryButton
                onClick={() => navigate('/officer/dashboard')}
                className="sm:flex-none"
              >
                Cancel
              </SecondaryButton>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VerifyFarmer;
