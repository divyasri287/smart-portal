import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import queueData from '../../data/queue.json';

export const OfficerHistory = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Officer Inspection History" subtitle="Archive of verified vehicles, moisture checks, and weighments" />
      <DataTable
        headers={['Token No', 'Farmer Name', 'Vehicle No', 'Commodity', 'Entry Time', 'Status']}
        data={queueData}
      />
    </div>
  );
};

export default OfficerHistory;
