import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import QRCard from '../../components/qr/QRCard';

export const Token = () => {
  const booking = JSON.parse(sessionStorage.getItem('farmer-current-booking') || '{}');
  const tokenNo = booking.tokenId || 'TKN-A901';
  const farmerName = booking.farmerName || 'M. Karthik';
  const date = booking.slotDate || '2026-09-02';
  const centre = booking.centreName || 'Salem Main Procurement Centre';

  return (
    <div className="space-y-6">
      <PageHeader title="Gate Token" subtitle="Token generated successfully and ready for gate entry scanning" />
      <QRCard tokenNo={tokenNo} farmerName={farmerName} date={date} centre={centre} />
    </div>
  );
};

export default Token;
