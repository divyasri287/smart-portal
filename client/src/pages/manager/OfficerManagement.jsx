import React, { useState } from 'react';
import OfficerPerformanceTable from '../../components/manager/OfficerPerformanceTable';
import StatisticsCard from '../../components/manager/StatisticsCard';
import { officerStats, initialOfficerRoster, bayOptions } from '../../data/manager/officers';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  Star, 
  Building2,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OfficerManagement = () => {
  const [officerRoster, setOfficerRoster] = useState(initialOfficerRoster);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployForm, setDeployForm] = useState({
    name: '',
    badge: 'INS-PB-408',
    shift: 'Morning (08:00 - 14:00)',
    bay: 'Gate 1 Intake',
  });

  const handleDeploySubmit = (e) => {
    e.preventDefault();
    const newOfficer = {
      id: `OFF-${100 + officerRoster.length + 1}`,
      name: deployForm.name,
      badge: deployForm.badge,
      bay: deployForm.bay,
      shift: deployForm.shift,
      status: 'On Duty',
      rating: 4.5,
      verifiedCount: 0,
    };
    setOfficerRoster((prev) => [...prev, newOfficer]);
    setShowDeployModal(false);
    setDeployForm({ name: '', badge: 'INS-PB-408', shift: 'Morning (08:00 - 14:00)', bay: 'Gate 1 Intake' });
  };

  const handleAssignOfficer = (officerId, newBay) => {
    setOfficerRoster((prev) =>
      prev.map((o) => (o.id === officerId ? { ...o, bay: newBay } : o))
    );
  };

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Procurement Officer Roster &amp; Duty Roster
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Manage inspector shifts, weighbridge station deployments, and quality testing rosters
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDeployModal(true)}
          className="h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs font-['Poppins'] rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Deploy New Officer</span>
        </button>
      </div>

      {/* Overview Metrics — sourced from officerStats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Total Officers Deployed"
          value={officerStats.totalDeployed}
          subtitle={officerStats.totalSub}
          trend={officerStats.totalTrend}
          isTrendPositive={true}
          icon={Users}
          color="emerald"
        />
        <StatisticsCard
          title="On-Duty Shift Active"
          value={officerStats.onDutyShift}
          subtitle={officerStats.shiftSub}
          trend={officerStats.shiftTrend}
          isTrendPositive={true}
          icon={Clock}
          color="blue"
        />
        <StatisticsCard
          title="Assigned Mandi Bays"
          value={officerStats.assignedBays}
          subtitle={officerStats.baysSub}
          trend={officerStats.baysTrend}
          isTrendPositive={true}
          icon={Building2}
          color="amber"
        />
        <StatisticsCard
          title="Avg Efficiency Rating"
          value={officerStats.avgRating}
          subtitle={officerStats.ratingSub}
          trend={officerStats.ratingTrend}
          isTrendPositive={true}
          icon={Star}
          color="emerald"
        />
      </div>

      {/* Officer Performance Table — passes roster and reassign handler */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-['Poppins'] text-[#111827]">
            Active Inspector Duty Roster &amp; Performance
          </h2>
        </div>

        <OfficerPerformanceTable
          officersData={officerRoster}
          onAssignOfficer={handleAssignOfficer}
        />
      </div>

      {/* Deploy New Officer Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[18px] p-6 max-w-md w-full border border-[#E5E7EB] shadow-2xl space-y-4 font-['Inter']"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                Deploy Officer to Mandi Station
              </h3>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDeploySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-['Inter']">
                  Inspector Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Navjot Singh"
                  value={deployForm.name}
                  onChange={(e) => setDeployForm({ ...deployForm, name: e.target.value })}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-['Inter']">
                    Badge Number
                  </label>
                  <input
                    type="text"
                    value={deployForm.badge}
                    onChange={(e) => setDeployForm({ ...deployForm, badge: e.target.value })}
                    className="w-full h-11 px-4 font-['Roboto_Mono'] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-['Inter']">
                    Shift Selection
                  </label>
                  <select
                    value={deployForm.shift}
                    onChange={(e) => setDeployForm({ ...deployForm, shift: e.target.value })}
                    className="w-full h-11 px-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534] font-['Poppins']"
                  >
                    <option value="Morning (08:00 - 14:00)">Morning Shift</option>
                    <option value="Evening (14:00 - 20:00)">Evening Shift</option>
                    <option value="Night (20:00 - 02:00)">Night Shift</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-['Inter']">
                  Assigned Mandi Duty Station / Bay
                </label>
                <select
                  value={deployForm.bay}
                  onChange={(e) => setDeployForm({ ...deployForm, bay: e.target.value })}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534] font-['Poppins']"
                >
                  {bayOptions.map((bay) => (
                    <option key={bay} value={bay}>{bay}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeployModal(false)}
                  className="h-11 px-5 rounded-xl border border-[#E5E7EB] font-semibold font-['Poppins'] text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-semibold font-['Poppins'] flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Deployment</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OfficerManagement;
