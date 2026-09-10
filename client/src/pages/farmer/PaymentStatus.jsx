import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import Card from '../../components/cards/Card';
import paymentsData from '../../data/payments.json';
import { formatCurrency } from '../../utils/formatters';

export const PaymentStatus = () => {
  const headers = ['Payment ID', 'Disbursement Date', 'Quantity (Quintals)', 'MSP Rate', 'Total Amount', 'Bank Reference No.', 'Status'];
  const farmerPayments = paymentsData.filter((payment) => payment.farmerName === 'M. Karthik');

  return (
    <div className="space-y-6">
      <PageHeader title="Direct Benefit Transfer (DBT) Status" subtitle="Payment is received after booking confirmation, gate token generation, and procurement completion" />

      <Card title="Aadhaar Seeded Bank Account Info">
        <div className="text-xs text-slate-700 space-y-1">
          <p><span className="font-semibold">Bank Name:</span> State Bank of India (Salem Branch)</p>
          <p><span className="font-semibold">Account No.:</span> SBIN0001234 - xxxx5678</p>
          <p><span className="font-semibold">Aadhaar Verification:</span> <span className="text-emerald-700 font-bold">✓ NPCI Active</span></p>
        </div>
      </Card>

      <DataTable
        headers={headers}
        data={farmerPayments}
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            <td className="p-3.5 font-mono text-xs font-semibold text-slate-900">{item.paymentId}</td>
            <td className="p-3.5 text-xs text-slate-600">{item.disbursementDate}</td>
            <td className="p-3.5 text-xs text-slate-800">{item.quantityQuintals} Qtl</td>
            <td className="p-3.5 text-xs text-slate-800">₹ {item.mspPerQuintal} / Qtl</td>
            <td className="p-3.5 text-xs font-bold text-emerald-800">{formatCurrency(item.totalAmount)}</td>
            <td className="p-3.5 font-mono text-xs text-slate-600">{item.bankRefNo}</td>
            <td className="p-3.5 text-xs font-semibold text-emerald-700">{item.status}</td>
          </tr>
        )}
      />
    </div>
  );
};

export default PaymentStatus;
