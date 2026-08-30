import React, { useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';
import PrimaryButton from '../buttons/PrimaryButton';

export const QRScannerPlaceholder = ({ onScanSuccess }) => {
  const [scanned, setScanned] = useState(false);

  const handleSimulateScan = () => {
    setScanned(true);
    if (onScanSuccess) {
      onScanSuccess({ tokenNo: 'TKN-A901', farmerId: 'FRM-1001', farmerName: 'Ramesh Singh' });
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-lg p-6 text-center max-w-md mx-auto relative overflow-hidden border border-slate-700">
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="relative p-6 border-2 border-dashed border-emerald-500 rounded-lg animate-pulse">
          <Camera className="w-16 h-16 text-emerald-400" />
        </div>
        <p className="text-sm font-medium text-slate-300">Position QR Code within the camera frame</p>
        
        {scanned ? (
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm bg-emerald-950/80 px-4 py-2 rounded-full border border-emerald-700">
            <CheckCircle className="w-4 h-4" /> QR Code Scanned Successfully!
          </div>
        ) : (
          <PrimaryButton onClick={handleSimulateScan} className="mt-2">
            Simulate Camera QR Scan
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default QRScannerPlaceholder;
