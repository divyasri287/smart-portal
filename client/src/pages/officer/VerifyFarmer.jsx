import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import { useToast } from '../../hooks/useToast';
import {
  ArrowRight, ArrowLeft, ShieldCheck, Check, ClipboardList,
  Fingerprint, FileText, Landmark, BarChart3, RefreshCw
} from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

const VerifyItem = ({ icon: Icon, title, detail, verified = true, actionButton = null }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg border transition-all ${
    verified
      ? 'bg-emerald-50/50 border-emerald-200/70'
      : 'bg-amber-50/60 border-amber-200'
  }`}>
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-900 leading-tight">{title}</p>
        <p className="text-[11px] text-slate-500 mt-0.5 truncate">{detail}</p>
      </div>
    </div>

    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
      {actionButton}
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
        verified
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-amber-100 text-amber-800'
      }`}>
        {verified ? (
          <><Check className="w-3 h-3 text-emerald-700" /> Verified</>
        ) : (
          <>Pending</>
        )}
      </span>
    </div>
  </div>
);

export const VerifyFarmer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [officerNotes, setOfficerNotes] = useState('');
  const [approved, setApproved] = useState(false);

  // Verification states
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [isAuthenticatingAadhaar, setIsAuthenticatingAadhaar] = useState(false);
  const [pmKisanVerified, setPmKisanVerified] = useState(false);
  const [isCheckingPmKisan, setIsCheckingPmKisan] = useState(false);

  const farmer = officerStorage.getFarmerById(id);

  // Derive quota details from localStorage
  const history = officerStorage.getHistory() || [];
  const mspCapQtl = Math.round(Number(farmer?.acreage || 12.5) * 20) || 250;
  const alreadyProcuredQtl = history
    .filter((h) => h.farmerId === farmer?.id)
    .reduce((sum, h) => sum + (Number(h.netWeightQtl) || 0), 0);
  const remainingQtl = Math.max(0, mspCapQtl - alreadyProcuredQtl);

  const handleBiometricAuth = () => {
    setIsAuthenticatingAadhaar(true);
    setTimeout(() => {
      setAadhaarVerified(true);
      setIsAuthenticatingAadhaar(false);
      showToast('✅ Aadhaar Biometric authentication successful!', 'success');
    }, 350);
  };

  const handlePmKisanCheck = () => {
    setIsCheckingPmKisan(true);
    setTimeout(() => {
      setPmKisanVerified(true);
      setIsCheckingPmKisan(false);
      showToast('✅ PM-KISAN record matched!', 'success');
    }, 350);
  };

  const totalChecks = 6;
  const passedChecksCount = (aadhaarVerified ? 1 : 0) + (pmKisanVerified ? 1 : 0) + 4;
  const allChecksPassed = passedChecksCount === totalChecks;

  const handleApprove = () => {
    if (!allChecksPassed) {
      showToast('⚠️ Complete all verification checks before approving.', 'error');
      return;
    }

    setApproved(true);
    
    // Save to active session in localStorage
    officerStorage.setActiveSession({
      farmerId: farmer?.id || id,
      farmerName: farmer?.name || 'Registered Farmer',
      district: `${farmer?.district || 'Ludhiana'}, ${farmer?.state || 'Punjab'}`,
      commodity: farmer?.cropType || 'Paddy Grade A',
      aadhaar: farmer?.aadhaar || 'XXXX-XXXX-8912',
      bank: farmer?.bankAccount || 'SBIN0001234 - xxxx5678',
      officerNotes: officerNotes,
    });

    // Update queue status
    officerStorage.updateQueueStatus(farmer?.id || id, 'Quality Verified');

    showToast('✅ Farmer verified! Proceeding to Quality Check...', 'success');
    setTimeout(() => navigate('/officer/quality-check'), 500);
  };

  const checks = [
    {
      icon: Fingerprint,
      title: 'Aadhaar Biometric Authentication',
      detail: aadhaarVerified
        ? `Aadhaar ${farmer?.aadhaar || 'XXXX-XXXX-8912'} • Biometric authentication successful • Verified at gate terminal`
        : `Aadhaar ${farmer?.aadhaar || 'XXXX-XXXX-8912'} • Biometric scan required`,
      verified: aadhaarVerified,
      actionButton: !aadhaarVerified ? (
        <button
          type="button"
          onClick={handleBiometricAuth}
          disabled={isAuthenticatingAadhaar}
          className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600 text-white px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
        >
          {isAuthenticatingAadhaar ? (
            <><RefreshCw className="w-3 h-3 animate-spin" /> Scanning...</>
          ) : (
            <><Fingerprint className="w-3 h-3" /> Authenticate</>
          )}
        </button>
      ) : null,
    },
    {
      icon: FileText,
      title: 'Land Records (Girdawari / J-Form)',
      detail: `${farmer?.acreage || 12.5} Acres in ${farmer?.district || 'Ludhiana'} verified`,
      verified: true,
    },
    {
      icon: BarChart3,
      title: 'MSP Quota Not Exceeded',
      detail: `${remainingQtl} Qtl available (Sanctioned: ${mspCapQtl} Qtl · Procured: ${alreadyProcuredQtl} Qtl)`,
      verified: true,
    },
    {
      icon: Landmark,
      title: 'Bank Account & DBT Linkage',
      detail: `${farmer?.bankAccount || 'SBIN0001234 - xxxx5678'} • PFMS active`,
      verified: true,
    },
    {
      icon: ShieldCheck,
      title: 'PM-KISAN Registration',
      detail: pmKisanVerified
        ? 'Active beneficiary • PM-KISAN record matched • No de-duplication flag'
        : 'Beneficiary record lookup required',
      verified: pmKisanVerified,
      actionButton: !pmKisanVerified ? (
        <button
          type="button"
          onClick={handlePmKisanCheck}
          disabled={isCheckingPmKisan}
          className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600 text-white px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
        >
          {isCheckingPmKisan ? (
            <><RefreshCw className="w-3 h-3 animate-spin" /> Verifying...</>
          ) : (
            <><ShieldCheck className="w-3 h-3" /> Check PM-KISAN</>
          )}
        </button>
      ) : null,
    },
    {
      icon: ClipboardList,
      title: 'No Prior Fraud / Blacklist Entry',
      detail: 'AGMARKNET clean • No adverse records',
      verified: true,
    },
  ];

  return (
    <div className="space-y-3.5 select-auto">
      {/* Dynamic Workflow Progress: Step 2 */}
      <ProcurementWorkflowProgress currentStep={2} />

      <PageHeader
        title="Verify Farmer"
        subtitle={`Gate Verification · ${farmer?.id || id}`}
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(`/officer/farmer-details/${farmer?.id || id}`)}>
            Back to Details
          </SecondaryButton>
        }
      />

      {/* Farmer Summary Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl px-4 py-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs shrink-0">
            {farmer?.name ? farmer.name.charAt(0) : 'F'}
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-white">{farmer?.name || 'Registered Farmer'}</p>
            <p className="text-[11px] text-slate-300 font-mono">{farmer?.id || id} · {farmer?.cropType || 'Paddy Grade A'} · {farmer?.district || 'Ludhiana'}, {farmer?.state || 'Punjab'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2.5 py-1 text-xs font-semibold text-emerald-300 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{allChecksPassed ? 'All 6 Verified' : `${passedChecksCount}/6 Completed`}</span>
        </div>
      </div>

      {/* Mandatory Verification Checks */}
      <Card title="Mandatory Verification Checks">
        <div className="space-y-2">
          {checks.map((check, idx) => (
            <VerifyItem key={idx} {...check} />
          ))}
        </div>

        {/* Verification Summary Banner */}
        {allChecksPassed ? (
          <div className="mt-3.5 p-3 bg-emerald-800 text-white rounded-lg flex items-center justify-between gap-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-xs">All 6 Mandatory Checks Passed</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40">
              Eligible for MSP
            </span>
          </div>
        ) : (
          <div className="mt-3.5 p-3 bg-amber-800 text-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                !
              </div>
              <p className="font-bold text-xs">{passedChecksCount} of 6 Checks Completed</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAadhaarVerified(true);
                setPmKisanVerified(true);
                showToast('✅ All verification checks completed!', 'success');
              }}
              className="text-xs font-bold bg-white text-amber-900 hover:bg-amber-50 px-2.5 py-1 rounded-md transition-colors self-start sm:self-auto shrink-0"
            >
              Verify All
            </button>
          </div>
        )}
      </Card>

      {/* Officer Remarks & Sign-off */}
      <Card title="Officer Approval">
        <div className="space-y-3">
          <div>
            <textarea
              rows={2}
              placeholder="Officer Remarks (Optional)..."
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none transition-colors"
            />
          </div>

          {approved ? (
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
              <Check className="w-4 h-4" /> Approved! Redirecting to Quality Check...
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2.5">
              <PrimaryButton
                icon={ArrowRight}
                onClick={handleApprove}
                disabled={!allChecksPassed}
                className={`flex-1 justify-center py-2.5 text-xs sm:text-sm font-bold shadow-xs ${!allChecksPassed ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Approve & Proceed to Quality Check
              </PrimaryButton>
              <SecondaryButton
                onClick={() => navigate('/officer/dashboard')}
                className="sm:flex-none justify-center py-2.5 text-xs sm:text-sm font-semibold"
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
