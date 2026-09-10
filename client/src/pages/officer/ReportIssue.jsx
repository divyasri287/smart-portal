import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Send,
  Building2,
  Clock,
  ArrowLeft,
  Scale,
  FlaskConical,
  QrCode,
  Truck,
  HelpCircle,
} from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

export const ReportIssue = () => {
  const navigate = useNavigate();
  const profile = officerStorage.getProfile();

  const [issueType, setIssueType] = useState('Weighing machine problem');
  const [bayLocation, setBayLocation] = useState('Bay 1 (Weighbridge)');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submittedIssue, setSubmittedIssue] = useState(null);

  const issueCategories = [
    {
      id: 'Weighing machine problem',
      label: 'Weighing Machine / Bridge Problem',
      icon: Scale,
      desc: 'Calibration drift, sensor freeze, or gross/tare weight error',
    },
    {
      id: 'Quality/inspection problem',
      label: 'Quality / Inspection Problem',
      icon: FlaskConical,
      desc: 'Moisture meter fault, sampling dispute, or grading discrepancy',
    },
    {
      id: 'QR/Token problem',
      label: 'QR / Token Scanner Problem',
      icon: QrCode,
      desc: 'Unreadable gate token, farmer mismatch, or scanner hardware fault',
    },
    {
      id: 'Mandi/vehicle problem',
      label: 'Mandi / Vehicle Congestion Problem',
      icon: Truck,
      desc: 'Severe bay queue backup, tractor blockage, or unloading delay',
    },
    {
      id: 'Other issue',
      label: 'Other Operational Issue',
      icon: HelpCircle,
      desc: 'Network outage, power cut, printer issue, or general grievance',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDesc = description.trim();
    if (!trimmedDesc) {
      setError('Please provide a short description of the problem for the Manager.');
      return;
    }
    if (trimmedDesc.length < 5) {
      setError('Description should be at least 5 characters long.');
      return;
    }

    setError('');

    const issueRecord = {
      id: `ISS-${Date.now().toString().slice(-4)}`,
      issueType,
      bayLocation,
      priority,
      description: trimmedDesc,
      officerName: profile.name || 'Inspector Vikram Sharma',
      officerBadge: profile.badgeNo || 'INS-PB-8891',
      centre: profile.centreAssigned || 'Ludhiana Mandi Centre 4',
      reportedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      status: 'Intimated to Manager',
    };

    // Save to officerStorage
    if (officerStorage.reportIssue) {
      officerStorage.reportIssue(issueRecord);
    } else {
      try {
        const key = 'sih_officer_reported_issues';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([issueRecord, ...existing]));
      } catch (err) {
        console.error('Failed to save issue:', err);
      }
    }

    setSubmittedIssue(issueRecord);
  };

  const handleReset = () => {
    setDescription('');
    setSubmittedIssue(null);
    setError('');
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl p-4.5 shadow-xs border border-emerald-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Report Issue to Mandi Manager
            </h1>
            <p className="text-xs text-emerald-200">
              Immediate operational alert & intimation for centre supervisor
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/officer/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-700/60 text-emerald-200 hover:text-white transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* SUCCESS CONFIRMATION STATE */}
      {submittedIssue ? (
        <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-1">
                Active Ticket: {submittedIssue.id}
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Issue reported to Manager successfully.
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                The Mandi Centre Manager has been intimated with your report. Center technician or supervisor will attend to this workstation immediately.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500 font-medium">Issue Category:</span>
              <span className="font-bold text-slate-800">{submittedIssue.issueType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500 font-medium">Workstation / Location:</span>
              <span className="font-semibold text-slate-800">{submittedIssue.bayLocation}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500 font-medium">Priority Level:</span>
              <span className="font-bold text-rose-700">{submittedIssue.priority} Priority</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500 font-medium">Reported By:</span>
              <span className="font-semibold text-slate-800">
                {submittedIssue.officerName} ({submittedIssue.officerBadge})
              </span>
            </div>
            <div className="pt-1">
              <span className="text-slate-500 font-medium block mb-1">Description Provided:</span>
              <p className="text-slate-800 font-mono bg-white p-2.5 rounded border border-slate-200 text-xs">
                "{submittedIssue.description}"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate('/officer/dashboard')}
              className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              Return to Dashboard
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Report Another Issue
            </button>
          </div>
        </div>
      ) : (
        /* MAIN REPORT ISSUE FORM */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Operational Incident Form
              </h2>
              <p className="text-[11px] text-slate-500">
                Logged under {profile.name || 'Inspector Vikram Sharma'} ({profile.badgeNo || 'INS-PB-8891'})
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* 1. Issue Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Issue Type <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {issueCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = issueType === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setIssueType(cat.id)}
                      className={`text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold leading-tight">{cat.label}</p>
                        <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{cat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Bay Location & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bay / Workstation Location
                </label>
                <select
                  value={bayLocation}
                  onChange={(e) => setBayLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                >
                  <option value="Bay 1 (Weighbridge)">Bay 1 (Weighbridge)</option>
                  <option value="Bay 2 (Quality Inspection)">Bay 2 (Quality Inspection)</option>
                  <option value="Bay 3 (Unloading Ramp)">Bay 3 (Unloading Ramp)</option>
                  <option value="Bay 4 (General)">Bay 4 (General)</option>
                  <option value="Main Gate Token Entry">Main Gate Token Entry</option>
                  <option value="Procurement Office Desk">Procurement Office Desk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Urgency / Priority Level
                </label>
                <div className="flex gap-2">
                  {['Normal', 'High', 'Critical'].map((p) => {
                    const active = priority === p;
                    const colors = {
                      Normal: active ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200',
                      High: active ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200',
                      Critical: active ? 'bg-rose-700 text-white border-rose-700' : 'bg-slate-50 text-slate-700 border-slate-200',
                    };
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${colors[p]}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Short Description */}
            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. Short Description of the Problem <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Briefly describe what is malfunctioning (e.g. Weighbridge load cell fluctuating by +/- 50kg, moisture analyzer calibration expired, gate token QR scanner not reading printed tokens)..."
                className={`w-full bg-slate-50 border ${
                  error ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-600'
                } rounded-lg p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 transition-all`}
              />
              {error && (
                <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => navigate('/officer/dashboard')}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel / Close
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Issue to Manager</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;
