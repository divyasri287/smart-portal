import React, { useState, useEffect } from 'react';
import {
  CalendarClock,
  Plus,
  Edit2,
  Lock,
  Unlock,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

export const SlotManagement = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [slots, setSlots] = useState(() => managerStorage.getSlots());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  // Form fields
  const [timeSlot, setTimeSlot] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('40');

  useEffect(() => {
    setSlots(managerStorage.getSlots());
  }, []);

  const openAddModal = () => {
    setEditingSlot(null);
    setTimeSlot('');
    setMaxCapacity('40');
    setModalOpen(true);
  };

  const openEditModal = (slot) => {
    setEditingSlot(slot);
    setTimeSlot(slot.timeSlot);
    setMaxCapacity(String(slot.maxCapacity));
    setModalOpen(true);
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    if (!timeSlot.trim()) return;

    const capacityNum = Number(maxCapacity) || 40;

    if (editingSlot) {
      // Update existing slot
      const booked = editingSlot.bookedCount || 0;
      const available = Math.max(0, capacityNum - booked);
      const updated = managerStorage.updateSlot(editingSlot.id, {
        timeSlot: timeSlot.trim(),
        maxCapacity: capacityNum,
        availableCount: available,
      });
      setSlots(updated);
      if (addToast) addToast(`Slot ${timeSlot} updated successfully.`, 'success');
    } else {
      // Add new slot
      const newSlot = {
        timeSlot: timeSlot.trim(),
        maxCapacity: capacityNum,
        bookedCount: 0,
        availableCount: capacityNum,
        status: 'Open',
      };
      const updated = managerStorage.addSlot(newSlot);
      setSlots(updated);
      if (addToast) addToast(`New slot ${timeSlot} added.`, 'success');
    }

    setModalOpen(false);
  };

  const handleToggleSlot = (slot) => {
    const updated = managerStorage.toggleSlotStatus(slot.id);
    setSlots(updated);
    const newStatus = slot.status === 'Open' ? 'Closed' : 'Open';
    if (addToast) addToast(`Slot ${slot.timeSlot} is now ${newStatus}.`, newStatus === 'Open' ? 'success' : 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* ── HEADER & ADD SLOT BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Slot Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure hourly capacity and manage farmer booking windows for today
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slot</span>
        </button>
      </div>

      {/* ── SLOTS TABLE (EXACT 5 REQUIRED COLUMNS + ACTION BUTTONS) ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Today's Scheduled Slots ({slots.length} Slots)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Time Slot</th>
                <th className="px-5 py-3.5 text-center">Maximum Capacity</th>
                <th className="px-5 py-3.5 text-center">Booked Count</th>
                <th className="px-5 py-3.5 text-center">Available Count</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {slots.map((slot) => {
                const isOpen = slot.status === 'Open';
                return (
                  <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                    {/* 1. Time Slot */}
                    <td className="px-5 py-4 font-mono font-bold text-slate-900 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span>{slot.timeSlot}</span>
                      </div>
                    </td>

                    {/* 2. Maximum Capacity */}
                    <td className="px-5 py-4 text-center font-mono font-bold text-slate-900">
                      {slot.maxCapacity}
                    </td>

                    {/* 3. Booked Count */}
                    <td className="px-5 py-4 text-center font-mono font-bold text-emerald-800">
                      {slot.bookedCount}
                    </td>

                    {/* 4. Available Count */}
                    <td className="px-5 py-4 text-center font-mono font-bold">
                      <span
                        className={`${
                          slot.availableCount === 0 ? 'text-rose-600' : 'text-slate-700'
                        }`}
                      >
                        {slot.availableCount}
                      </span>
                    </td>

                    {/* 5. Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          isOpen
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            isOpen ? 'bg-emerald-600' : 'bg-slate-400'
                          }`}
                        />
                        {slot.status}
                      </span>
                    </td>

                    {/* Buttons: Edit Slot / Close Slot / Reopen Slot */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(slot)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {isOpen ? (
                          <button
                            type="button"
                            onClick={() => handleToggleSlot(slot)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Close Slot</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleSlot(slot)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Reopen Slot</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ADD / EDIT SLOT MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {editingSlot ? 'Edit Booking Slot' : 'Add New Booking Slot'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Time Slot Window <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 08:00 AM - 10:00 AM"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Maximum Farmer Capacity <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  placeholder="e.g. 40"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
                >
                  {editingSlot ? 'Update Slot' : 'Create Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;
