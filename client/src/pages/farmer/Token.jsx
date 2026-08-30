import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import QRCard from '../../components/qr/QRCard';

export const Token = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Mandi Gate Token" subtitle="Show this token at the entry gate scanner for automatic vehicle queue assignment" />
      <QRCard tokenNo="TKN-A901" farmerName="Ramesh Singh" date="2026-09-02" centre="Ludhiana Mandi Centre 4" />
    </div>
  );
};

export default Token;
