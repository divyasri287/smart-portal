import React, { useState } from 'react';
import SlotCalendar from '../../components/manager/SlotCalendar';
import StatisticsCard from '../../components/manager/StatisticsCard';
import { slotDates, daySlotData } from '../../data/manager/slots';
import { 
  Calendar, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  AlertOctagon,
  Lock,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SlotManagement = () => {
  const [selectedDayKey, setSelectedDayKey] = useState('today');
  const [emergencyFreeze, setEmergencyFreeze] = useState(false);
  const [showNewWindowModal, setShowNewWindowModal] = useState(false);
  const [windowForm, setWindowForm] = useState({
    timeRange: '08:00 PM - 10:00 PM',
    capacity: '80'
  });

  // Per-day slot data managed in state so edit / lock actions persist within the session
  const [allDaySlots, setAllDaySlots] = useState({
    today: [...daySlotData.today.slots],
    tomorrow: [...daySlotData.tomorrow.slots],
    mon: [...daySlotData.mon.slots],
    tue: [...daySlotData.tue.slots],
  });

  const currentDayMeta = daySlotData[selectedDayKey];
  const currentSlots = allDaySlots[selectedDayKey];

  const handleDayChange = (key) => {
    setSelectedDayKey(key);
  };

  const handleSlotUpdate = (updatedSlots) => {
    setAllDaySlots((prev) => ({ ...prev, [selectedDayKey]: updatedSlots }));
  };

  const handleToggleFreeze = () => {
    setEmergencyFreeze(!emergencyFreeze);
  };

  const handleAddWindow = (e) => {
    e.preventDefault();
    const newSlot = {
      id: currentSlots.length + 1,
      timeWindow: windowForm.timeRange,
      booked: 0,
      capacity: Number(windowForm.capacity),
      status: 'Open',
    };
    setAllDaySlots((prev) => ({
      ...prev,
      [selectedDayKey]: [...prev[selectedDayKey], newSlot],
    }));
    setShowNewWindowModal(false);
  };

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Mandi Slot &amp; Capacity Configuration
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 font-['Inter']">
                Manage 2-hour hourly vehicle entry limits to prevent gate congestion and weighbridge bottlenecks
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowNewWindowModal(true)}
            className="h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs font-['Poppins'] rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot Window</span>
          </button>

          <button
            onClick={handleToggleFreeze}
            className={`h-11 px-5 font-semibold text-xs font-['Poppins'] rounded-xl transition-all flex items-center gap-2 ${
              emergencyFreeze
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{emergencyFreeze ? 'Unfreeze All Slots' : 'Emergency Freeze'}</span>
          </button>
        </div>
      </div>

      {/* Emergency Alert Mode Banner */}
      {emergencyFreeze && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-[18px] bg-red-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-amber-300 animate-pulse shrink-0" />
            <div>
              <p className="font-['Poppins'] font-bold text-sm">
                EMERGENCY OVERRIDE ACTIVE: All New Slot Bookings Locked
              </p>
              <p className="text-xs text-red-100 font-['Inter']">
                Gate intake suspended due to extreme weather or mandi storage overflow.
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleFreeze}
            className="h-9 px-4 rounded-xl bg-white text-red-700 font-bold text-xs font-['Poppins'] hover:bg-red-50 shrink-0"
          >
            Lift Suspension
          </button>
        </motion.div>
      )}

      {/* Statistics Cards — updated per selected day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Daily Mandi Quota"
          value={`${currentDayMeta.quota} Slots`}
          subtitle="Max Capacity Limit"
          trend="Configured"
          isTrendPositive={true}
          icon={Calendar}
          color="emerald"
        />
        <StatisticsCard
          title="Booked Farmer Tokens"
          value={`${currentDayMeta.booked} Slots`}
          subtitle={`${Math.round((currentDayMeta.booked / currentDayMeta.quota) * 100)}% Fill Ratio`}
          trend={selectedDayKey === 'today' ? '+12.5% vs yesterday' : 'Booking Active'}
          isTrendPositive={true}
          icon={Clock}
          color="amber"
        />
        <StatisticsCard
          title="Available Capacity"
          value={`${currentDayMeta.available} Slots`}
          subtitle="Ready for Booking"
          trend={currentDayMeta.status}
          isTrendPositive={true}
          icon={CheckCircle2}
          color="blue"
        />
        <StatisticsCard
          title="Emergency Override"
          value={emergencyFreeze ? 'Locked' : 'Normal'}
          subtitle="Mandi Intake Status"
          trend={emergencyFreeze ? 'Halted' : 'Operational'}
          isTrendPositive={!emergencyFreeze}
          icon={ShieldAlert}
          color={emergencyFreeze ? 'red' : 'emerald'}
        />
      </div>

      {/* Interactive Slot Calendar Matrix */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold font-['Poppins'] text-[#111827]">
              Interactive 2-Hour Time Window Allocation
            </h2>
            <p className="text-xs text-slate-500 font-['Inter']">
              Click cap limit or lock toggle on any 2-hour window to adjust token intake dynamically
            </p>
          </div>
        </div>

        {/* SlotCalendar receives selected day & slots — enables Today/Tomorrow/Mon/Tue switching */}
        <SlotCalendar
          selectedDayKey={selectedDayKey}
          slotsList={currentSlots}
          onDayChange={handleDayChange}
          onSlotUpdate={handleSlotUpdate}
        />
      </div>

      {/* Add New Time Window Modal */}
      {showNewWindowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[18px] p-6 max-w-md w-full border border-[#E5E7EB] shadow-2xl space-y-4 font-['Inter']"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                Create Custom 2-Hour Slot Window
              </h3>
              <button
                onClick={() => setShowNewWindowModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWindow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Window (e.g. 08:00 PM - 10:00 PM)
                </label>
                <input
                  type="text"
                  value={windowForm.timeRange}
                  onChange={(e) => setWindowForm({ ...windowForm, timeRange: e.target.value })}
                  className="w-full h-11 px-4 text-xs font-['Roboto_Mono'] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Truck Capacity Limit
                </label>
                <input
                  type="number"
                  value={windowForm.capacity}
                  onChange={(e) => setWindowForm({ ...windowForm, capacity: e.target.value })}
                  className="w-full h-11 px-4 text-xs font-['Roboto_Mono'] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewWindowModal(false)}
                  className="h-11 px-5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-slate-600 hover:bg-slate-50 font-['Poppins']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-semibold font-['Poppins'] shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Window</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;
