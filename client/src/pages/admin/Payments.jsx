import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import paymentsData from '../../data/payments.json';

export const AdminPayments = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="National DBT Payment Audit & Release" subtitle="Monitor direct benefit transfer payments, NPCI clearing status, and bank batch releases" />
      <DataTable
        headers={['Payment ID', 'Farmer Name', 'Quantity', 'MSP Rate', 'Total Amount', 'Bank Ref No.', 'Status']}
        data={paymentsData}
      />
    </div>
  );
};

export default AdminPayments;
