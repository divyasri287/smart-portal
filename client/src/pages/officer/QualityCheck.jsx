import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import FormWrapper from '../../components/forms/FormWrapper';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import PrimaryButton from '../../components/buttons/PrimaryButton';

export const QualityCheck = () => {
  const navigate = useNavigate();
  const [moisture, setMoisture] = useState('12.4');
  const [foreignMatter, setForeignMatter] = useState('0.5');
  const [gradeResult, setGradeResult] = useState('Grade A (Passed)');

  return (
    <div className="space-y-6">
      <PageHeader title="Grain Moisture & Quality Grade Check" subtitle="Record moisture percentage, foreign matter, and assign MSP grade" />

      <FormWrapper title="Quality Inspection Report" onSubmit={(e) => { e.preventDefault(); navigate('/officer/weight-check'); }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Moisture Level (%)" type="number" step="0.1" value={moisture} onChange={(e) => setMoisture(e.target.value)} required />
          <Input label="Foreign Matter / Immature Grains (%)" type="number" step="0.1" value={foreignMatter} onChange={(e) => setForeignMatter(e.target.value)} required />
        </div>

        <Dropdown
          label="Assigned Quality Grade"
          value={gradeResult}
          onChange={(e) => setGradeResult(e.target.value)}
          options={['Grade A (Passed)', 'FAQ (Fair Average Quality)', 'Rejected (Excess Moisture)']}
          required
        />

        <PrimaryButton type="submit">Approve Quality & Proceed to Weighbridge</PrimaryButton>
      </FormWrapper>
    </div>
  );
};

export default QualityCheck;
