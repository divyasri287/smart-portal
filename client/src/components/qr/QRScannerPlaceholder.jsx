import React, { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle, ScanLine, Smartphone, XCircle } from 'lucide-react';
import PrimaryButton from '../buttons/PrimaryButton';

export const QRScannerPlaceholder = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported in this browser.');
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraReady(true);
        setCameraError('');
      } catch (error) {
        setCameraError('Camera permission blocked. You can still use the simulated scan mode.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSimulateScan = () => {
    setScanned(true);
    if (onScanSuccess) {
      onScanSuccess({ tokenNo: 'TKN-A901', farmerId: 'FRM-1001', farmerName: 'Ramesh Singh' });
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl p-4 max-w-md mx-auto border border-slate-700 shadow-2xl shadow-slate-900/40">
      <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <div className="relative h-72 w-full bg-black">
          {cameraReady ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30">
              <div className="flex flex-col items-center gap-3 text-slate-300">
                <Camera className="h-12 w-12 text-emerald-400" />
                <p className="text-sm font-medium">Camera Preview</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(52,211,153,0.9)] animate-pulse" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-emerald-400/90 bg-emerald-400/5 shadow-[inset_0_0_30px_rgba(16,185,129,0.18)]" />

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-xl border-l-4 border-t-4 border-emerald-400" />
              <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-xl border-r-4 border-t-4 border-emerald-400" />
              <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-xl border-b-4 border-l-4 border-emerald-400" />
              <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-xl border-b-4 border-r-4 border-emerald-400" />
            </div>
          </div>

          <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent px-3 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-slate-300">
            <span className="inline-flex items-center gap-1">
              <ScanLine className="h-3 w-3 text-emerald-400" /> Scanner
            </span>
            <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
              LIVE
            </span>
          </div>
        </div>

        <div className="space-y-3 px-3 pb-3 pt-4">
          {scanned ? (
            <div className="flex items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
              <CheckCircle className="h-4 w-4" /> QR Code Scanned Successfully!
            </div>
          ) : (
            <>
              <p className="text-center text-xs text-slate-300">Position QR Code within the camera frame</p>
              <PrimaryButton onClick={handleSimulateScan} className="w-full justify-center">
                Simulate Camera QR Scan
              </PrimaryButton>
            </>
          )}

          {cameraError && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>{cameraError}</span>
            </div>
          )}

          {!cameraReady && !cameraError && (
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300">
              <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
              Starting scanner...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScannerPlaceholder;
