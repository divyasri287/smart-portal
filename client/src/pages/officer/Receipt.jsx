import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { Printer, Download } from 'lucide-react';

export const Receipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader title="Digital Procurement Receipt" subtitle="Official receipt for MSP grain handover" />

      <Card className="border-2 border-emerald-700">
        <div className="text-center pb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Govt of India - Food Corporation Voucher</span>
          <h2 className="text-xl font-mono font-bold text-slate-900 mt-1">{id || 'RCP-2026-901'}</h2>
          <p className="text-xs text-slate-500">Date: 2026-08-30 | Ludhiana Mandi Centre 4</p>
        </div>

        <div className="py-4 space-y-2 text-xs text-slate-800">
          <div className="flex justify-between"><span>Farmer Name:</span><span className="font-semibold">Ramesh Singh</span></div>
          <div className="flex justify-between"><span>Farmer Aadhaar:</span><span className="font-mono">XXXX-XXXX-8912</span></div>
          <div className="flex justify-between"><span>Crop Type:</span><span className="font-semibold">Paddy Grade A</span></div>
          <div className="flex justify-between"><span>Net Quantity:</span><span className="font-bold">140 Quintals</span></div>
          <div className="flex justify-between"><span>MSP Rate:</span><span>₹ 2,300 / Qtl</span></div>
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-emerald-800">
            <span>Total Payable Amount:</span>
            <span>₹ 3,22,000</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-[11px] text-slate-600 text-center mb-4">
          Direct Payment will be transferred via Aadhaar DBT within 48 hours to registered SBI account.
        </div>

        <div className="flex gap-2">
          <PrimaryButton icon={Printer} onClick={() => window.print()} className="flex-1">
            Print Voucher
          </PrimaryButton>
          <SecondaryButton icon={Download} onClick={() => alert('Voucher PDF downloaded')}>
            Download PDF
          </SecondaryButton>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;
