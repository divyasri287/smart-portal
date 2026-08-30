import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';

export const StateAnalytics = () => {
  const stateData = [
    { state: 'Punjab', targetTons: '12,50,000', achievedTons: '11,80,000', dbtDisbursed: '₹ 2,714 Cr', status: '94.4% Target Met' },
    { state: 'Haryana', targetTons: '8,00,000', achievedTons: '7,65,000', dbtDisbursed: '₹ 1,759 Cr', status: '95.6% Target Met' },
    { state: 'Madhya Pradesh', targetTons: '15,00,000', achievedTons: '13,90,000', dbtDisbursed: '₹ 3,197 Cr', status: '92.6% Target Met' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="State-Wise MSP Procurement Breakdown" subtitle="Macro performance metrics across state agricultural boards" />
      <DataTable
        headers={['State', 'Target (MT)', 'Achieved (MT)', 'DBT Disbursed', 'Status']}
        data={stateData}
      />
    </div>
  );
};

export default StateAnalytics;
