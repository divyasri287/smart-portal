import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { useToast } from '../../hooks/useToast';

export const SubmitProcurement = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleFinalSubmit = () => {
    showToast('Procurement Entry Submitted! Receipt generated.', 'success');
    navigate('/officer/receipt/RCP-2026-901');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Final Procurement Entry Review" subtitle="Review weighment, MSP calculation, and generate digital receipt" />

      <Card title="Summary of Verified Batch (#TKN-A901)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 mb-6">
          <div><span className="font-semibold">Farmer Name:</span> Ramesh Singh (FRM-1001)</div>
          <div><span className="font-semibold">Commodity Grade:</span> Paddy Grade A</div>
          <div><span className="font-semibold">Moisture Content:</span> 12.4% (Approved)</div>
          <div><span className="font-semibold">Net Net Weight:</span> 140 Quintals</div>
          <div><span className="font-semibold">MSP Fixed Rate:</span> ₹ 2,300 per Quintal</div>
          <div><span className="font-semibold text-emerald-800">Total Calculation:</span> <span className="text-base font-bold text-emerald-800">₹ 3,22,000</span></div>
        </div>

        <div className="flex gap-3">
          <PrimaryButton onClick={handleFinalSubmit}>Sign & Generate Digital Receipt</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/officer/dashboard')}>Cancel Entry</SecondaryButton>
        </div>
      </Card>
    </div>
  );
};

export default SubmitProcurement;
