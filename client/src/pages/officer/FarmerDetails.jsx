import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import {
  ArrowRight, ArrowLeft, MapPin, Phone,
  BarChart3, User, Landmark, AlertTriangle, Info
} from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

const InfoRow = ({ label, value, mono = false }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{label}</span>
    <span className={`text-xs sm:text-sm font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value || '—'}</span>
  </div>
);

export const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Read existing farmer record from localStorage
  const farmer = officerStorage.getFarmerById(id);

  // 2. Read existing procurement history and receipts from localStorage
  const history = officerStorage.getHistory() || [];
  const receipts = officerStorage.getReceipts() || [];

  // 3. Runtime Calculation of Sanctioned Quota from existing localStorage fields
  const getSanctionedQuota = () => {
    if (!farmer) return null;
    if (farmer.sanctionedQuota != null && !isNaN(Number(farmer.sanctionedQuota))) {
      return Number(farmer.sanctionedQuota);
    }
    if (farmer.mspCapQtl != null && !isNaN(Number(farmer.mspCapQtl))) {
      return Number(farmer.mspCapQtl);
    }
    if (farmer.mspQuota != null && !isNaN(Number(farmer.mspQuota))) {
      return Number(farmer.mspQuota);
    }
    if (farmer.quota != null && !isNaN(Number(farmer.quota))) {
      return Number(farmer.quota);
    }
    if (farmer.acreage != null && !isNaN(Number(farmer.acreage)) && Number(farmer.acreage) > 0) {
      return Number(farmer.acreage) * 20; // Standard 20 Quintals / acre formula
    }
    return null;
  };

  const sanctionedQuota = getSanctionedQuota();

  // 4. Runtime Calculation of Already Procured from existing localStorage records
  const getAlreadyProcured = () => {
    if (!farmer) return null;
    if (farmer.alreadyProcured != null && !isNaN(Number(farmer.alreadyProcured))) {
      return Number(farmer.alreadyProcured);
    }
    if (farmer.procuredQtl != null && !isNaN(Number(farmer.procuredQtl))) {
      return Number(farmer.procuredQtl);
    }

    const matchingHistory = history.filter(
      (h) => h.farmerId === farmer.id || h.id === farmer.id || (farmer.tokenNo && h.tokenNo === farmer.tokenNo)
    );

    if (matchingHistory.length > 0) {
      return matchingHistory.reduce((sum, h) => sum + (Number(h.netWeightQtl) || 0), 0);
    }

    const matchingReceipts = receipts.filter(
      (r) => r.farmerId === farmer.id || (farmer.tokenNo && r.tokenNo === farmer.tokenNo)
    );

    if (matchingReceipts.length > 0) {
      return matchingReceipts.reduce((sum, r) => sum + (Number(r.netWeightQtl) || 0), 0);
    }

    return 0;
  };

  const alreadyProcured = getAlreadyProcured();

  // 5. Runtime Calculation of Remaining Quota & Excess
  const hasQuotaData = sanctionedQuota != null && alreadyProcured != null;
  const remainingQuota = hasQuotaData ? Math.max(0, sanctionedQuota - alreadyProcured) : null;
  const excessProcurement = hasQuotaData && alreadyProcured > sanctionedQuota ? alreadyProcured - sanctionedQuota : 0;

  // 6. Runtime Calculation of Utilisation % (Exact ratio, NOT capped at 100%)
  const utilisationPercent = hasQuotaData && sanctionedQuota > 0
    ? Math.round((alreadyProcured / sanctionedQuota) * 100)
    : null;

  const isOverQuota = hasQuotaData && alreadyProcured > sanctionedQuota;

  const handleProceedVerify = () => {
    officerStorage.setActiveSession({
      farmerId: farmer.id,
      farmerName: farmer.name,
      district: `${farmer.district}, ${farmer.state}`,
      commodity: farmer.cropType,
      aadhaar: farmer.aadhaar,
      bank: farmer.bankAccount,
    });
    navigate(`/officer/verify-farmer/${farmer.id}`);
  };

  return (
    <div className="space-y-4 select-auto">
      {/* Dynamic Workflow Progress: Step 2 */}
      <ProcurementWorkflowProgress currentStep={2} />

      <PageHeader
        title="Farmer Details"
        subtitle={`Procurement Identification · ${farmer?.id || id}`}
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate('/officer/scan-qr')}>
            Back
          </SecondaryButton>
        }
      />

      {/* Farmer Identity Banner (Without unverified badge) */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-4 text-white flex flex-col sm:flex-row sm:items-center gap-3.5 border border-emerald-700 shadow-2xs">
        <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold">{farmer?.name ? farmer.name.charAt(0) : 'F'}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-bold">{farmer?.name || 'Registered Farmer'}</h2>
          <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-0.5 text-xs text-emerald-200">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-emerald-300" /> {farmer?.id || id}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-300" /> {farmer?.district ? `${farmer.district}, ${farmer.state}` : '—'}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-300" /> {farmer?.mobile || '—'}</span>
          </div>
        </div>
      </div>

      {/* Main Details Grid: Clean & Compact without unwanted empty space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* 1. Farmer Personal Details */}
        <Card title="Farmer Personal Details">
          <div className="grid grid-cols-2 gap-3.5">
            <InfoRow label="Full Name" value={farmer?.name} />
            <InfoRow label="Farmer ID" value={farmer?.id || id} mono />
            <InfoRow label="Aadhaar (Masked)" value={farmer?.aadhaar} mono />
            <InfoRow label="Mobile Number" value={farmer?.mobile} />
            <InfoRow label="District" value={farmer?.district} />
            <InfoRow label="State" value={farmer?.state} />
          </div>
        </Card>

        {/* 2. Crop & Banking Details */}
        <Card title="Crop & Banking Details">
          <div className="grid grid-cols-2 gap-3.5">
            <InfoRow label="Primary Crop" value={farmer?.cropType} />
            <InfoRow label="Landholding" value={farmer?.acreage ? `${farmer.acreage} Acres` : '—'} />
            <div className="col-span-2">
              <InfoRow label="Bank Account" value={farmer?.bankAccount} mono />
            </div>
          </div>
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
            <Landmark className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Direct DBT transfer linked to registered bank account</span>
          </div>
        </Card>

        {/* 3. MSP Procurement Quota (Calculated at Runtime strictly from localStorage) */}
        <div className="lg:col-span-2">
          <Card title="MSP Procurement Quota">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono leading-none">
                    {sanctionedQuota != null ? sanctionedQuota : 'Not available'}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Sanctioned Quota (Qtl)</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-lg sm:text-xl font-bold text-emerald-700 font-mono leading-none">
                    {alreadyProcured != null ? alreadyProcured : 'Not available'}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Already Procured (Qtl)</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className={`text-lg sm:text-xl font-bold font-mono leading-none ${isOverQuota ? 'text-rose-600' : 'text-amber-600'}`}>
                    {remainingQuota != null ? remainingQuota : 'Not available'}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Remaining Quota (Qtl)</p>
                </div>
              </div>

              {hasQuotaData ? (
                <>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>
                        Quota Utilisation: <strong className={isOverQuota ? 'text-rose-700 font-bold' : 'text-slate-800 font-bold'}>{utilisationPercent}%</strong>
                      </span>
                      <span className="font-mono">{alreadyProcured} / {sanctionedQuota} Qtl</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${isOverQuota ? 'bg-rose-600' : 'bg-emerald-700'}`}
                        style={{ width: `${Math.min(100, utilisationPercent)}%` }}
                      />
                    </div>
                  </div>

                  {isOverQuota ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-800">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>
                        Sanctioned quota exceeded by <strong className="font-bold">{excessProcurement} Qtl</strong> (Utilisation: <strong className="font-bold">{utilisationPercent}%</strong>)
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-lg flex items-center gap-2 text-xs text-amber-800">
                      <BarChart3 className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>
                        Eligible to sell up to <strong className="font-bold">{remainingQuota} Quintals</strong> this Kharif season
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-600">
                  <Info className="w-4 h-4 shrink-0 text-slate-400" />
                  <span>Procurement quota details not available in localStorage for this farmer.</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons: Primary Verify Action + Back to Search */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <PrimaryButton
          icon={ArrowRight}
          onClick={handleProceedVerify}
          className="flex-1 justify-center py-2.5 text-xs sm:text-sm font-bold shadow-xs"
        >
          Proceed to Verify Farmer
        </PrimaryButton>
        <SecondaryButton
          icon={ArrowLeft}
          onClick={() => navigate('/officer/search-farmer')}
          className="sm:flex-none justify-center py-2.5 text-xs sm:text-sm font-semibold"
        >
          Back to Search
        </SecondaryButton>
      </div>
    </div>
  );
};

export default FarmerDetails;
