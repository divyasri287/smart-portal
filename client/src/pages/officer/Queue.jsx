import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import queueData from '../../data/queue.json';

export const Queue = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Mandi Vehicle Queue" subtitle="Real-time list of trucks and tractors arriving at procurement bays" />
      <DataTable
        headers={['Token No', 'Farmer Name', 'Vehicle No', 'Commodity', 'Entry Time', 'Assigned Bay', 'Status']}
        data={queueData}
      />
    </div>
  );
};

export default Queue;
