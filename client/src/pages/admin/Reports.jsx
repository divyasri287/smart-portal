import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import reportsData from '../../data/reports.json';

export const AdminReports = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="National Audit & Policy Reports" subtitle="Export comprehensive procurement and DBT settlement reports" />
      <DataTable
        headers={['Report ID', 'Title', 'Date Generated', 'Procured Tons', 'Active Mandis', 'Farmers Served', 'DBT Disbursed']}
        data={reportsData}
      />
    </div>
  );
};

export default AdminReports;
