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
import { CalendarPlus, QrCode, CreditCard, Clock, History, AlertCircle, MapPin, Leaf, ShieldCheck, Bell } from 'lucide-react';

export const FarmerDashboard = () => {
  const navigate = useNavigate();
  const savedBooking = JSON.parse(sessionStorage.getItem('farmer-current-booking') || 'null');
  const activeBooking = savedBooking || bookingsData.find((booking) => booking.farmerId === 'FRM-1001') || bookingsData[0];
  const lastPayment = paymentsData.find((payment) => payment.farmerName === 'M. Karthik') || paymentsData[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Procurement Dashboard"
        subtitle="Welcome M. Karthik | Regd Farmer ID: FRM-1001"
        action={
          <PrimaryButton icon={CalendarPlus} onClick={() => navigate('/farmer/book-slot')}>
            Book Slot
          </PrimaryButton>
        }
      />

      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 p-5 sm:p-6 text-white shadow-lg shadow-emerald-900/20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-50">
              Active Procurement Cycle
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Welcome back, M. Karthik</h2>
            <p className="mt-2 max-w-xl text-sm text-emerald-50/90">
              Your slot is confirmed, token is ready, and mandi operations are progressing as scheduled.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/farmer/token')}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                View Gate Token
              </button>
              <button
                type="button"
                onClick={() => navigate('/farmer/payment-status')}
                className="rounded-lg border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Payment Status
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-100">Season</p>
              <p className="mt-2 text-xl font-bold">2026</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-100">Queue</p>
              <p className="mt-2 text-xl font-bold">12</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-100">Crop</p>
              <p className="mt-2 text-sm font-bold">Paddy</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-100">Value</p>
              <p className="mt-2 text-lg font-bold">₹ 2.6L</p>
            </div>
          </div>
        </div>
      </div>

      <VoiceAssistantPlaceholder />

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Booking Status"
          value={activeBooking ? activeBooking.bookingId : 'None'}
          subtitle={activeBooking ? `Booked • ${activeBooking.tokenStatus || 'Token Generated'}` : 'No upcoming slot'}
          icon={Clock}
          color="emerald"
          onClick={() => navigate('/farmer/procurement-status')}
        />
        <StatsCard
          title="Gate Token"
          value={activeBooking ? activeBooking.tokenId : 'N/A'}
          subtitle="Generated & Verified"
          icon={QrCode}
          color="amber"
          onClick={() => navigate('/farmer/token')}
        />
        <StatsCard
          title="Latest Payment"
          value={`₹ ${Number(lastPayment?.totalAmount || 0).toLocaleString()}`}
          subtitle={lastPayment?.status || 'DBT Credited'}
          icon={CreditCard}
          color="blue"
          onClick={() => navigate('/farmer/payment-status')}
        />
        <StatsCard
          title="Total Quantity Sold"
          value={`${lastPayment?.quantityQuintals || activeBooking?.estimatedQuantity || 0} Quintals`}
          subtitle={activeBooking?.crop || 'Paddy Grade A'}
          icon={History}
          color="indigo"
          onClick={() => navigate('/farmer/history')}
        />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Token Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Active Booking & Token Details" subtitle="Present this QR Token at Mandi Entry Gate">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><MapPin className="w-3.5 h-3.5 text-emerald-700" /> Procurement Centre</div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{activeBooking.centreName}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Leaf className="w-3.5 h-3.5 text-emerald-700" /> Crop</div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{activeBooking.crop}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Quality Check</div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">Grade A / Verified</p>
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

          <Card title="Recent Notifications" subtitle="Latest updates from the procurement centre">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate('/farmer/procurement-status')}
                className="w-full text-left flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Gate token verified</p>
                  <p className="text-xs text-slate-600">Your booking has been confirmed and updated at the mandi gate.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate('/farmer/payment-status')}
                className="w-full text-left flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Quality check scheduled</p>
                  <p className="text-xs text-slate-600">Inspection and weighing will begin after your current slot window.</p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Links */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/farmer/book-slot')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between">
                <span>Book Slot</span>
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

          <Card title="Booking Summary" subtitle="Current season overview">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Booked Quantity</span>
                <span className="font-semibold text-slate-900">{activeBooking?.estimatedQuantity || 12} Quintals</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Payment Received</span>
                <span className="font-semibold text-slate-900">₹ {Number(lastPayment?.totalAmount || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-700">Confirmed</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Current Queue</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">12</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600">Estimated wait time: 25–30 minutes</p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Next Action</p>
              <p className="mt-3 text-lg font-bold text-slate-900">Quality check</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600">Proceed to weighing and procurement verification.</p>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Mandi Support</p>
              <p className="mt-3 text-lg font-bold text-slate-900">044-2521-7104</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Bell className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600">Call the help desk for token or payment assistance.</p>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
