import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';

export const CentreMonitoring = () => {
  const centresData = [
    { centreCode: 'MND-PB-004', centreName: 'Ludhiana Mandi Centre 4', district: 'Ludhiana', manager: 'Anil Kumar', status: 'Operational' },
    { centreCode: 'MND-PB-012', centreName: 'Patiala Grain Mandi', district: 'Patiala', manager: 'Sandeep Singh', status: 'Operational' },
    { centreCode: 'MND-HR-003', centreName: 'Ambala APMC Mandi', district: 'Ambala', manager: 'Rajesh Gupta', status: 'Operational' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Procurement Centre Master List" subtitle="Master directory of all 4,250 registered grain procurement centres" />
      <DataTable
        headers={['Centre Code', 'Centre Name', 'District', 'Centre Manager', 'Status']}
        data={centresData}
      />
    </div>
  );
};

export default CentreMonitoring;
