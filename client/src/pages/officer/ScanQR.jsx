import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import QRScannerPlaceholder from '../../components/qr/QRScannerPlaceholder';
import { useToast } from '../../hooks/useToast';

export const ScanQR = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleScanned = (scannedData) => {
    showToast(`Token Scanned: ${scannedData.tokenNo}`, 'success');
    navigate('/officer/quality-check');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Scan Farmer Gate Token" subtitle="Use camera or hand scanner to verify token at entry gate" />
      <QRScannerPlaceholder onScanSuccess={handleScanned} />
    </div>
  );
};

export default ScanQR;
