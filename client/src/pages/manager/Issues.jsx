import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  X,
  Clock,
  User,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

export const Issues = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [issues, setIssues] = useState(() => managerStorage.getIssues());
  const [modalOpen, setModalOpen] = useState(false);

  // New issue form fields
  const [issueTitle, setIssueTitle] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [priority, setPriority] = useState('High');

  useEffect(() => {
    setIssues(managerStorage.getIssues());
  }, []);

  const handleResolve = (id, title) => {
    const updated = managerStorage.resolveIssue(id);
    setIssues(updated);
    if (addToast) addToast(`Issue "${title}" marked as RESOLVED.`, 'success');
  };

  const handleClose = (id, title) => {
    const updated = managerStorage.closeIssue(id);
    setIssues(updated);
    if (addToast) addToast(`Issue "${title}" has been CLOSED.`, 'info');
  };

  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!issueTitle.trim()) return;

    const newIssue = {
      issueTitle: issueTitle.trim(),
      reportedBy: reportedBy.trim() || 'Centre Staff',
      priority,
    };

    const updated = managerStorage.addIssue(newIssue);
    setIssues(updated);
    setModalOpen(false);
    setIssueTitle('');
    setReportedBy('');
    setPriority('High');
    if (addToast) addToast('New operational issue logged successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* ── HEADER & REPORT BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Centre Issues</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track, resolve, and close operational and technical issues at the procurement centre
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* ── ISSUES LIST TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Operational Grievances &amp; Equipment Issues ({issues.length} Records)
          </h2>
          <span className="text-xs text-slate-500">
            Open: <strong className="text-rose-700">{issues.filter(i => i.status === 'Open').length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Issue Title</th>
                <th className="px-5 py-3.5">Reported By</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {issues.map((item) => {
                const isOpen = item.status === 'Open';
                const isResolved = item.status === 'Resolved';
                const isClosed = item.status === 'Closed';

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    {/* 1. Issue Title */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.issueTitle}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="font-mono">{item.id}</span>
                          <span>·</span>
                          <span>{item.timestamp || 'Today'}</span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Reported By */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800">{item.reportedBy}</span>
                      </div>
                    </td>

                    {/* 3. Priority (High / Medium / Low) */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.priority === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* 4. Status (Open / Resolved / Closed) */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          isOpen
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : isResolved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            isOpen
                              ? 'bg-rose-600 animate-pulse'
                              : isResolved
                              ? 'bg-emerald-600'
                              : 'bg-slate-400'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Buttons: Resolve & Close */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleResolve(item.id, item.issueTitle)}
                          disabled={isResolved || isClosed}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all ${
                            isResolved || isClosed
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                              : 'bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleClose(item.id, item.issueTitle)}
                          disabled={isClosed}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isClosed
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Close</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE ISSUE MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                Report Operational Issue
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Issue Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weighbridge Sensor Calibration Required"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Reported By (Officer / Staff) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Inspector Vikram Sharma"
                  value={reportedBy}
                  onChange={(e) => setReportedBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
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
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;
