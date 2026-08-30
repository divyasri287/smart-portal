import React from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';

export const QRCard = ({ tokenNo = 'TKN-A901', farmerName = 'Ramesh Singh', date = '2026-09-02', centre = 'Ludhiana Mandi Centre 4' }) => {
  return (
    <div className="bg-white border-2 border-emerald-700 rounded-lg p-6 max-w-sm mx-auto shadow-md text-center">
      <div className="bg-emerald-800 text-white text-xs font-bold py-1 px-3 rounded-full inline-block uppercase tracking-wider mb-3">
        Mandi Gate Entry Token
      </div>
      <h3 className="font-bold text-slate-900 text-xl font-mono">{tokenNo}</h3>
      <p className="text-xs text-slate-500 mt-1">{farmerName}</p>

      {/* Mock QR SVG */}
      <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-md inline-block">
        <QrCode className="w-40 h-40 text-slate-800 mx-auto" />
      </div>

      <div className="text-xs text-slate-600 space-y-1 text-left bg-slate-50 p-3 rounded-md border border-slate-200 mb-4">
        <div><span className="font-semibold">Slot Date:</span> {date}</div>
        <div><span className="font-semibold">Procurement Centre:</span> {centre}</div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-700 text-white font-medium text-xs py-2 rounded-md hover:bg-emerald-800">
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button className="inline-flex items-center justify-center p-2 border border-slate-300 rounded-md hover:bg-slate-50">
          <Share2 className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default QRCard;
