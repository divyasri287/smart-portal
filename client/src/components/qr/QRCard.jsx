import React from 'react';
import { Download, Share2 } from 'lucide-react';

export const QRCard = ({ tokenNo = 'TKN-A901', farmerName = 'Ramesh Singh', date = '2026-09-02', centre = 'Ludhiana Mandi Centre 4' }) => {
  const payload = JSON.stringify({
    tokenNo,
    farmerName,
    date,
    centre,
    type: 'Farmer Gate Token',
  });

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(payload)}&margin=10`;

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');

    if (!printWindow) {
      alert('Please allow pop-ups to download the token as PDF.');
      return;
    }

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Farmer Token - ${tokenNo}</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
            .card { max-width: 420px; margin: 0 auto; background: white; border: 2px solid #166534; border-radius: 12px; padding: 24px; text-align: center; }
            .badge { display: inline-block; background: #166534; color: white; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 12px; border-radius: 999px; text-transform: uppercase; }
            .token { font-size: 28px; font-weight: 700; margin-top: 16px; letter-spacing: 1px; }
            .name { font-size: 13px; color: #475569; margin-top: 6px; }
            .qr-box { margin: 22px auto; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 10px; overflow: hidden; }
            .qr-box img { width: 100%; height: 100%; object-fit: cover; }
            .info { font-size: 12px; text-align: left; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; line-height: 1.8; }
            .label { font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Mandi Gate Entry Token</div>
            <div class="token">${tokenNo}</div>
            <div class="name">${farmerName}</div>
            <div class="qr-box"><img src="${qrImageUrl}" alt="QR Gate Token" /></div>
            <div class="info">
              <div><span class="label">Slot Date:</span> ${date}</div>
              <div><span class="label">Procurement Centre:</span> ${centre}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="bg-white border-2 border-emerald-700 rounded-lg p-6 max-w-sm mx-auto shadow-md text-center">
      <div className="bg-emerald-800 text-white text-xs font-bold py-1 px-3 rounded-full inline-block uppercase tracking-wider mb-3">
        Mandi Gate Entry Token
      </div>
      <h3 className="font-bold text-slate-900 text-xl font-mono">{tokenNo}</h3>
      <p className="text-xs text-slate-500 mt-1">{farmerName}</p>

      <div className="my-5 p-3 bg-slate-50 border border-slate-200 rounded-md inline-block shadow-inner">
        <img src={qrImageUrl} alt="Gate token QR code" className="w-40 h-40 object-cover rounded-sm border border-slate-200 bg-white" />
      </div>

      <div className="text-xs text-slate-600 space-y-1 text-left bg-slate-50 p-3 rounded-md border border-slate-200 mb-4">
        <div><span className="font-semibold">Slot Date:</span> {date}</div>
        <div><span className="font-semibold">Procurement Centre:</span> {centre}</div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-700 text-white font-medium text-xs py-2 rounded-md hover:bg-emerald-800"
        >
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button type="button" className="inline-flex items-center justify-center p-2 border border-slate-300 rounded-md hover:bg-slate-50">
          <Share2 className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default QRCard;
