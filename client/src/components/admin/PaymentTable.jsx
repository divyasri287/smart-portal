import React from 'react';

const PaymentTable = ({ payments = [], onTriggerBatchRelease }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Farmer</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Batch</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-900">{payment.farmer}</td>
              <td className="px-4 py-3">{payment.amount}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                  {payment.status}
                </span>
              </td>
              <td className="px-4 py-3">{payment.batch}</td>
              <td className="px-4 py-3">
                <button
                  onClick={onTriggerBatchRelease}
                  className="rounded-xl border border-emerald-700 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
