import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import Timeline from '../../components/timeline/Timeline';

export const ProcurementStatus = () => {
  const steps = [
    { title: 'Slot Booked & Gate Token Generated', description: 'Token #TKN-A901 generated for Ludhiana Centre 4', completed: true, timestamp: '2026-08-30 09:00 AM' },
    { title: 'Gate Entry & ANPR Vehicle Logging', description: 'Vehicle PB-10-CZ-4419 scanned at Mandi Gate 2', completed: true, timestamp: '2026-08-30 09:45 AM' },
    { title: 'Moisture & Quality Inspection', description: 'Moisture recorded: 12.4% (Grade A Approved)', completed: true, timestamp: '2026-08-30 10:15 AM' },
    { title: 'Weighbridge Gross & Tare Weighment', description: 'Net Quantity Logged: 140.5 Quintals', current: true },
    { title: 'Digital Receipt & Payment Disbursement', description: 'Awaiting weighment sign-off by Procurement Officer', completed: false },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Real-Time Procurement Status" subtitle="Live tracking of your grain batch inside the procurement centre" />

      <Card title="Batch Process Tracker (#TKN-A901)" subtitle="Token assigned to Bay 3">
        <Timeline steps={steps} />
      </Card>
    </div>
  );
};

export default ProcurementStatus;
