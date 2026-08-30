import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import DataTable from '../../components/tables/DataTable';
import reportsData from '../../data/reports.json';
import { Activity, Calendar, Users, AlertTriangle } from 'lucide-react';

export const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement Centre Manager Command Centre"
        subtitle="Ludhiana Mandi Centre 4 | Chief Manager Anil Kumar"
        action={
          <PrimaryButton icon={Calendar} onClick={() => navigate('/manager/slot-management')}>
            Configure Slots
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Daily Capacity Utilized" value="78%" subtitle="450 / 600 Slots Booked" icon={Activity} color="emerald" />
        <StatsCard title="Avg Wait Time" value="18 Mins" subtitle="Gate to Exit Flow" icon={Activity} color="amber" />
        <StatsCard title="Officers Deployed" value="8 Inspectors" subtitle="Across 4 Bays" icon={Users} color="blue" />
        <StatsCard title="Pending Grievances" value="2 Tickets" subtitle="Unresolved Issues" icon={AlertTriangle} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Daily Centre Performance Reports">
            <DataTable
              headers={['Report ID', 'Date', 'Procured (Tons)', 'Active Mandis', 'Farmers Served']}
              data={reportsData}
            />
          </Card>
        </div>

        <div>
          <Card title="Quick Manager Controls">
            <div className="space-y-2">
              <button onClick={() => navigate('/manager/queue-monitoring')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                Monitor Live Queue Congestion
              </button>
              <button onClick={() => navigate('/manager/slot-management')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                Adjust Daily Slot Limits
              </button>
              <button onClick={() => navigate('/manager/officer-management')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                Inspect Officer Roster & Shifts
              </button>
              <button onClick={() => navigate('/manager/issues')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                Resolve Mandi Disputes & Issues
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
