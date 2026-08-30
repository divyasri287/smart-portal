import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';

export const Issues = () => {
  const dummyIssues = [
    { ticketId: 'TCK-9901', farmerName: 'Gurpreet Sharma', category: 'Moisture Dispute', date: '2026-08-30', status: 'Pending Review' },
    { ticketId: 'TCK-9902', farmerName: 'Sukhwinder Kaur', category: 'Bank Account Error', date: '2026-08-29', status: 'Resolved' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Grievances & Moisture Disputes" subtitle="Manage and resolve farmer tickets raised at Mandi Helpdesk" />
      <DataTable
        headers={['Ticket ID', 'Farmer Name', 'Category', 'Date Submitted', 'Status']}
        data={dummyIssues}
      />
    </div>
  );
};

export default Issues;
