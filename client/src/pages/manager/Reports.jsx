import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import reportsData from '../../data/reports.json';

export const ManagerReports = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Procurement & Tonnage Reports" subtitle="Daily and weekly summary reports of grain intake and DBT disbursements" />
      <DataTable
        headers={['Report ID', 'Title', 'Date Generated', 'Procured Tons', 'Farmers Served', 'DBT Disbursed']}
        data={reportsData}
      />
    </div>
  );
};

export default ManagerReports;
