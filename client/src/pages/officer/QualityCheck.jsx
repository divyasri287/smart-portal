import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, FlaskConical } from 'lucide-react';

const gradeConfig = {
  'Grade A (Passed)': { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', icon: CheckCircle2, iconColor: 'text-green-600', label: 'Eligible for Full MSP Payment' },
  'FAQ (Fair Average Quality)': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: AlertTriangle, iconColor: 'text-blue-500', label: 'Eligible — Minor deductions may apply' },
  'Rejected (Excess Moisture)': { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', icon: XCircle, iconColor: 'text-rose-500', label: 'NOT eligible — Moisture above permissible limit' },
};

export const QualityCheck = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [moisture, setMoisture] = useState('12.4');
  const [foreignMatter, setForeignMatter] = useState('0.5');
  const [damagedGrains, setDamagedGrains] = useState('0.3');
  const [gradeResult, setGradeResult] = useState('Grade A (Passed)');

  const moistureNum = parseFloat(moisture || 0);
  const autoGrade = moistureNum > 14.5
    ? 'Rejected (Excess Moisture)'
    : moistureNum > 13.0
    ? 'FAQ (Fair Average Quality)'
    : 'Grade A (Passed)';

  const gradeCfg = gradeConfig[gradeResult] || gradeConfig['Grade A (Passed)'];
  const GradeIcon = gradeCfg.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gradeResult === 'Rejected (Excess Moisture)') {
      showToast('❌ Grain quality rejected — Moisture exceeds permissible limit', 'error');
    } else {
      showToast('✅ Quality check passed — Proceed to weighbridge', 'success');
      navigate('/officer/weight-check');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grain Quality & Moisture Check"
        subtitle="Record moisture percentage, foreign matter, and assign MSP grade"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      {/* Current Batch Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white rounded-xl px-5 py-4">
        <div className="p-2.5 bg-white/20 rounded-lg shrink-0">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">Batch: TKN-A901 · Paddy Grade A · Ramesh Singh (FRM-1001)</p>
          <p className="text-xs text-indigo-200 mt-0.5">Quality Lab · Ludhiana Mandi Centre 4 · Bay 3</p>
        </div>
        <div className="text-xs bg-white/20 rounded-lg px-3 py-2 font-semibold shrink-0">
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Measurement Panels */}
        <div className="lg:col-span-2 space-y-4">
          {/* Moisture Meter */}
          <Card title="Moisture Meter Reading" subtitle="Digital hygrometer output">
            <div className={`p-4 rounded-xl border-2 text-center mb-3 ${
              moistureNum > 14.5 ? 'bg-rose-900 border-rose-600 text-rose-200'
              : moistureNum > 13 ? 'bg-blue-900 border-blue-600 text-blue-200'
              : 'bg-slate-900 border-green-600 text-green-400'
            }`}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-70">MOISTURE %</p>
              <p className="text-5xl font-bold font-mono tracking-tight">{moisture || '--'}</p>
              <p className="text-xs mt-1 opacity-60">Permissible: ≤ 14%</p>
            </div>
            <div className="text-[11px] text-slate-500 text-center">
              Auto-grade suggestion: <span className="font-bold text-slate-700">{autoGrade}</span>
            </div>
          </Card>

          {/* Standards Reference */}
          <Card title="FCI Quality Standards">
            <div className="space-y-2 text-xs">
              {[
                { param: 'Moisture', standard: '≤ 14%', status: moistureNum <= 14 ? 'ok' : 'fail' },
                { param: 'Foreign Matter', standard: '≤ 1%', status: parseFloat(foreignMatter || 0) <= 1 ? 'ok' : 'fail' },
                { param: 'Damaged Grains', standard: '≤ 3%', status: parseFloat(damagedGrains || 0) <= 3 ? 'ok' : 'fail' },
              ].map((row) => (
                <div key={row.param} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">{row.param}</span>
                  <span className="font-mono text-slate-500">{row.standard}</span>
                  <span className={`font-bold ${row.status === 'ok' ? 'text-green-600' : 'text-rose-600'}`}>
                    {row.status === 'ok' ? '✓ OK' : '✗ Fail'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quality Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-0.5">Quality Inspection Report</h3>
              <p className="text-xs text-slate-500">Enter lab-measured values to assign the quality grade</p>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Moisture Level (%)"
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  placeholder="e.g. 12.4"
                  required
                  name="moisture"
                />
                <Input
                  label="Foreign Matter (%)"
                  type="number"
                  step="0.1"
                  value={foreignMatter}
                  onChange={(e) => setForeignMatter(e.target.value)}
                  placeholder="e.g. 0.5"
                  required
                  name="foreignMatter"
                />
                <Input
                  label="Damaged Grains (%)"
                  type="number"
                  step="0.1"
                  value={damagedGrains}
                  onChange={(e) => setDamagedGrains(e.target.value)}
                  placeholder="e.g. 0.3"
                  required
                  name="damagedGrains"
                />
                <Dropdown
                  label="Assigned Quality Grade"
                  value={gradeResult}
                  onChange={(e) => setGradeResult(e.target.value)}
                  options={['Grade A (Passed)', 'FAQ (Fair Average Quality)', 'Rejected (Excess Moisture)']}
                  required
                  name="grade"
                />
              </div>

              {/* Grade Result Banner */}
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${gradeCfg.bg} ${gradeCfg.border}`}>
                <GradeIcon className={`w-6 h-6 shrink-0 ${gradeCfg.iconColor}`} />
                <div>
                  <p className={`font-bold text-sm ${gradeCfg.text}`}>{gradeResult}</p>
                  <p className={`text-xs mt-0.5 ${gradeCfg.text} opacity-80`}>{gradeCfg.label}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <PrimaryButton type="submit" icon={ArrowRight} className="flex-1 justify-center">
                  Approve Quality & Proceed to Weighbridge
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate(-1)} className="sm:flex-none">
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QualityCheck;
