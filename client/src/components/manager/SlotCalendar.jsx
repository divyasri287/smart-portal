import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Lock, Unlock, Edit3, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { slotDates } from '../../data/manager/slots';

export const SlotCalendar = ({ 
  selectedDayKey = 'today', 
  slotsList = [], 
  onDayChange, 
  onSlotUpdate 
}) => {
  const [editingSlot, setEditingSlot] = useState(null);
  const [newCapacity, setNewCapacity] = useState(120);

  const handleToggleLock = (id) => {
    const updated = slotsList.map((s) => {
      if (s.id === id) {
        const nextStatus = s.status === 'Locked' ? 'Open' : 'Locked';
        return { ...s, status: nextStatus };
      }
      return s;
    });
    if (onSlotUpdate) onSlotUpdate(updated);
  };

  const handleSaveCapacity = (e) => {
    e.preventDefault();
    if (!editingSlot) return;
    const updated = slotsList.map((s) => {
      if (s.id === editingSlot.id) {
        return { ...s, capacity: Number(newCapacity) };
      }
      return s;
    });
    setEditingSlot(null);
    if (onSlotUpdate) onSlotUpdate(updated);
  };

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Date Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {slotDates.map((d) => (
          <button
            key={d.key}
            onClick={() => onDayChange && onDayChange(d.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-['Poppins'] whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedDayKey === d.key
                ? 'bg-[#166534] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{d.label}</span>
          </button>
        ))}
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slotsList.map((slot) => {
          const fillPercent = slot.capacity > 0 ? Math.min(Math.round((slot.booked / slot.capacity) * 100), 100) : 0;
          const isFull = slot.booked >= slot.capacity;
          const isLocked = slot.status === 'Locked';

          return (
            <motion.div
              key={slot.id}
              whileHover={{ y: -2 }}
              className={`rounded-[18px] border p-5 sm:p-6 transition-all bg-white shadow-xs ${
                isLocked
                  ? 'border-slate-200 bg-slate-50 opacity-85'
                  : isFull
                  ? 'border-red-200 bg-red-50/20'
                  : 'border-[#E5E7EB] hover:border-[#166534]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#166534]" />
                  <span className="font-['Poppins'] font-bold text-sm text-[#111827]">
                    {slot.timeWindow}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-bold font-['Roboto_Mono'] px-2.5 py-0.5 rounded-full ${
                    isLocked
                      ? 'bg-slate-200 text-slate-700'
                      : isFull
                      ? 'bg-red-100 text-red-700'
                      : fillPercent > 80
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-[#166534]'
                  }`}
                >
                  {isLocked ? 'Locked' : isFull ? 'Full' : `${fillPercent}% Full`}
                </span>
              </div>

              {/* Booking Progress */}
              <div className="my-3">
                <div className="flex items-center justify-between text-xs mb-1 font-['Inter']">
                  <span className="text-slate-500">Booked Farmer Slots:</span>
                  <span className="font-bold font-['Roboto_Mono'] text-[#111827]">
                    {slot.booked} / {slot.capacity}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isLocked
                        ? 'bg-slate-400'
                        : isFull
                        ? 'bg-red-500'
                        : fillPercent > 80
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#166534]'
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              {/* Slot Control Actions */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setEditingSlot(slot);
                    setNewCapacity(slot.capacity);
                  }}
                  className="flex-1 h-10 bg-white hover:bg-[#f0fdf4] text-[#166534] border border-[#166534] rounded-xl text-xs font-semibold font-['Poppins'] transition-all flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Cap Limit ({slot.capacity})</span>
                </button>

                <button
                  onClick={() => handleToggleLock(slot.id)}
                  className={`h-10 px-3.5 rounded-xl text-xs font-semibold font-['Poppins'] transition-all flex items-center justify-center gap-1 ${
                    isLocked
                      ? 'bg-[#166534] hover:bg-[#14532d] text-white'
                      : 'bg-[#F59E0B] hover:bg-[#d97706] text-white'
                  }`}
                  title={isLocked ? 'Unlock Slot Window' : 'Lock Slot Window'}
                >
                  {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Capacity Modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[18px] p-6 max-w-md w-full border border-[#E5E7EB] shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                Adjust Slot Limit ({editingSlot.timeWindow})
              </h3>
              <button
                onClick={() => setEditingSlot(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCapacity} className="space-y-4 font-['Inter']">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Maximum Slot Capacity (Trucks / 2 Hours)
                </label>
                <input
                  type="number"
                  min={editingSlot.booked}
                  max="500"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  className="w-full h-11 px-4 text-xs font-['Roboto_Mono'] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                  required
                />
                <p className="text-[11px] text-slate-500 font-['Roboto_Mono'] mt-1">
                  Currently Booked: {editingSlot.booked} tokens.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSlot(null)}
                  className="h-11 px-5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-slate-600 hover:bg-slate-50 font-['Poppins']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-semibold font-['Poppins'] flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Capacity</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SlotCalendar;
