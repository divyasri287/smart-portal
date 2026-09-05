import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, CheckCircle2, Clock, XCircle, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import PaymentTable from '../../components/admin/PaymentTable';
import Modal from '../../components/dialogs/Modal';
import { paymentMonitoringData, dashboardOverviewStats } from '../../data/adminData';

export const PaymentMonitoring = () => {
  const navigate = useNavigate();
  const [paymentsList, setPaymentsList] = useState(paymentMonitoringData);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleSyncClick = () => {
    setIsSyncModalOpen(true);
    setSyncSuccess(false);
  };

  const handleConfirmSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setPaymentsList((prev) =>
        prev.map((p) => (p.status === 'Pending' ? { ...p, status: 'Completed' } : p))
      );
      setTimeout(() => {
        setIsSyncModalOpen(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/centre-monitoring')} className="hover:text-[#166534]">
              Centre Monitoring
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">Payment Monitoring</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/analytics')} className="hover:text-[#166534]">
              Analytics
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Direct Benefit Transfer (DBT) Financial Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">
            Government Admin portal for tracking Direct Benefit Transfer disbursements, bank clearance, and payment batches
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncClick}
            className="flex items-center gap-2 bg-white hover:bg-[#166534]/5 text-[#166534] border border-[#166534]/30 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-2xs"
          >
            <RefreshCw className="w-4 h-4" /> Trigger NPCI Sync
          </button>
          <button
            onClick={() => navigate('/admin/analytics')}
            className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            Analytics <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 4 Top Payment Summary KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#166534]/10 text-[#166534]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Allocated</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.totalPayments}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">National Procurement Budget</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#15803D]/10 text-[#15803D]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed DBT</p>
            <p className="text-2xl font-bold text-[#166534] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.completedPayments}</p>
            <p className="text-[11px] text-[#15803D] font-semibold mt-0.5">Credited to Farmer Accounts</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#d97706]/10 text-[#d97706]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Batch</p>
            <p className="text-2xl font-bold text-[#d97706] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.pendingPayments}</p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">In Transit / Bank Verification</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#dc2626]/10 text-[#dc2626]">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Failed / Mismatch</p>
            <p className="text-2xl font-bold text-[#dc2626] mt-0.5 font-mono leading-tight">{dashboardOverviewStats.failedPayments}</p>
            <p className="text-[11px] text-red-600 font-medium mt-0.5">Aadhaar / IFSC Mismatch</p>
          </div>
        </div>
      </div>

      {/* ── Payment Monitoring Table ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827] tracking-tight">Payment Ledger & Transaction Status</h2>
          <span className="text-xs font-semibold text-slate-500 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-lg">
            Showing {paymentsList.length} Recorded Transactions
          </span>
        </div>
        <PaymentTable payments={paymentsList} onTriggerBatchRelease={handleSyncClick} />
      </div>

      {/* ── Settlement Sync Modal ── */}
      {isSyncModalOpen && (
        <Modal
          isOpen={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
          title="Trigger NPCI Bank Settlement Sync"
        >
          <div className="space-y-4 text-sm">
            {syncSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#166534] flex items-center gap-3 font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>NPCI Clearing Gateway successfully synced! Pending payments updated to Completed.</span>
              </div>
            ) : (
              <>
                <p className="text-slate-600">
                  Are you sure you want to trigger a manual settlement sync for pending farmer Direct Benefit Transfers?
                </p>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-mono text-xs space-y-1">
                  <span className="block text-slate-500 font-sans font-medium">Batch Summary:</span>
                  <span className="block font-bold text-[#111827]">Batch ID: BATCH-PAY-2026-0905</span>
                  <span className="block text-[#15803D]">Pending Target Amount: {dashboardOverviewStats.pendingPayments}</span>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsSyncModalOpen(false)}
                    disabled={isSyncing}
                    className="bg-white hover:bg-slate-50 text-[#15803D] border border-[#15803D] font-semibold rounded-xl px-4 py-2 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSync}
                    disabled={isSyncing}
                    className="bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl px-5 py-2 text-sm shadow-xs flex items-center gap-2 transition-colors"
                  >
                    {isSyncing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Clearing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Execute Sync
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PaymentMonitoring;

