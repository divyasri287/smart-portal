import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import QRScannerPlaceholder from '../../components/qr/QRScannerPlaceholder';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import { useToast } from '../../hooks/useToast';
import { QrCode, Hash, ArrowRight, Info, AlertCircle } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

export const ScanQR = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [manualToken, setManualToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedInfo, setScannedInfo] = useState(null);

  const handleScanned = (scannedData) => {
    setScanned(true);
    setScannedInfo(scannedData);
    setErrorMessage('');
    
    // Save to active session in localStorage
    const queue = officerStorage.getQueue();
    const match = queue.find(q => q.tokenNo === scannedData.tokenNo || q.id === scannedData.farmerId);
    
    officerStorage.setActiveSession({
      tokenNo: scannedData.tokenNo || 'TKN-A901',
      farmerId: scannedData.farmerId || 'FRM-1001',
      farmerName: scannedData.farmerName || 'Ramesh Singh',
      vehicleNo: match?.vehicleNo || 'PB-10-CZ-4419',
      commodity: match?.commodity || 'Paddy Grade A',
      bayAssigned: match?.bayAssigned || 'Bay 3',
      district: match?.district || 'Ludhiana, Punjab',
    });

    showToast(`✅ Token Scanned: ${scannedData.tokenNo} — ${scannedData.farmerName}`, 'success');
  };

  const proceedToDetails = () => {
    const id = scannedInfo?.farmerId || 'FRM-1001';
    navigate(`/officer/farmer-details/${id}`);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const rawInput = manualToken.trim();

    // 1. Validate non-empty
    if (!rawInput) {
      setErrorMessage('Please enter a Gate Token Number or Farmer ID.');
      return;
    }

    // 2. Validate token format (letters, digits, hyphen only; no symbols like @@@, ###, !!!)
    const validFormatRegex = /^[A-Za-z0-9-]+$/;
    if (!validFormatRegex.test(rawInput)) {
      setErrorMessage('Invalid token number. Please enter a valid Gate Token Number / Farmer ID.');
      return;
    }

    const tokenUpper = rawInput.toUpperCase();
    const queue = officerStorage.getQueue();
    const farmers = officerStorage.getFarmers();

    // 3. Look up token in existing queue or farmers database in localStorage
    const matchedQueue = queue.find(
      q => (q.tokenNo && q.tokenNo.toUpperCase() === tokenUpper) ||
           (q.id && q.id.toUpperCase() === tokenUpper)
    );

    const matchedFarmer = farmers.find(
      f => (f.id && f.id.toUpperCase() === tokenUpper) ||
           (matchedQueue && f.id === matchedQueue.id) ||
           (f.tokenNo && f.tokenNo.toUpperCase() === tokenUpper)
    );

    // 4. If neither queue nor farmer record matches, reject with error and do NOT navigate
    if (!matchedQueue && !matchedFarmer) {
      setErrorMessage('Invalid token number. Please enter a valid Gate Token Number / Farmer ID.');
      return;
    }

    // 5. Valid token found — clear errors and proceed
    setErrorMessage('');

    const resolvedFarmer = matchedFarmer || {
      id: matchedQueue?.id || tokenUpper,
      name: matchedQueue?.farmerName || 'Registered Farmer',
      cropType: matchedQueue?.commodity || 'Paddy Grade A',
      district: matchedQueue?.district || 'Ludhiana',
      state: 'Punjab',
      aadhaar: 'XXXX-XXXX-8912',
      bankAccount: 'SBI — xxxx5678',
    };

    officerStorage.setActiveSession({
      tokenNo: matchedQueue?.tokenNo || tokenUpper,
      farmerId: resolvedFarmer.id,
      farmerName: resolvedFarmer.name || matchedQueue?.farmerName,
      vehicleNo: matchedQueue?.vehicleNo || 'PB-10-CZ-4419',
      commodity: resolvedFarmer.cropType || matchedQueue?.commodity || 'Paddy Grade A',
      bayAssigned: matchedQueue?.bayAssigned || 'Bay 3',
      district: resolvedFarmer.district ? `${resolvedFarmer.district}, ${resolvedFarmer.state || 'Punjab'}` : 'Ludhiana, Punjab',
      aadhaar: resolvedFarmer.aadhaar || 'XXXX-XXXX-8912',
      bank: resolvedFarmer.bankAccount || 'SBI — xxxx5678',
    });

    showToast(`✅ Token Found: ${resolvedFarmer.name} (${resolvedFarmer.id})`, 'success');
    navigate(`/officer/farmer-details/${resolvedFarmer.id}`);
  };

  return (
    <div className="space-y-4 select-none cursor-default">
      {/* Dynamic Workflow Progress: Step 1 */}
      <ProcurementWorkflowProgress currentStep={1} />

      <PageHeader
        title="Scan Farmer Gate Token"
        subtitle="Use camera or hand scanner to verify QR token at entry gate"
      />

      {/* Info strip */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-blue-800 text-sm">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
        <p className="text-xs leading-relaxed">
          Each farmer receives a unique QR gate token when they register at the centre. 
          Scan the token or enter the token ID manually to instantly load their details and proceed through the procurement workflow.
        </p>
      </div>

      {/* Main Dual Cards Grid: Camera Scanner & Manual Token Entry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* 1. Camera QR Scanner */}
        <Card title="Camera QR Scanner" subtitle="Point camera at the farmer's QR token">
          <QRScannerPlaceholder onScanSuccess={handleScanned} />

          {scanned && scannedInfo && (
            <div className="mt-3.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                <QrCode className="w-4 h-4" />
                Token Scanned Successfully
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-emerald-100">
                <div><span className="text-slate-400">Token No:</span> <span className="font-mono font-bold text-slate-900">{scannedInfo.tokenNo}</span></div>
                <div><span className="text-slate-400">Farmer ID:</span> <span className="font-mono font-bold text-slate-900">{scannedInfo.farmerId}</span></div>
                <div className="col-span-2"><span className="text-slate-400">Farmer Name:</span> <span className="font-bold text-slate-900">{scannedInfo.farmerName}</span></div>
              </div>
              <PrimaryButton icon={ArrowRight} onClick={proceedToDetails} className="w-full justify-center text-xs py-2">
                Proceed to Farmer Verification
              </PrimaryButton>
            </div>
          )}
        </Card>

        {/* 2. Manual Token Entry (Clean, Compact with Validation) */}
        <Card title="Manual Token Entry" subtitle="Enter token number manually if scanner is unavailable">
          <form onSubmit={handleManualSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Gate Token Number / Farmer ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Hash className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. TKN-A901, TKN-A902 or FRM-1001"
                  value={manualToken}
                  onChange={(e) => {
                    setManualToken(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                    errorMessage ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-600'
                  } rounded-lg text-xs font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 transition-all`}
                />
              </div>

              {/* Inline Error Message */}
              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-lg text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Supported Formats:</p>
              <p>• Gate Token ID: <span className="font-mono font-semibold text-slate-800">TKN-A901</span>, <span className="font-mono font-semibold text-slate-800">TKN-A902</span></p>
              <p>• Farmer Registration ID: <span className="font-mono font-semibold text-slate-800">FRM-1001</span>, <span className="font-mono font-semibold text-slate-800">FRM-1002</span></p>
            </div>

            <PrimaryButton type="submit" icon={ArrowRight} className="w-full justify-center text-xs py-2.5">
              Look Up Farmer & Token
            </PrimaryButton>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
