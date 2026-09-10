import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import DangerButton from '../../components/buttons/DangerButton';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import { useToast } from '../../hooks/useToast';
import {
  ArrowLeft, CheckCircle2, User, Wheat, Scale,
  FlaskConical, Landmark, IndianRupee, FileText
} from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

const SummaryRow = ({ label, value, highlight = false, mono = false }) => (
  <div className={`flex items-center justify-between py-2 border-b border-slate-100 last:border-0 ${highlight ? 'pt-3 mt-1 border-t border-slate-200' : ''}`}>
    <span className={`text-xs ${highlight ? 'font-bold text-slate-900 text-sm' : 'text-slate-500 font-medium'}`}>{label}</span>
    <span className={`${mono ? 'font-mono' : ''} ${highlight ? 'text-lg font-bold text-emerald-800' : 'text-xs font-semibold text-slate-800'}`}>{value}</span>
  </div>
);

export const SubmitProcurement = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [procurementData, setProcurementData] = useState({});

  useEffect(() => {
    const active = officerStorage.getActiveSession();
    setProcurementData({
      tokenNo: active.tokenNo || 'TKN-A901',
      farmerName: active.farmerName || 'Ramesh Singh',
      farmerId: active.farmerId || 'FRM-1001',
      aadhaar: active.aadhaar || 'XXXX-XXXX-8912',
      district: active.district || 'Ludhiana, Punjab',
      bank: active.bank || 'SBI — xxxx5678',
      commodity: active.commodity || 'Paddy Grade A',
      gradeResult: active.gradeResult || 'Grade A (Passed)',
      moisturePct: `${active.moisturePct || 12.4}%`,
      foreignMatter: `${active.foreignMatterPct || 0.5}%`,
      grossWeightKg: active.grossWeightKg || 18500,
      tareWeightKg: active.tareWeightKg || 4500,
      netWeightKg: active.netWeightKg || 14000,
      netWeightQtl: active.netWeightQtl || 140,
      mspRate: active.mspRate || 2300,
      totalAmount: active.totalAmount || 322000,
      bayAssigned: active.bayAssigned || 'Bay 3',
      vehicle: active.vehicleNo || 'PB-10-CZ-4419',
    });
  }, []);

  const handleFinalSubmit = () => {
    const receiptId = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];
    const profile = officerStorage.getProfile();

    const newReceipt = {
      receiptId: receiptId,
      tokenNo: procurementData.tokenNo,
      date: today,
      centre: profile.centreAssigned || 'Ludhiana Mandi Centre 4',
      officerName: profile.name || 'Inspector Vikram Sharma',
      officerBadge: profile.badgeNo || 'INS-PB-8891',
      farmerName: procurementData.farmerName,
      farmerId: procurementData.farmerId,
      aadhaarMasked: procurementData.aadhaar,
      mobile: '+91 98765 43210',
      district: procurementData.district?.split(',')[0] || 'Ludhiana',
      state: 'Punjab',
      bankAccount: procurementData.bank,
      commodity: procurementData.commodity,
      vehicleNo: procurementData.vehicle,
      grossWeightKg: procurementData.grossWeightKg,
      tareWeightKg: procurementData.tareWeightKg,
      netWeightKg: procurementData.netWeightKg,
      netWeightQtl: procurementData.netWeightQtl,
      moisturePct: parseFloat(procurementData.moisturePct) || 12.4,
      foreignMatterPct: parseFloat(procurementData.foreignMatter) || 0.5,
      gradeResult: procurementData.gradeResult?.includes('Grade A') ? 'Grade A' : 'FAQ',
      mspRate: procurementData.mspRate,
      totalAmount: procurementData.totalAmount,
      dbtRef: `DBT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentStatus: 'Pending Processing',
    };

    const newHistoryRecord = {
      receiptId: receiptId,
      tokenNo: procurementData.tokenNo,
      farmerName: procurementData.farmerName,
      farmerId: procurementData.farmerId,
      commodity: procurementData.commodity,
      gradeResult: newReceipt.gradeResult,
      moisturePct: newReceipt.moisturePct,
      netWeightQtl: procurementData.netWeightQtl,
      mspRate: procurementData.mspRate,
      totalAmount: procurementData.totalAmount,
      date: today,
      vehicleNo: procurementData.vehicle,
      status: 'Receipt Generated',
      paymentStatus: 'Pending Processing',
    };

    officerStorage.addReceipt(newReceipt);
    officerStorage.addHistory(newHistoryRecord);
    officerStorage.updateQueueStatus(procurementData.farmerId, 'Receipt Generated');
    officerStorage.updateQueueStatus(procurementData.tokenNo, 'Receipt Generated');
    // Publish to shared feed so Manager Reports module can read live data
    officerStorage.publishToManagerFeed(newReceipt);

    showToast('✅ Procurement entry submitted! Digital receipt generated.', 'success');
    navigate(`/officer/receipt/${receiptId}`);
  };

  return (
    <div className="space-y-4 select-auto">
      {/* Dynamic Workflow Progress: Step 5 */}
      <ProcurementWorkflowProgress currentStep={5} />

      <PageHeader
        title="Procurement Summary"
        subtitle="Review all details before generating the digital receipt"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Summary */}
        <div className="lg:col-span-2 space-y-4">
          {/* Farmer Info */}
          <Card title="Farmer Information" subtitle="Verified farmer details">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shrink-0">
                <span className="text-base font-bold text-white">{procurementData.farmerName ? procurementData.farmerName.charAt(0) : 'R'}</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{procurementData.farmerName}</p>
                <p className="text-xs text-slate-500 font-mono">{procurementData.farmerId} · {procurementData.aadhaar}</p>
                <p className="text-xs text-slate-400">{procurementData.district}</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </div>
            </div>
            <SummaryRow label="Bank Account" value={procurementData.bank} mono />
            <SummaryRow label="Token Number" value={procurementData.tokenNo} mono />
            <SummaryRow label="Vehicle Number" value={procurementData.vehicle} mono />
            <SummaryRow label="Bay Assigned" value={procurementData.bayAssigned} />
          </Card>

          {/* Commodity */}
          <Card title="Commodity & Quality Details">
            <SummaryRow label="Commodity" value={procurementData.commodity} />
            <SummaryRow label="Quality Grade" value={procurementData.gradeResult} />
            <SummaryRow label="Moisture Content" value={procurementData.moisturePct} mono />
            <SummaryRow label="Foreign Matter" value={procurementData.foreignMatter} mono />
          </Card>

          {/* Weight */}
          <Card title="Weighment Details">
            <SummaryRow label="Gross Vehicle Weight" value={`${procurementData.grossWeightKg?.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Tare Vehicle Weight" value={`${procurementData.tareWeightKg?.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Net Weight (kg)" value={`${procurementData.netWeightKg?.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Net Weight (Quintals)" value={`${procurementData.netWeightQtl} Qtl`} mono />
          </Card>
        </div>

        {/* MSP Calculation & Action */}
        <div className="space-y-4">
          <Card title="MSP Payment Calculation">
            <div className="space-y-3.5">
              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Net Quantity</span>
                  <span className="font-mono font-semibold text-slate-800">{procurementData.netWeightQtl} Quintals</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>MSP Rate (Season 2026)</span>
                  <span className="font-mono font-semibold text-slate-800">₹ {procurementData.mspRate}/Qtl</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-2 border-b border-slate-100">
                  <span>Quality Grade</span>
                  <span className="font-semibold text-emerald-700">{procurementData.gradeResult?.split(' ')[0]} {procurementData.gradeResult?.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold text-sm pt-0.5">
                  <span>Total Payable</span>
                  <span className="font-mono text-base">₹ {procurementData.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Amount Highlight */}
              <div className="bg-emerald-800 text-white rounded-xl p-3.5 text-center shadow-xs">
                <p className="text-[10px] text-emerald-300 uppercase tracking-wider mb-0.5">TOTAL MSP PAYMENT</p>
                <p className="text-2xl font-bold font-mono tracking-tight">
                  ₹ {procurementData.totalAmount?.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-emerald-200 mt-0.5">Via Aadhaar DBT · within 48 hours</p>
              </div>

              {/* DBT Info */}
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                <Landmark className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>Payment will be transferred to <strong className="mx-0.5">{procurementData.bank}</strong> via PFMS within 48 hours.</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* REQUIREMENT 8: "Generate Digital Receipt" without "Sign" */}
            <PrimaryButton
              icon={FileText}
              onClick={handleFinalSubmit}
              className="w-full justify-center text-sm py-2.5"
            >
              Generate Digital Receipt
            </PrimaryButton>
            <DangerButton
              onClick={() => navigate('/officer/dashboard')}
              className="w-full justify-center"
            >
              Cancel Entry
            </DangerButton>
          </div>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By generating the receipt, you confirm that all details adhere to FCI procurement standards for Kharif 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitProcurement;
