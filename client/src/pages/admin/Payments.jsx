import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  Check,
  X,
  User,
  Landmark,
  Building2,
  Wheat,
  Calendar,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminPayments = () => {
  const [payments, setPayments] = useState(() => adminStorage.getPayments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Completed'
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setPayments(adminStorage.getPayments());
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleMarkPaid = (payment) => {
    const updated = adminStorage.markPaymentPaid(payment.id);
    setPayments(adminStorage.getPayments());
    if (selectedPayment && selectedPayment.id === payment.id) {
      setSelectedPayment(updated);
    }
    showToast(`Payment of ₹ ${payment.amount.toLocaleString('en-IN')} to ${payment.farmerName} approved and marked PAID.`);
  };

  // Filtered payments
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const completedCount = payments.filter((p) => p.status === 'Completed').length;
  const pendingCount = payments.filter((p) => p.status === 'Pending').length;

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              Direct Benefit Transfer (DBT)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Procurement Payment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track farmer grain procurement payments, audit account details, and approve statutory DBT disbursements
          </p>
        </div>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── TOP SUMMARY CARDS (MAX 4 CARDS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total MSP Payments</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            ₹ {totalAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{payments.length} Total Vouchers</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-amber-700">Pending Clearance</p>
          <p className="text-2xl font-extrabold text-amber-800 font-mono mt-1">
            ₹ {pendingAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-amber-600 mt-1">{pendingCount} Vouchers Pending</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700">Completed Payments</p>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono mt-1">
            {completedCount} Disbursed
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">Credited to Farmer Bank</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Statutory Window</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">&lt; 48 Hours</p>
          <p className="text-[11px] text-slate-400 mt-1">DBT Mandate Compliance</p>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by farmer name, token or crop..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
          {['All', 'Pending', 'Completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ' +
                (statusFilter === st
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
              }
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── PAYMENTS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Farmer Name</th>
                <th className="py-3.5 px-4">Token Number</th>
                <th className="py-3.5 px-4">Crop</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No payment records found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => {
                  const isCompleted = payment.status === 'Completed';
                  return (
                    <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">{payment.farmerName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{payment.farmerPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                        {payment.tokenNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {payment.crop}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">
                        ₹ {payment.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                            (isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200')
                          }
                        >
                          <span
                            className={
                              'w-1.5 h-1.5 rounded-full ' +
                              (isCompleted ? 'bg-emerald-600' : 'bg-amber-500')
                            }
                          />
                          <span>{payment.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {payment.date}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment(payment)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                            <span>View Details</span>
                          </button>

                          {!isCompleted && (
                            <button
                              type="button"
                              onClick={() => handleMarkPaid(payment)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
                              <span>Mark Paid</span>
                            </button>
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

      {/* ── PAYMENT DETAILS MODAL ── */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="font-bold text-base">Payment Audit Voucher</h3>
                  <p className="text-xs text-emerald-200 font-mono">
                    Token: {selectedPayment.tokenNumber} · ID: {selectedPayment.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Voucher Status & Amount Box */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                    Total MSP Disbursement
                  </p>
                  <p className="text-2xl font-extrabold text-emerald-950 font-mono mt-0.5">
                    ₹ {selectedPayment.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <span
                  className={
                    'px-3 py-1 rounded-full text-xs font-bold border ' +
                    (selectedPayment.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300')
                  }
                >
                  {selectedPayment.status}
                </span>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Farmer Name</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedPayment.farmerName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedPayment.farmerPhone}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Procured Crop</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedPayment.crop}</p>
                  <p className="text-[10px] text-slate-400">{selectedPayment.quantityQuintals || 42.5} Quintals</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Bank & Account</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedPayment.bankName || 'State Bank of India'}</p>
                  <p className="text-[10px] text-slate-500 font-mono">A/C: {selectedPayment.accountNumber}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">IFSC Code & Date</p>
                  <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">{selectedPayment.ifsc || 'SBIN0001234'}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedPayment.date}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500">Procurement Mandi Centre</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedPayment.centreName}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>

              {selectedPayment.status !== 'Completed' && (
                <button
                  type="button"
                  onClick={() => handleMarkPaid(selectedPayment)}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Mark Paid</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
