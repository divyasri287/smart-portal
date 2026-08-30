import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import FormWrapper from '../../components/forms/FormWrapper';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Card from '../../components/cards/Card';
import { PhoneCall } from 'lucide-react';

export const Help = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Farmer Helpdesk & Grievance Portal" subtitle="Submit complaints or request assistance regarding slot booking and DBT payment delays" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FormWrapper title="Submit Grievance Ticket" onSubmit={(e) => { e.preventDefault(); alert('Ticket submitted!'); }}>
            <Dropdown label="Grievance Category" options={['Payment Delay / DBT Issue', 'Slot Booking Error', 'Quality Moisture Dispute', 'Weighbridge Discrepancy']} required />
            <Input label="Token / Booking ID (Optional)" placeholder="e.g. TKN-A901" />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Describe Your Issue *</label>
              <textarea rows={4} className="w-full border border-slate-300 rounded-md p-3 text-sm" placeholder="Provide clear details..." required />
            </div>
            <PrimaryButton type="submit">Submit Ticket</PrimaryButton>
          </FormWrapper>
        </div>

        <div>
          <Card title="Toll-Free Kisan Helpline">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-md border border-emerald-200">
              <PhoneCall className="w-6 h-6 text-emerald-700" />
              <div>
                <p className="text-xs font-bold text-emerald-950">National Toll-Free</p>
                <p className="text-sm font-extrabold text-emerald-800">1800-1100-2026</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
