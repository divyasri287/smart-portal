import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import FormWrapper from '../../components/forms/FormWrapper';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Card from '../../components/cards/Card';

export const WeightCheck = () => {
  const navigate = useNavigate();
  const [grossWeight, setGrossWeight] = useState('18500');
  const [tareWeight, setTareWeight] = useState('4500');

  const netWeightQuintals = Math.max(0, (parseFloat(grossWeight || 0) - parseFloat(tareWeight || 0)) / 100);

  return (
    <div className="space-y-6">
      <PageHeader title="Weighbridge Entry & Gross Logging" subtitle="Automated digital scale input for vehicle gross and tare weight" />

      <Card title="Connected Digital Scale: Scale Bay 3">
        <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-center text-3xl font-bold rounded-md">
          NET WEIGHT: {netWeightQuintals.toFixed(2)} Quintals ({netWeightQuintals * 100} kg)
        </div>
      </Card>

      <FormWrapper title="Weighment Log" onSubmit={(e) => { e.preventDefault(); navigate('/officer/submit-procurement'); }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Gross Vehicle Weight (kg)" type="number" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} required />
          <Input label="Tare Vehicle Weight (kg)" type="number" value={tareWeight} onChange={(e) => setTareWeight(e.target.value)} required />
        </div>
        <PrimaryButton type="submit">Approve Weight & Continue</PrimaryButton>
      </FormWrapper>
    </div>
  );
};

export default WeightCheck;
