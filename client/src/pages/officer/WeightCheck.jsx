import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, ArrowLeft, Scale, Gauge } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

export const WeightCheck = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [session, setSession] = useState({});
  const [grossWeight, setGrossWeight] = useState('18500');
  const [tareWeight, setTareWeight] = useState('4500');
  const [bagsCount, setBagsCount] = useState('140');

  useEffect(() => {
    const active = officerStorage.getActiveSession();
    setSession(active);
    if (active.grossWeightKg) setGrossWeight(String(active.grossWeightKg));
    if (active.tareWeightKg) setTareWeight(String(active.tareWeightKg));
  }, []);

  const gross = parseFloat(grossWeight || 0);
  const tare = parseFloat(tareWeight || 0);
  const netKg = Math.max(0, gross - tare);
  const netQuintals = netKg / 100;
  const mspRate = session.commodity?.includes('Wheat') ? 2275 : session.commodity?.includes('Mustard') ? 5650 : 2300;
  const estimatedAmount = netQuintals * mspRate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gross <= tare) {
      showToast('⚠ Gross weight must be greater than tare weight', 'error');
      return;
    }

    officerStorage.setActiveSession({
      grossWeightKg: gross,
      tareWeightKg: tare,
      netWeightKg: netKg,
      netWeightQtl: netQuintals,
      bagsCount: parseInt(bagsCount) || 140,
      mspRate: mspRate,
      totalAmount: estimatedAmount,
    });

    officerStorage.updateQueueStatus(session.farmerId || session.tokenNo, 'Weight Logged');

    showToast(`✅ Weight logged: ${netQuintals.toFixed(2)} Qtl — Proceed to Summary`, 'success');
    navigate('/officer/submit-procurement');
  };

  return (
    <div className="space-y-4 select-none cursor-default">
      {/* Dynamic Workflow Progress: Step 4 */}
      <ProcurementWorkflowProgress currentStep={4} />

      <PageHeader
        title="Weighbridge Entry & Weight Logging"
        subtitle="Digital weighbridge input for vehicle gross and tare weight"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      {/* Batch Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl p-3.5 shadow-sm border border-emerald-700">
        <div className="p-2 bg-white/20 rounded-lg shrink-0">
          <Scale className="w-5 h-5 text-emerald-200" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-xs">Batch: {session.tokenNo || 'TKN-A901'} · {session.commodity || 'Paddy Grade A'} · {session.farmerName || 'Ramesh Singh'}</p>
          <p className="text-[11px] text-emerald-200 mt-0.5">Scale: Digital Weighbridge Unit-3 · Vehicle: {session.vehicleNo || 'PB-10-CZ-4419'}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-2.5 py-1 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          Scale Online
        </div>
      </div>

      {/* Live Display & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Digital Scale Display */}
        <div className="space-y-3">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 shadow-inner">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">DIGITAL WEIGHBRIDGE — LIVE READING</p>
              <div className="inline-block bg-black/60 rounded-xl px-6 py-4 border border-emerald-800 mb-2.5 w-full">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">NET WEIGHT</p>
                <p className="text-4xl font-bold font-mono text-emerald-400 tracking-tight">
                  {netQuintals.toFixed(2)}
                  <span className="text-xl ml-2 text-emerald-600">Qtl</span>
                </p>
                <p className="text-base font-mono text-slate-400 mt-0.5">{netKg.toLocaleString('en-IN')} kg</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">Gross</p>
                  <p className="text-lg font-bold font-mono text-amber-400">{parseFloat(grossWeight || 0).toLocaleString('en-IN')} kg</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">Tare</p>
                  <p className="text-lg font-bold font-mono text-blue-400">{parseFloat(tareWeight || 0).toLocaleString('en-IN')} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Amount */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Gauge className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Estimated MSP Amount</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-emerald-800">
                ₹ {estimatedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-emerald-700 mt-0.5">
              {netQuintals.toFixed(2)} Qtl × ₹{mspRate.toLocaleString('en-IN')} MSP/Qtl
            </p>
          </div>
        </div>

        {/* Entry Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Weighment Log Entry</h3>
            <p className="text-[11px] text-slate-500">Enter or confirm digital scale readings for this vehicle</p>
          </div>
          <div className="border-t border-slate-100 pt-3 space-y-3">
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
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Net Weight (kg)</span>
                <span className="font-mono font-bold text-slate-900">{netKg.toLocaleString('en-IN')} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Net Weight (Quintals)</span>
                <span className="font-mono font-bold text-slate-900">{netQuintals.toFixed(2)} Qtl</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 text-emerald-800 font-bold">
                <span>Est. MSP Payable</span>
                <span className="font-mono">₹ {estimatedAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
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
