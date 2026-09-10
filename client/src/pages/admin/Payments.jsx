import React, { useState, useEffect, useMemo } from 'react';
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
  Download,
  Filter,
  CheckSquare,
  Square,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Send,
  Zap,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminPayments = () => {
  const [payments, setPayments] = useState(() => adminStorage.getPayments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All'); // 'All' | 'Pending' | 'In Clearing' | 'Completed' | 'Discrepancy'
  const [centreFilter, setCentreFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notice, setNotice] = useState(null);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setPayments(adminStorage.getPayments());
  }, []);

  const stats = useMemo(() => adminStorage.getPaymentStats(), [payments]);
  const centres = useMemo(() => adminStorage.getCentres(), []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Filtered Payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.farmerName.toLowerCase().includes(q) ||
        p.tokenNumber.toLowerCase().includes(q) ||
        p.crop.toLowerCase().includes(q) ||
        (p.farmerPhone && p.farmerPhone.includes(q)) ||
        (p.centreName && p.centreName.toLowerCase().includes(q));

      const matchesStatus =
        statusTab === 'All' || p.status === statusTab;

      const matchesCentre =
        centreFilter === 'All' || p.centreName === centreFilter;

      return matchesSearch && matchesStatus && matchesCentre;
    });
  }, [payments, searchQuery, statusTab, centreFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  // Adjust page if out of bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Selection helpers
  const pendingInView = useMemo(() => {
    return paginatedPayments.filter((p) => p.status === 'Pending');
  }, [paginatedPayments]);

  const allPendingInFiltered = useMemo(() => {
    return filteredPayments.filter((p) => p.status === 'Pending');
  }, [filteredPayments]);

  const areAllInViewSelected =
    pendingInView.length > 0 &&
    pendingInView.every((p) => selectedIds.has(p.id));

  const toggleSelectAllInView = () => {
    const next = new Set(selectedIds);
    if (areAllInViewSelected) {
      pendingInView.forEach((p) => next.delete(p.id));
    } else {
      pendingInView.forEach((p) => next.add(p.id));
    }
    setSelectedIds(next);
  };

  const toggleSelectOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const selectAllPendingGlobally = () => {
    const next = new Set(selectedIds);
    allPendingInFiltered.forEach((p) => next.add(p.id));
    setSelectedIds(next);
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // Single payment approval
  const handleApproveSingle = (payment) => {
    const updated = adminStorage.markPaymentPaid(payment.id);
    setPayments(adminStorage.getPayments());
    if (selectedPayment && selectedPayment.id === payment.id) {
      setSelectedPayment(updated);
    }
    showToast(`Payment of ₹ ${payment.amount.toLocaleString('en-IN')} to ${payment.farmerName} approved (UTR: ${updated.utrNumber}).`);
  };

  // Bulk DBT batch approval
  const handleBulkApprove = () => {
    if (selectedIds.size === 0) return;
    setIsProcessingBatch(true);

    setTimeout(() => {
      const idsArray = Array.from(selectedIds);
      adminStorage.bulkApprovePayments(idsArray);
      setPayments(adminStorage.getPayments());
      setIsProcessingBatch(false);
      const approvedCount = idsArray.length;
      setSelectedIds(new Set());
      showToast(`⚡ Successfully approved & dispatched DBT batch for ${approvedCount} farmers via PFMS National Gateway.`);
    }, 600);
  };

  // Retry discrepancy payment
  const handleRetryPayment = (payment) => {
    adminStorage.retryPayment(payment.id);
    setPayments(adminStorage.getPayments());
    showToast(`Account re-verified for ${payment.farmerName}. Moved back to Pending queue for next DBT batch.`);
    if (selectedPayment && selectedPayment.id === payment.id) {
      setSelectedPayment({ ...payment, status: 'Pending', discrepancyReason: '' });
    }
  };

  // Export Bank Payment Scroll
  const handleExportScroll = () => {
    const rows = filteredPayments.map((p) => [
      p.id,
      p.tokenNumber,
      p.farmerName,
      p.farmerPhone,
      p.crop,
      p.quantityQuintals,
      p.amount,
      p.status,
      p.accountNumber,
      p.ifsc,
      p.bankName,
      p.utrNumber || 'N/A',
      p.centreName,
      p.date,
    ]);

    const header = [
      'Transaction ID',
      'Token Number',
      'Farmer Name',
      'Mobile',
      'Crop',
      'Qty (Qtl)',
      'Total Amount (INR)',
      'Status',
      'Account Number',
      'IFSC Code',
      'Bank Name',
      'UTR Reference',
      'Mandi Centre',
      'Procurement Date',
    ];

    const csvContent = [
      header.join(','),
      ...rows.map((r) => r.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PFMS_DBT_Payment_Scroll_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Bank Payment Scroll CSV exported successfully for banking transmission.');
  };

  // Selected totals for bulk bar
  const selectedPaymentsList = useMemo(() => {
    return payments.filter((p) => selectedIds.has(p.id));
  }, [payments, selectedIds]);

  const selectedTotalAmount = useMemo(() => {
    return selectedPaymentsList.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [selectedPaymentsList]);

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Landmark className="w-3.5 h-3.5 text-emerald-700" />
              Public Financial Management System (PFMS)
            </span>
            <span className="text-xs text-slate-400 font-mono">DBT Clearing Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            DBT Payment Management & Bulk Clearing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            High-volume Direct Benefit Transfer processing, bank scroll generation, and statutory 48-hour compliance
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportScroll}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
            title="Download CSV bank mandate scroll for electronic clearing"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Bank Scroll</span>
          </button>
        </div>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── 4 SUMMARY CARDS (EXACTLY AS SPECIFIED) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-slate-500">Total MSP Payments</p>
            <Landmark className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            ₹ {stats.totalAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{stats.totalCount} Total Transactions</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-amber-700">Pending Approval</p>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-800 font-mono">
            ₹ {stats.pendingAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-amber-600 mt-1">
            {stats.pendingCount} Farmers Awaiting Batch Run
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-emerald-700">Completed Disbursements</p>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono">
            ₹ {stats.completedAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">
            {stats.completedCount} Credited to Farmer A/C
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-rose-700">Discrepancy / Issues</p>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-800 font-mono">
            {stats.discrepancyCount}
          </p>
          <p className="text-[11px] text-rose-500 mt-1">Aadhaar-Bank Mapping Mismatches</p>
        </div>
      </div>

      {/* ── BATCH ACTION BANNER (FOR HANDLING MASSIVE VOLUMES OF FARMERS) ── */}
      {selectedIds.size > 0 && (
        <div className="p-4 rounded-xl bg-emerald-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center font-bold text-sm text-emerald-200 shrink-0">
              {selectedIds.size}
            </div>
            <div>
              <p className="font-bold text-sm">
                {selectedIds.size} Farmers Selected for Bulk DBT Disbursement
              </p>
              <p className="text-xs text-emerald-200 font-mono">
                Total Batch Value: ₹ {selectedTotalAmount.toLocaleString('en-IN')} · Direct Bank Transfer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              type="button"
              onClick={clearSelection}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              Clear Selection
            </button>
            <button
              type="button"
              disabled={isProcessingBatch}
              onClick={handleBulkApprove}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>
                {isProcessingBatch ? 'Disbursing Batch...' : 'Approve & Disburse Batch Now'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ── STATUS TABS, SEARCH & CENTRE FILTERS ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-slate-100">
          {[
            { id: 'All', label: 'All Payments', count: stats.totalCount },
            { id: 'Pending', label: 'Pending Clearance', count: stats.pendingCount },
            { id: 'In Clearing', label: 'In Bank Clearing', count: stats.inClearingCount },
            { id: 'Completed', label: 'Completed (Disbursed)', count: stats.completedCount },
            { id: 'Discrepancy', label: 'Discrepancies', count: stats.discrepancyCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setStatusTab(tab.id);
                setCurrentPage(1);
              }}
              className={
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ' +
                (statusTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
              }
            >
              <span>{tab.label}</span>
              <span
                className={
                  'text-[10px] px-1.5 py-0.2 rounded-full font-mono ' +
                  (statusTab === tab.id
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-200 text-slate-700')
                }
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Centre Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by farmer name, token, phone, or crop..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Mandi:</span>
              <select
                value={centreFilter}
                onChange={(e) => {
                  setCentreFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-600 max-w-[200px]"
              >
                <option value="All">All Procurement Depots</option>
                {centres.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select All Pending Quick Action */}
            {allPendingInFiltered.length > 0 && (
              <button
                type="button"
                onClick={selectAllPendingGlobally}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                Select All {allPendingInFiltered.length} Pending
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PAYMENTS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-3 text-center w-10">
                  <button
                    type="button"
                    onClick={toggleSelectAllInView}
                    className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                    title="Select/Deselect all pending on this page"
                  >
                    {areAllInViewSelected ? (
                      <CheckSquare className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-3">Farmer Details</th>
                <th className="py-3.5 px-3">Token & Mandi</th>
                <th className="py-3.5 px-3">Crop & Quantity</th>
                <th className="py-3.5 px-3">Amount (INR)</th>
                <th className="py-3.5 px-3">Payment Status</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No payment records found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment) => {
                  const isPending = payment.status === 'Pending';
                  const isCompleted = payment.status === 'Completed';
                  const isInClearing = payment.status === 'In Clearing';
                  const isDiscrepancy = payment.status === 'Discrepancy';
                  const isSelected = selectedIds.has(payment.id);

                  return (
                    <tr
                      key={payment.id}
                      className={
                        'hover:bg-slate-50/80 transition-colors ' +
                        (isSelected ? 'bg-emerald-50/50' : '')
                      }
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 text-center">
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() => toggleSelectOne(payment.id)}
                            className="p-1 cursor-pointer text-slate-500 hover:text-slate-900"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        ) : (
                          <span className="text-slate-300 text-[10px]">—</span>
                        )}
                      </td>

                      {/* Farmer Details */}
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                            {payment.farmerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">
                              {payment.farmerName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {payment.farmerPhone} · Aadhaar: {payment.aadhaarMasked || '•••• 4128'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Token & Centre */}
                      <td className="py-3 px-3">
                        <p className="font-mono font-bold text-slate-800 leading-tight">
                          {payment.tokenNumber}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          {payment.centreName}
                        </p>
                      </td>

                      {/* Crop */}
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-900 leading-tight">{payment.crop}</p>
                        <p className="text-[10px] text-slate-500">
                          {payment.quantityQuintals} Qtl @ ₹ {payment.mspPerQuintal || 2275}/Qtl
                        </p>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-3 font-mono font-extrabold text-slate-900 text-sm">
                        ₹ {payment.amount.toLocaleString('en-IN')}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span
                          className={
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                            (isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isInClearing
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : isDiscrepancy
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200')
                          }
                        >
                          <span
                            className={
                              'w-1.5 h-1.5 rounded-full ' +
                              (isCompleted
                                ? 'bg-emerald-600'
                                : isInClearing
                                ? 'bg-blue-600 animate-pulse'
                                : isDiscrepancy
                                ? 'bg-rose-600'
                                : 'bg-amber-500')
                            }
                          />
                          <span>{payment.status}</span>
                        </span>
                        {payment.utrNumber && (
                          <p className="text-[9px] font-mono text-slate-400 mt-0.5 truncate max-w-[130px]">
                            UTR: {payment.utrNumber}
                          </p>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                        {payment.date}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment(payment)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
                            <span>View</span>
                          </button>

                          {isPending && (
                            <button
                              type="button"
                              onClick={() => handleApproveSingle(payment)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
                              <span>Approve</span>
                            </button>
                          )}

                          {isDiscrepancy && (
                            <button
                              type="button"
                              onClick={() => handleRetryPayment(payment)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="Re-verify Aadhaar/Bank and re-queue"
                            >
                              <RotateCcw className="w-3 h-3 text-rose-600" />
                              <span>Re-verify</span>
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

        {/* ── PAGINATION CONTROLS ── */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing <strong className="text-slate-900">{filteredPayments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-slate-900">
              {Math.min(currentPage * itemsPerPage, filteredPayments.length)}
            </strong>{' '}
            of <strong className="text-slate-900">{filteredPayments.length}</strong> Farmers
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="font-mono font-bold text-slate-800 px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1 font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── PAYMENT DETAILS AUDIT MODAL ── */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2.5">
                <Landmark className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="font-bold text-base">PFMS Payment Audit Voucher</h3>
                  <p className="text-xs text-emerald-200 font-mono">
                    Token: {selectedPayment.tokenNumber} · Txn ID: {selectedPayment.id}
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
                      : selectedPayment.status === 'Discrepancy'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300')
                  }
                >
                  {selectedPayment.status}
                </span>
              </div>

              {selectedPayment.discrepancyReason && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl">
                  <strong>Discrepancy Flag: </strong>
                  {selectedPayment.discrepancyReason}
                </div>
              )}

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Farmer Information</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedPayment.farmerName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedPayment.farmerPhone}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Aadhaar: {selectedPayment.aadhaarMasked || '•••• •••• 4128'}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Procured Crop & Quantity</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedPayment.crop}</p>
                  <p className="text-[10px] text-slate-600 font-mono">
                    {selectedPayment.quantityQuintals} Quintals
                  </p>
                  <p className="text-[10px] text-slate-400">
                    MSP Rate: ₹ {selectedPayment.mspPerQuintal || 2275} / Qtl
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Bank & Account</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedPayment.bankName || 'State Bank of India'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">A/C: {selectedPayment.accountNumber}</p>
                  <p className="text-[10px] text-slate-400 font-mono">IFSC: {selectedPayment.ifsc}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-500">Audit & Mandate</p>
                  <p className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                    {selectedPayment.utrNumber || 'PENDING CLEARING'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Procured: {selectedPayment.date}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">
                    Deadline: {selectedPayment.statutoryDeadline || 'Within 48 hrs'}
                  </p>
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

              {selectedPayment.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => handleApproveSingle(selectedPayment)}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Generate UTR</span>
                </button>
              )}

              {selectedPayment.status === 'Discrepancy' && (
                <button
                  type="button"
                  onClick={() => handleRetryPayment(selectedPayment)}
                  className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-verify & Move to Pending</span>
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
