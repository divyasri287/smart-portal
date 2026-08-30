import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import DataTable from '../../components/tables/DataTable';
import queueData from '../../data/queue.json';

export const QueueMonitoring = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Real-Time Queue Monitoring" subtitle="Live tracking of gate traffic, bay bottlenecks, and weighbridge turnaround times" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Gate 1 Queue">
          <p className="text-2xl font-bold text-emerald-800">4 Vehicles</p>
          <p className="text-xs text-slate-500">Flow Rate: 12 vehicles / hr</p>
        </Card>
        <Card title="Gate 2 Queue">
          <p className="text-2xl font-bold text-amber-700">8 Vehicles</p>
          <p className="text-xs text-slate-500">Flow Rate: 8 vehicles / hr</p>
        </Card>
        <Card title="Weighbridge Bay 3">
          <p className="text-2xl font-bold text-blue-700">Active</p>
          <p className="text-xs text-slate-500">Avg weighment: 3.5 mins</p>
        </Card>
      </div>

      <Card title="Mandi Live Queue Dataset">
        <DataTable
          headers={['Token No', 'Farmer Name', 'Vehicle No', 'Commodity', 'Entry Time', 'Bay Assigned', 'Status']}
          data={queueData}
        />
      </Card>
    </div>
  );
};

export default QueueMonitoring;
