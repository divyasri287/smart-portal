import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import Timeline from '../../components/timeline/Timeline';

export const ProcurementStatus = () => {
  const steps = [
    { title: 'Booking Confirmed', description: 'Farmers slot booked successfully for Salem procurement centre', completed: true, timestamp: '2026-09-02 08:30 AM' },
    { title: 'Token Generated', description: 'Gate token TKN-A901 generated and sent to the farmer', completed: true, timestamp: '2026-09-02 08:45 AM' },
    { title: 'Status Updated at Gate', description: 'Vehicle entry recorded and queue status updated', completed: true, timestamp: '2026-09-02 09:10 AM' },
    { title: 'Payment Receiving', description: 'DBT process underway and payment is being credited', completed: true, timestamp: '2026-09-02 12:30 PM' },
    { title: 'Payment Completed', description: 'MSP payment received in the linked bank account', completed: true, timestamp: '2026-09-02 01:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Real-Time Procurement Status" subtitle="Booking, token, live status and payment flow are updated in sequence" />

      <Card title="Batch Process Tracker (#TKN-A901)" subtitle="Status: Payment Received | Salem Main Procurement Centre">
        <Timeline steps={steps} />
      </Card>
    </div>
  );
};

export default ProcurementStatus;
