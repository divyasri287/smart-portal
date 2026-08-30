import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/tables/DataTable';
import bookingsData from '../../data/bookings.json';

export const History = () => {
  const headers = ['Booking Ref', 'Slot Date', 'Centre Name', 'Crop', 'Est Quantity', 'Status'];

  return (
    <div className="space-y-6">
      <PageHeader title="Past Procurement History" subtitle="Archive of your previous season grain deliveries and MSP sales" />
      <DataTable headers={headers} data={bookingsData} />
    </div>
  );
};

export default History;
