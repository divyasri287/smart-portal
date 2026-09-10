import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { Printer, Download, Home, CheckCircle2, Building } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import receiptsData from '../../data/receipts.json';

export const Receipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const receipt = officerStorage.getReceiptById(id) || receiptsData.find((r) => r.receiptId === id) || receiptsData[0];

  const ReceiptRow = ({ label, value, mono = false }) => (
    <div className="flex items-start justify-between py-2 border-b border-dashed border-slate-200 last:border-0 gap-4">
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className={`text-xs font-semibold text-slate-800 text-right ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl mx-auto select-auto">
      {/* Officer Receipt Print Styles */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 10mm 12mm;
          }

          /* Reset all screen-height and overflow constraints */
          html,
          body,
          #root,
          .officer-portal-root,
          main {
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            position: static !important;
            display: block !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Hide header, sidebar, notifications, and all bottom buttons */
          header,
          aside,
          nav,
          .no-print {
            display: none !important;
          }

          /* Full Receipt Card Print Display */
          #receipt-print {
            display: block !important;
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            border: 2px solid #065f46 !important;
            border-radius: 12px !important;
            box-shadow: none !important;
            overflow: visible !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #receipt-print * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Top Header & Navigation (Hidden in Print) */}
      <div className="no-print">
        <PageHeader
          title="Digital Procurement Receipt"
          subtitle="Official MSP grain procurement voucher"
          action={
            <SecondaryButton icon={Home} onClick={() => navigate('/officer/dashboard')}>
              Dashboard
            </SecondaryButton>
          }
        />
      </div>

      {/* Procurement Workflow Step 6 - Receipt (Hidden in Print) */}
      <div className="no-print">
        <ProcurementWorkflowProgress currentStep={6} />
      </div>

      {/* Success Banner (Hidden in Print) */}
      <div className="no-print flex items-center gap-3 bg-green-800 text-white rounded-xl px-5 py-4 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm">Procurement Successfully Recorded!</p>
          <p className="text-xs text-green-200 mt-0.5">Payment will be credited via DBT within 48 working hours</p>
        </div>
      </div>

      {/* Receipt Card (Printed Output) */}
      <div id="receipt-print" className="bg-white border-2 border-green-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Receipt Header */}
        <div className="bg-green-800 text-white px-6 py-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building className="w-5 h-5 text-green-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-green-200">
              Government of India · Food Corporation Voucher
            </span>
          </div>
          <h2 className="text-2xl font-bold font-mono tracking-wide">{id || 'RCP-2026-901'}</h2>
          <p className="text-sm text-green-300 mt-1">MSP Grain Procurement Receipt — Season Kharif 2026</p>
        </div>

        {/* Centre & Date strip */}
        <div className="bg-green-50 border-b border-green-200 px-6 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-xs text-green-800 font-semibold">{receipt.centre}</span>
          <span className="text-xs text-green-600 font-mono">{receipt.date}</span>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Farmer Details */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Farmer Details</p>
            <div className="space-y-0">
              <ReceiptRow label="Farmer Name" value={receipt.farmerName} />
              <ReceiptRow label="Farmer ID" value={receipt.farmerId} mono />
              <ReceiptRow label="Aadhaar (Masked)" value={receipt.aadhaarMasked} mono />
              <ReceiptRow label="Mobile" value={receipt.mobile} />
              <ReceiptRow label="District" value={`${receipt.district}, ${receipt.state}`} />
              <ReceiptRow label="Bank Account" value={receipt.bankAccount} mono />
            </div>
          </div>

          {/* Commodity & Quality */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Commodity & Quality</p>
            <div className="space-y-0">
              <ReceiptRow label="Commodity" value={receipt.commodity} />
              <ReceiptRow label="Vehicle No." value={receipt.vehicleNo} mono />
              <ReceiptRow label="Quality Grade" value={receipt.gradeResult} />
              <ReceiptRow label="Moisture" value={`${receipt.moisturePct}%`} mono />
              <ReceiptRow label="Foreign Matter" value={`${receipt.foreignMatterPct}%`} mono />
            </div>
          </div>

          {/* Weighment Details */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Weighment Details</p>
            <div className="space-y-0">
              <ReceiptRow label="Gross Weight" value={`${receipt.grossWeightKg?.toLocaleString('en-IN')} kg`} mono />
              <ReceiptRow label="Tare Weight" value={`${receipt.tareWeightKg?.toLocaleString('en-IN')} kg`} mono />
              <ReceiptRow label="Net Weight" value={`${receipt.netWeightKg?.toLocaleString('en-IN')} kg`} mono />
              <ReceiptRow label="Net Quantity" value={`${receipt.netWeightQtl} Quintals`} mono />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">MSP Payment Calculation</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Quantity</span>
                <span className="font-mono">{receipt.netWeightQtl} Qtl</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>MSP Rate</span>
                <span className="font-mono">₹ {receipt.mspRate?.toLocaleString('en-IN')}/Qtl</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-300 mt-2">
                <span className="font-bold text-green-900 text-sm">Total Payable</span>
                <span className="font-bold text-green-900 text-lg font-mono">₹ {receipt.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* DBT Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600 text-center">
            Direct Payment transferred via Aadhaar DBT within 48 hours to registered bank account.
          </div>

          {/* Officer Signature */}
          <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
            <div className="text-xs text-slate-500">
              <p className="font-semibold text-slate-700">{receipt.officerName}</p>
              <p>Badge: {receipt.officerBadge}</p>
              <p>Procurement Officer</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="text-xs font-mono text-slate-400">Digital Signature</p>
              <div className="w-24 h-8 border border-dashed border-slate-300 rounded mt-1 flex items-center justify-center text-[10px] text-slate-300">e-Sign</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions (Visible on webpage, Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row gap-3">
        <PrimaryButton icon={Printer} onClick={() => window.print()} className="flex-1 justify-center">
          Print Voucher
        </PrimaryButton>
        <SecondaryButton icon={Download} onClick={() => alert('Voucher PDF downloaded')} className="flex-1 justify-center">
          Download PDF
        </SecondaryButton>
        <SecondaryButton onClick={() => navigate('/officer/history')} className="flex-1 justify-center">
          View History
        </SecondaryButton>
      </div>

      <div className="no-print">
        <button
          onClick={() => navigate('/officer/dashboard')}
          className="w-full text-center text-sm text-green-700 hover:text-green-900 font-semibold py-2 transition-colors"
        >
          ← Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Receipt;


