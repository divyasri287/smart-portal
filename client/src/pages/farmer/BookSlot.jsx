import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import FormWrapper from '../../components/forms/FormWrapper';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { useToast } from '../../hooks/useToast';

export const BookSlot = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    centre: 'Ludhiana Mandi Centre 4',
    crop: 'Paddy (Grade A)',
    quantity: '150',
    date: '2026-09-02',
    timeSlot: '09:00 AM - 11:00 AM',
    vehicleNo: 'PB-10-CZ-4419',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Slot booked successfully! QR Token generated.', 'success');
    navigate('/farmer/token');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Book Mandi Slot" subtitle="Select your preferred procurement centre, date, and arrival slot" />

      <FormWrapper title="Slot Reservation Form" subtitle="Ensure vehicle details and grain quantity are accurate" onSubmit={handleSubmit}>
        <Dropdown
          label="Procurement Mandi Centre"
          value={formData.centre}
          onChange={(e) => setFormData({ ...formData, centre: e.target.value })}
          options={['Ludhiana Mandi Centre 4', 'Patiala Grain Mandi', 'Ambala APMC Mandi']}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Dropdown
            label="Commodity / Crop Grade"
            value={formData.crop}
            onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
            options={['Paddy (Grade A)', 'Wheat (Common)', 'Mustard Seed', 'Maize']}
            required
          />
          <Input
            label="Estimated Quantity (Quintals)"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Preferred Slot Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Dropdown
            label="Arrival Time Window"
            value={formData.timeSlot}
            onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
            options={['07:00 AM - 09:00 AM', '09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM']}
            required
          />
        </div>

        <Input
          label="Tractor / Vehicle Registration Number"
          value={formData.vehicleNo}
          onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
          required
        />

        <div className="flex gap-3 pt-2">
          <PrimaryButton type="submit">Confirm & Generate Token Pass</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/farmer/dashboard')}>Cancel</SecondaryButton>
        </div>
      </FormWrapper>
    </div>
  );
};

export default BookSlot;
