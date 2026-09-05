import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, ArrowLeft, Scale, Gauge } from 'lucide-react';

export const WeightCheck = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [grossWeight, setGrossWeight] = useState('18500');
  const [tareWeight, setTareWeight] = useState('4500');
  const [bagsCount, setBagsCount] = useState('140');

  const gross = parseFloat(grossWeight || 0);
  const tare = parseFloat(tareWeight || 0);
  const netKg = Math.max(0, gross - tare);
  const netQuintals = netKg / 100;
  const mspRate = 2300;
  const estimatedAmount = netQuintals * mspRate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gross <= tare) {
      showToast('⚠ Gross weight must be greater than tare weight', 'error');
      return;
    }
    showToast(`✅ Weight logged: ${netQuintals.toFixed(2)} Quintals — Proceed to Summary`, 'success');
    navigate('/officer/submit-procurement');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weighbridge Entry & Weight Logging"
        subtitle="Digital weighbridge input for vehicle gross and tare weight"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      {/* Batch Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-green-800 to-green-700 text-white rounded-xl px-5 py-4">
        <div className="p-2.5 bg-white/20 rounded-lg shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">Batch: TKN-A901 · Paddy Grade A · Scale Bay 3</p>
          <p className="text-xs text-green-200 mt-0.5">Connected: Digital Weighbridge Unit-3 · Ludhiana Mandi Centre 4</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          Scale Online
        </div>
      </div>

      {/* Live Display & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Scale Display */}
        <div className="space-y-4">
          {/* Big Net Weight Display */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-inner">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">DIGITAL WEIGHBRIDGE — LIVE READING</p>
              <div className="inline-block bg-black/60 rounded-xl px-8 py-5 border border-green-800 mb-3 w-full">
                <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1">NET WEIGHT</p>
                <p className="text-5xl font-bold font-mono text-green-400 tracking-tight">
                  {netQuintals.toFixed(2)}
                  <span className="text-2xl ml-2 text-green-600">Qtl</span>
                </p>
                <p className="text-lg font-mono text-slate-400 mt-1">{netKg.toLocaleString('en-IN')} kg</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Gross</p>
                  <p className="text-xl font-bold font-mono text-amber-400">{parseFloat(grossWeight || 0).toLocaleString('en-IN')} kg</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Tare</p>
                  <p className="text-xl font-bold font-mono text-blue-400">{parseFloat(tareWeight || 0).toLocaleString('en-IN')} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Amount */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-green-700" />
              <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Estimated MSP Amount</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-green-800">
                ₹ {estimatedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-green-600 mt-1">
              {netQuintals.toFixed(2)} Qtl × ₹{mspRate.toLocaleString('en-IN')} MSP/Qtl
            </p>
          </div>
        </div>

        {/* Entry Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-0.5">Weighment Log Entry</h3>
            <p className="text-xs text-slate-500">Enter or confirm scale readings for this vehicle</p>
          </div>
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <Input
              label="Gross Vehicle Weight (kg)"
              type="number"
              value={grossWeight}
              onChange={(e) => setGrossWeight(e.target.value)}
              placeholder="e.g. 18500"
              required
              name="grossWeight"
            />
            <Input
              label="Tare Vehicle Weight (kg)"
              type="number"
              value={tareWeight}
              onChange={(e) => setTareWeight(e.target.value)}
              placeholder="e.g. 4500"
              required
              name="tareWeight"
            />
            <Input
              label="Number of Bags"
              type="number"
              value={bagsCount}
              onChange={(e) => setBagsCount(e.target.value)}
              placeholder="e.g. 140"
              required
              name="bags"
            />

            {/* Computed Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Net Weight (kg)</span>
                <span className="font-mono font-bold text-slate-900">{netKg.toLocaleString('en-IN')} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Net Weight (Quintals)</span>
                <span className="font-mono font-bold text-slate-900">{netQuintals.toFixed(2)} Qtl</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-green-800 font-bold">
                <span>Est. MSP Payable</span>
                <span className="font-mono">₹ {estimatedAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton type="submit" icon={ArrowRight} className="flex-1 justify-center">
                Approve Weight & Continue
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate(-1)} className="sm:flex-none">
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeightCheck;
