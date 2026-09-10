import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import ProcurementWorkflowProgress from '../../components/officer/ProcurementWorkflowProgress';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import officerStorage from '../../utils/officerStorage';

const gradeConfig = {
  'Grade A (Passed)': { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', icon: CheckCircle2, iconColor: 'text-emerald-600', label: 'Eligible for Full MSP Payment' },
  'FAQ (Fair Average Quality)': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: AlertTriangle, iconColor: 'text-blue-500', label: 'Eligible — Minor deductions may apply' },
  'Rejected (Excess Moisture)': { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', icon: XCircle, iconColor: 'text-rose-500', label: 'NOT eligible — Moisture above permissible limit' },
};

export const QualityCheck = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [session, setSession] = useState({});
  const [moisture, setMoisture] = useState('12.4');
  const [foreignMatter, setForeignMatter] = useState('0.5');
  const [damagedGrains, setDamagedGrains] = useState('0.3');
  const [gradeResult, setGradeResult] = useState('Grade A (Passed)');

  useEffect(() => {
    const active = officerStorage.getActiveSession();
    setSession(active);
    if (active.moisturePct) setMoisture(String(active.moisturePct));
    if (active.foreignMatterPct) setForeignMatter(String(active.foreignMatterPct));
    if (active.damagedGrainsPct) setDamagedGrains(String(active.damagedGrainsPct));
    if (active.gradeResult) setGradeResult(active.gradeResult);
  }, []);

  const gradeCfg = gradeConfig[gradeResult] || gradeConfig['Grade A (Passed)'];
  const GradeIcon = gradeCfg.icon;

  const handleSubmit = (e) => {
    e.preventDefault();

    officerStorage.setActiveSession({
      moisturePct: parseFloat(moisture),
      foreignMatterPct: parseFloat(foreignMatter),
      damagedGrainsPct: parseFloat(damagedGrains),
      gradeResult: gradeResult,
    });

    if (gradeResult === 'Rejected (Excess Moisture)') {
      officerStorage.updateQueueStatus(session.farmerId || session.tokenNo, 'Rejected');
      showToast('❌ Grain quality rejected — Stored in LocalStorage', 'error');
    } else {
      officerStorage.updateQueueStatus(session.farmerId || session.tokenNo, 'Quality Verified');
      showToast('✅ Quality check passed — Proceed to weighbridge', 'success');
      navigate('/officer/weight-check');
    }
  };

  return (
    <div className="space-y-4 select-auto">
      {/* Dynamic Workflow Progress: Step 3 */}
      <ProcurementWorkflowProgress currentStep={3} />

      <PageHeader
        title="Grain Quality & Moisture Check"
        action={
          <SecondaryButton icon={ArrowLeft} onClick={() => navigate(-1)}>Back</SecondaryButton>
        }
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${gradeCfg.bg} ${gradeCfg.border}`}>
            <GradeIcon className={`w-5 h-5 shrink-0 ${gradeCfg.iconColor}`} />
            <div>
              <p className={`font-bold text-xs ${gradeCfg.text}`}>{gradeResult}</p>
              <p className={`text-[11px] mt-0.5 ${gradeCfg.text} opacity-80`}>{gradeCfg.label}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <PrimaryButton type="submit" icon={ArrowRight} className="flex-1 justify-center">
              Approve Quality & Proceed to Weighbridge
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate(-1)} className="sm:flex-none">
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QualityCheck;
