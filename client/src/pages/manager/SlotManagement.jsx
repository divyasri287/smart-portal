import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import FormWrapper from '../../components/forms/FormWrapper';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Card from '../../components/cards/Card';
import { useToast } from '../../hooks/useToast';

export const SlotManagement = () => {
  const { showToast } = useToast();
  const [maxSlots, setMaxSlots] = useState('150');

  const handleUpdate = (e) => {
    e.preventDefault();
    showToast('Slot capacity updated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Mandi Slot & Capacity Configuration" subtitle="Set daily hourly limits to prevent overcrowding at procurement bays" />

      <FormWrapper title="Update Hourly Capacity Limits" onSubmit={handleUpdate}>
        <Input label="Max Slot Capacity Per 2-Hour Window" type="number" value={maxSlots} onChange={(e) => setMaxSlots(e.target.value)} required />
        <PrimaryButton type="submit">Save Slot Configuration</PrimaryButton>
      </FormWrapper>
    </div>
  );
};

export default SlotManagement;
