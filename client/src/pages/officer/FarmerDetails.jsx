import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';

export const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader title={`Farmer Verification: ${id || 'FRM-1001'}`} subtitle="Verification of bank details, land records, and MSP quota" />

      <Card title="Farmer Master Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 mb-6">
          <div><span className="font-semibold">Full Name:</span> Ramesh Singh</div>
          <div><span className="font-semibold">Farmer ID:</span> FRM-1001</div>
          <div><span className="font-semibold">Aadhaar Verification:</span> <span className="text-emerald-700 font-bold">✓ Biometric Authenticated</span></div>
          <div><span className="font-semibold">District:</span> Ludhiana, Punjab</div>
          <div><span className="font-semibold">Sanctioned MSP Cap:</span> 250 Quintals</div>
          <div><span className="font-semibold">Already Procured:</span> 0 Quintals</div>
        </div>

        <div className="flex gap-3">
          <PrimaryButton onClick={() => navigate('/officer/quality-check')}>Proceed to Quality Inspection</PrimaryButton>
        </div>
      </Card>
    </div>
  );
};

export default FarmerDetails;
