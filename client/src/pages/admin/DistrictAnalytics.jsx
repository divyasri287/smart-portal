import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';

export const DistrictAnalytics = () => {
  const districtData = [
    { district: 'Ludhiana', state: 'Punjab', activeCentres: 14, totalProcured: '4,52,000 Qtl', dbtTotal: '₹ 103.9 Cr' },
    { district: 'Patiala', state: 'Punjab', activeCentres: 11, totalProcured: '3,80,000 Qtl', dbtTotal: '₹ 87.4 Cr' },
    { district: 'Karnal', state: 'Haryana', activeCentres: 9, totalProcured: '3,10,000 Qtl', dbtTotal: '₹ 71.3 Cr' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="District Level Procurement Data" subtitle="Granular monitoring of grain flow per district mandi cluster" />
      <DataTable
        headers={['District', 'State', 'Active Centres', 'Total Procured', 'DBT Total']}
        data={districtData}
      />
    </div>
  );
};

export default DistrictAnalytics;
