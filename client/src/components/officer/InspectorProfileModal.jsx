import React, { useState } from 'react';
import { X, ShieldCheck, User, Building2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

export const InspectorProfileModal = ({ isOpen, onClose, onProfileUpdated }) => {
  const currentProfile = officerStorage.getProfile();

  // Strip leading "Inspector " for editing convenience, but preserve title if wanted
  const initialName = (currentProfile.name || 'Vikram Sharma').replace(/^inspector\s+/i, '');

  const [name, setName] = useState(initialName);
  const [badgeNo, setBadgeNo] = useState(currentProfile.badgeNo || 'INS-PB-8891');
  const [centreAssigned, setCentreAssigned] = useState(currentProfile.centreAssigned || 'Ludhiana Mandi Centre 4');
  const [shift, setShift] = useState(currentProfile.shift || 'Morning (08:00 AM – 04:00 PM)');
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return 'Inspector name is required.';
    }
    if (trimmed.length < 2) {
      return 'Inspector name must be at least 2 characters.';
    }
    if (trimmed.length > 50) {
      return 'Inspector name cannot exceed 50 characters.';
    }
    // Check if name contains valid letters, spaces, dots, hyphens
    const nameRegex = /^[a-zA-Z\s.-]+$/;
    if (!nameRegex.test(trimmed)) {
      return 'Inspector name can only contain letters, dots, and hyphens.';
    }
    return '';
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    const cleanName = name.trim();
    const formattedName = cleanName.toLowerCase().startsWith('inspector')
      ? cleanName
      : `Inspector ${cleanName}`;

    const updated = {
      ...currentProfile,
      name: formattedName,
      badgeNo: (badgeNo || 'INS-PB-8891').trim(),
      centreAssigned: (centreAssigned || 'Ludhiana Mandi Centre 4').trim(),
      shift: shift.trim(),
    };

    officerStorage.updateProfile(updated);
    setSavedSuccess(true);

    if (onProfileUpdated) {
      onProfileUpdated(updated);
    }

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-4.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white leading-tight">Inspector Profile</h3>
              <p className="text-xs text-emerald-200">View and update Officer credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Name Field with validation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>Officer / Inspector Name <span className="text-rose-600">*</span></span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold select-none">
                Inspector
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Vikram Sharma"
                className={`w-full bg-slate-50 border ${
                  error ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-600'
                } rounded-lg pl-18 pr-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 transition-all`}
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </p>
            )}
          </div>

          {/* Badge Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Official Badge Number</span>
            </label>
            <input
              type="text"
              value={badgeNo}
              onChange={(e) => setBadgeNo(e.target.value)}
              placeholder="INS-PB-8891"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 transition-all"
            />
          </div>

          {/* Mandi Centre Assigned */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Assigned Mandi Centre</span>
            </label>
            <input
              type="text"
              value={centreAssigned}
              onChange={(e) => setCentreAssigned(e.target.value)}
              placeholder="Ludhiana Mandi Centre 4"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 transition-all"
            />
          </div>

          {/* Shift */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Assigned Duty Shift</span>
            </label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 transition-all"
            >
              <option value="Morning (08:00 AM – 04:00 PM)">Morning (08:00 AM – 04:00 PM)</option>
              <option value="Evening (04:00 PM – 12:00 AM)">Evening (04:00 PM – 12:00 AM)</option>
              <option value="Night (12:00 AM – 08:00 AM)">Night (12:00 AM – 08:00 AM)</option>
              <option value="General Shift (09:00 AM – 05:00 PM)">General Shift (09:00 AM – 05:00 PM)</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectorProfileModal;
