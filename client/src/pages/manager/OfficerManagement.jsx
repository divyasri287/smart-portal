import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import officersData from '../../data/officers.json';

export const OfficerManagement = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Officer Roster & Bay Assignments" subtitle="Manage procurement inspectors, shift rosters, and weighbridge duties" />
      <DataTable
        headers={['Officer ID', 'Inspector Name', 'Badge No', 'Assigned Centre', 'Shift', 'Status']}
        data={officersData}
      />
    </div>
  );
};

export default OfficerManagement;
