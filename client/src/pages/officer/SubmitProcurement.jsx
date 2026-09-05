import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import DangerButton from '../../components/buttons/DangerButton';
import { useToast } from '../../hooks/useToast';
import {
  ArrowLeft, CheckCircle2, User, Wheat, Scale,
  FlaskConical, Landmark, IndianRupee, FileText
} from 'lucide-react';

const SummaryRow = ({ label, value, highlight = false, mono = false }) => (
  <div className={`flex items-center justify-between py-2 border-b border-slate-100 last:border-0 ${highlight ? 'pt-3 mt-1 border-t border-slate-200' : ''}`}>
    <span className={`text-xs ${highlight ? 'font-bold text-slate-900 text-sm' : 'text-slate-500 font-medium'}`}>{label}</span>
    <span className={`${mono ? 'font-mono' : ''} ${highlight ? 'text-lg font-bold text-green-800' : 'text-xs font-semibold text-slate-800'}`}>{value}</span>
  </div>
);

export const SubmitProcurement = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const procurementData = {
    tokenNo: 'TKN-A901',
    farmerName: 'Ramesh Singh',
    farmerId: 'FRM-1001',
    aadhaar: 'XXXX-XXXX-8912',
    district: 'Ludhiana, Punjab',
    bank: 'SBI — xxxx5678',
    commodity: 'Paddy Grade A',
    gradeResult: 'Grade A (Passed)',
    moisturePct: '12.4%',
    foreignMatter: '0.5%',
    grossWeightKg: 18500,
    tareWeightKg: 4500,
    netWeightKg: 14000,
    netWeightQtl: 140,
    mspRate: 2300,
    totalAmount: 322000,
    bayAssigned: 'Bay 3',
    vehicle: 'PB-10-CZ-4419',
  };

  const handleFinalSubmit = () => {
    showToast('✅ Procurement entry submitted! Digital receipt generated.', 'success');
    navigate('/officer/receipt/RCP-2026-901');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement Summary"
        subtitle="Review all details before generating the digital receipt"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      {/* Status Progress */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Procurement Workflow Progress</p>
        <div className="flex items-center gap-0">
          {['QR Scanned', 'Verified', 'Quality OK', 'Weighed', 'Summary', 'Receipt'].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <div className={`flex flex-col items-center gap-1 ${idx < 5 ? 'flex-1' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  idx < 4
                    ? 'bg-green-700 border-green-700 text-white'
                    : idx === 4
                    ? 'bg-green-800 border-green-800 text-white ring-4 ring-green-100'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {idx < 4 ? '✓' : idx + 1}
                </div>
                <span className={`text-[9px] font-semibold text-center leading-tight ${
                  idx === 4 ? 'text-green-800' : idx < 4 ? 'text-slate-500' : 'text-slate-300'
                }`}>{step}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`h-0.5 flex-1 mb-4 ${idx < 4 ? 'bg-green-600' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Summary */}
        <div className="lg:col-span-2 space-y-5">
          {/* Farmer Info */}
          <Card title="Farmer Information" subtitle="Verified farmer details">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-white">R</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{procurementData.farmerName}</p>
                <p className="text-xs text-slate-500 font-mono">{procurementData.farmerId} · {procurementData.aadhaar}</p>
                <p className="text-xs text-slate-400">{procurementData.district}</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-green-700 text-xs font-bold bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
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
            <SummaryRow label="Gross Vehicle Weight" value={`${procurementData.grossWeightKg.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Tare Vehicle Weight" value={`${procurementData.tareWeightKg.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Net Weight (kg)" value={`${procurementData.netWeightKg.toLocaleString('en-IN')} kg`} mono />
            <SummaryRow label="Net Weight (Quintals)" value={`${procurementData.netWeightQtl} Qtl`} mono />
          </Card>
        </div>

        {/* MSP Calculation & Action */}
        <div className="space-y-5">
          <Card title="MSP Payment Calculation">
            <div className="space-y-4">
              {/* Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Net Quantity</span>
                  <span className="font-mono font-semibold text-slate-800">{procurementData.netWeightQtl} Quintals</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>MSP Rate (Paddy 2026)</span>
                  <span className="font-mono font-semibold text-slate-800">₹ {procurementData.mspRate}/Qtl</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-2 border-b border-slate-100">
                  <span>Quality Grade</span>
                  <span className="font-semibold text-green-700">{procurementData.gradeResult.split(' ')[0]} {procurementData.gradeResult.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between text-green-800 font-bold text-base pt-1">
                  <span>Total Payable</span>
                  <span className="font-mono">₹ {procurementData.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Amount Highlight */}
              <div className="bg-green-800 text-white rounded-xl p-4 text-center">
                <p className="text-xs text-green-300 mb-1">TOTAL MSP PAYMENT</p>
                <p className="text-3xl font-bold font-mono tracking-tight">
                  ₹ {procurementData.totalAmount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-green-300 mt-1">Via Aadhaar DBT · within 48 hours</p>
              </div>

              {/* DBT Info */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                <Landmark className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                Payment will be transferred to <strong className="mx-0.5">SBI — xxxx5678</strong> via PFMS/DBT within 48 working hours.
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <PrimaryButton
              icon={FileText}
              onClick={handleFinalSubmit}
              className="w-full justify-center text-sm py-3"
            >
              Sign & Generate Digital Receipt
            </PrimaryButton>
            <DangerButton
              onClick={() => navigate('/officer/dashboard')}
              className="w-full justify-center"
            >
              Cancel Entry
            </DangerButton>
          </div>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By submitting, you confirm that all details are accurate and agree to the FCI procurement norms for Season 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitProcurement;
