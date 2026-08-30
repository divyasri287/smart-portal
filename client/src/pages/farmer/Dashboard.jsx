import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import StatusBadge from '../../components/status/StatusBadge';
import VoiceAssistantPlaceholder from '../../components/voice/VoiceAssistantPlaceholder';
import bookingsData from '../../data/bookings.json';
import paymentsData from '../../data/payments.json';
import { CalendarPlus, QrCode, CreditCard, Clock, History, AlertCircle } from 'lucide-react';

export const FarmerDashboard = () => {
  const navigate = useNavigate();
  const activeBooking = bookingsData[0];
  const lastPayment = paymentsData[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kisan Procurement Dashboard"
        subtitle="Welcome Ramesh Singh | Regd Farmer ID: FRM-1001"
        action={
          <PrimaryButton icon={CalendarPlus} onClick={() => navigate('/farmer/book-slot')}>
            Book Mandi Slot
          </PrimaryButton>
        }
      />

      <VoiceAssistantPlaceholder />

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Booking" value={activeBooking ? activeBooking.bookingId : 'None'} subtitle={activeBooking ? activeBooking.slotDate : 'No upcoming slot'} icon={Clock} color="emerald" />
        <StatsCard title="Gate Token" value={activeBooking ? activeBooking.tokenId : 'N/A'} subtitle="Mandi Gate Pass" icon={QrCode} color="amber" />
        <StatsCard title="Latest Payment" value={`₹ ${(lastPayment?.totalAmount).toLocaleString()}`} subtitle={lastPayment?.status} icon={CreditCard} color="blue" />
        <StatsCard title="Total Quantity Sold" value="140 Quintals" subtitle="Paddy Grade A" icon={History} color="indigo" />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Token Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Active Mandi Booking & Token Details" subtitle="Present this QR Token at Mandi Entry Gate">
            {activeBooking ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-md gap-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Token ID</span>
                    <h4 className="text-lg font-bold text-slate-900 font-mono">{activeBooking.tokenId}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{activeBooking.centreName}</p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <StatusBadge status={activeBooking.status} />
                    <span className="text-xs text-slate-500 mt-1">{activeBooking.slotDate} ({activeBooking.timeSlot})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <PrimaryButton icon={QrCode} onClick={() => navigate('/farmer/token')}>
                    View QR Token Pass
                  </PrimaryButton>
                  <PrimaryButton icon={Clock} onClick={() => navigate('/farmer/procurement-status')}>
                    Track Status
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No active bookings found.</p>
            )}
          </Card>
        </div>

        {/* Right Col: Quick Links */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/farmer/book-slot')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between">
                <span>Book Mandi Slot</span>
                <CalendarPlus className="w-4 h-4 text-emerald-700" />
              </button>
              <button onClick={() => navigate('/farmer/payment-status')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between">
                <span>View Payment & DBT Credit</span>
                <CreditCard className="w-4 h-4 text-emerald-700" />
              </button>
              <button onClick={() => navigate('/farmer/help')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between">
                <span>Raise Grievance / Helpdesk</span>
                <AlertCircle className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
