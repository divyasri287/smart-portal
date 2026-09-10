import React, { useState, useEffect, useMemo } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Eye,
  Check,
  X,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminPayments = () => {
  const [payments, setPayments] = useState(() => adminStorage.getPayments());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setPayments(adminStorage.getPayments());
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleApprove = (payment) => {
    const updated = adminStorage.markPaymentPaid(payment.id);
    setPayments(adminStorage.getPayments());
    if (selectedPayment && selectedPayment.id === payment.id) {
      setSelectedPayment(updated);
    }
    showToast(`Payment of ₹ ${payment.amount.toLocaleString('en-IN')} to ${payment.farmerName} approved & marked as Paid.`);
  };

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        p.farmerName.toLowerCase().includes(q) ||
        p.tokenNumber.toLowerCase().includes(q) ||
        p.crop.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Pending' && p.status === 'Pending') ||
        (statusFilter === 'Completed' && (p.status === 'Completed' || p.status === 'In Clearing'));

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const pStats = useMemo(() => adminStorage.getPaymentStats(), [payments]);

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Management</h1>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── 4 SUMMARY STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Payments</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{pStats.totalCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Procurement Records</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-amber-700">Pending Payments</p>
          <p className="text-2xl font-extrabold text-amber-800 font-mono mt-1">{pStats.pendingCount}</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Awaiting Clearance</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-green-700">Completed Payments</p>
          <p className="text-2xl font-extrabold text-green-800 font-mono mt-1">{pStats.completedCount}</p>
          <p className="text-[11px] text-green-600 mt-0.5">Credited to Accounts</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Amount</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            ₹ {(pStats.totalAmount / 100000).toFixed(1)}L
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Disbursed MSP Value</p>
        </div>
      </div>

      {/* ── SEARCH & STATUS FILTER ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by farmer name, token, or crop..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-green-700 bg-slate-50/60"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
          {['All', 'Pending', 'Completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-green-800 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── PAYMENTS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Farmer Name</th>
                <th className="py-3.5 px-4">Token Number</th>
                <th className="py-3.5 px-4">Crop</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Payment Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const isCompleted = p.status === 'Completed';
                  const isPending = p.status === 'Pending';
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{p.farmerName}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{p.tokenNumber}</td>
                      <td className="py-3.5 px-4 text-slate-800">{p.crop}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        ₹ {p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            isCompleted
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCompleted ? 'bg-green-600' : 'bg-amber-500'
                            }`}
                          />
                          <span>{isCompleted ? 'Paid' : p.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{p.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment(p)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>View Details</span>
                          </button>

                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(p)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5 text-green-700" />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleApprove(p)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-green-800 hover:bg-green-700 transition-colors shadow-2xs cursor-pointer"
                              >
                                Mark as Paid
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── VIEW DETAILS MODAL ── */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-200" />
                <h3 className="font-bold text-base">Payment Details Voucher</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-green-800 uppercase tracking-wider">
                    Total MSP Amount
                  </p>
                  <p className="text-2xl font-extrabold text-green-950 font-mono mt-0.5">
                    ₹ {selectedPayment.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-green-800 border border-green-300">
                  {selectedPayment.status === 'Completed' ? 'PAID' : selectedPayment.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Farmer Name:</span>
                  <span className="font-bold text-slate-900">{selectedPayment.farmerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Token Number:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedPayment.tokenNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Procured Crop:</span>
                  <span className="font-medium text-slate-900">{selectedPayment.crop}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Procured Quantity:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedPayment.quantityQuintals} Quintals</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Bank & Account:</span>
                  <span className="text-slate-900 font-mono">{selectedPayment.bankName} ({selectedPayment.accountNumber})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-mono text-slate-900">{selectedPayment.ifsc}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Payment Date:</span>
                  <span className="font-mono text-slate-900">{selectedPayment.date}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {selectedPayment.status === 'Pending' ? (
                <button
                  type="button"
                  onClick={() => handleApprove(selectedPayment)}
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Approve &amp; Mark as Paid
                </button>
              ) : (
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Disbursed to Account
                </span>
              )}

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
