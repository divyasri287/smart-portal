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
    centre: 'Salem Procurement Centre',
    crop: 'Paddy (Grade A)',
    quantity: '150',
    date: '2026-09-02',
    timeSlot: '09:00 AM - 11:00 AM',
    vehicleNo: 'TN-19-AB-4419',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingRecord = {
      bookingId: 'BK-2026-001',
      tokenId: 'TKN-A901',
      farmerName: 'M. Karthik',
      farmerId: 'FRM-1001',
      centreName: formData.centre,
      slotDate: formData.date,
      timeSlot: formData.timeSlot,
      estimatedQuantity: Number(formData.quantity || 0),
      crop: formData.crop,
      status: 'Booked',
      tokenStatus: 'Generated',
      paymentStatus: 'Payment Received',
      paymentDate: '2026-09-02',
      totalAmount: 322000,
      bankRefNo: 'DBT-2026-990123',
      mspPerQuintal: 2300,
    };

    sessionStorage.setItem('farmer-current-booking', JSON.stringify(bookingRecord));
    showToast('Slot booked successfully! Gate token generated and status updated.', 'success');
    navigate('/farmer/token');
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Book Slot" subtitle="Select your preferred procurement centre, date, and arrival slot" />

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] text-slate-700">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-semibold">✓</span>
            <span className="font-medium text-slate-800">Quick booking info</span>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-600">
            <span>MSP: ₹2,300 / quintal</span>
            <span>Queue: 07:00–16:00</span>
            <span>Token: Instant</span>
          </div>
        </div>
      </div>

      <FormWrapper title="Slot Reservation Form" subtitle="Ensure vehicle details and grain quantity are accurate" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Dropdown
            label="Procurement Centre"
            value={formData.centre}
            onChange={(e) => setFormData({ ...formData, centre: e.target.value })}
            options={['Salem Procurement Centre', 'Namakkal Procurement Centre', 'Erode Procurement Centre', 'Coimbatore Procurement Centre', 'Madurai Procurement Centre']}
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
        </div>
      </FormWrapper>
    </div>
  );
};

export default BookSlot;
