import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import QRScannerPlaceholder from '../../components/qr/QRScannerPlaceholder';
import { useToast } from '../../hooks/useToast';
import { QrCode, Hash, ArrowRight, Info } from 'lucide-react';

export const ScanQR = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [manualToken, setManualToken] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedInfo, setScannedInfo] = useState(null);

  const handleScanned = (scannedData) => {
    setScanned(true);
    setScannedInfo(scannedData);
    showToast(`✅ Token Scanned: ${scannedData.tokenNo} — ${scannedData.farmerName}`, 'success');
  };

  const proceedToDetails = () => {
    const id = scannedInfo?.farmerId || 'FRM-1001';
    navigate(`/officer/farmer-details/${id}`);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    showToast(`✅ Token Entered: ${manualToken}`, 'success');
    navigate('/officer/farmer-details/FRM-1001');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scan Farmer Gate Token"
        subtitle="Use camera or hand scanner to verify QR token at entry gate"
      />

      {/* Info strip */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-blue-800 text-sm">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
        <p className="text-xs leading-relaxed">
          Each farmer receives a unique QR gate token when they register at the centre. 
          Scan the token to instantly load their details and begin the procurement workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner */}
        <Card title="Camera QR Scanner" subtitle="Point camera at the farmer's QR token">
          <QRScannerPlaceholder onScanSuccess={handleScanned} />

          {scanned && scannedInfo && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
                <QrCode className="w-4 h-4" />
                Token Scanned Successfully
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div><span className="text-slate-400">Token No:</span> <span className="font-mono font-bold">{scannedInfo.tokenNo}</span></div>
                <div><span className="text-slate-400">Farmer ID:</span> <span className="font-mono font-bold">{scannedInfo.farmerId}</span></div>
                <div className="col-span-2"><span className="text-slate-400">Farmer Name:</span> <span className="font-bold">{scannedInfo.farmerName}</span></div>
              </div>
              <PrimaryButton icon={ArrowRight} onClick={proceedToDetails} className="w-full justify-center">
                Proceed to Farmer Details
              </PrimaryButton>
            </div>
          )}
        </Card>

        {/* Manual Entry */}
        <Card title="Manual Token Entry" subtitle="Enter token number manually if scanner is unavailable">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Gate Token Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Hash className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. TKN-A901"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors font-mono"
                />
              </div>
            </div>

            <PrimaryButton type="submit" icon={ArrowRight} className="w-full justify-center">
              Look Up Farmer by Token
            </PrimaryButton>
          </form>

          {/* Recently Scanned */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recent Tokens</p>
            <div className="space-y-2">
              {[
                { token: 'TKN-A901', name: 'Ramesh Singh', id: 'FRM-1001', time: '08:45 AM' },
                { token: 'TKN-A902', name: 'Sukhwinder Kaur', id: 'FRM-1002', time: '09:15 AM' },
              ].map((item) => (
                <button
                  key={item.token}
                  onClick={() => navigate(`/officer/farmer-details/${item.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-left group"
                >
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-800">{item.token}</p>
                    <p className="text-[11px] text-slate-500">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{item.time}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
