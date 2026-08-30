import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';

export const Users = () => {
  const usersList = [
    { userId: 'USR-801', name: 'Dr. Sunita Verma', role: 'State Admin', department: 'Food & Civil Supplies', status: 'Active' },
    { userId: 'USR-802', name: 'Anil Kumar', role: 'Centre Manager', department: 'Ludhiana Mandi', status: 'Active' },
    { userId: 'USR-803', name: 'Inspector Vikram Sharma', role: 'Procurement Officer', department: 'Ludhiana Mandi', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="User Roles & Access Management" subtitle="Audit portal permissions and assign role privileges for developers & officers" />
      <DataTable
        headers={['User ID', 'Name', 'Role', 'Department', 'Status']}
        data={usersList}
      />
    </div>
  );
};

export default Users;
