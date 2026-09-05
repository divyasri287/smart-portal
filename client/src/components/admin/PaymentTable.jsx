import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Clock, XCircle, RefreshCw } from 'lucide-react';

export const PaymentTable = ({ payments, onTriggerBatchRelease }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Completed', 'Pending', 'Failed'];

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.bankRefNo && p.bankRefNo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search farmer or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#15803D] text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-52 px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#111827] bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All Payment Statuses' : `Status: ${st}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onTriggerBatchRelease}
          className="w-full md:w-auto bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-lg px-4 py-2.5 transition-all text-sm shadow-xs flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Sync Pending Payments
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Payment ID</th>
              <th className="py-3 px-4">Farmer Name</th>
              <th className="py-3 px-4">Quantity (Qtl)</th>
              <th className="py-3 px-4">MSP Rate</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Bank & Ref No.</th>
              <th className="py-3 px-4">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p) => (
                <tr key={p.paymentId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#166534]">{p.paymentId}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#111827]">
                    {p.farmerName}
                    <span className="block text-xs font-normal text-slate-500">
                      Aadhaar: ••••{p.aadhaarLast4 || '0000'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{p.quantityQuintals} Qtl</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">₹ {p.mspPerQuintal}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#15803D]">
                    ₹ {p.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                    <span className="font-semibold text-slate-800 block">{p.bankName}</span>
                    {p.bankRefNo}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === 'Completed'
                          ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                          : p.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : p.status === 'Failed'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {p.status === 'Completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : p.status === 'Pending' ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                  No payment record matches your current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
