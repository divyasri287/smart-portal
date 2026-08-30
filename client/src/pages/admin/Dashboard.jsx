import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import DataTable from '../../components/tables/DataTable';
import reportsData from '../../data/reports.json';
import { MapPin, Landmark, Building2, Users } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Procurement Control Dashboard"
        subtitle="Ministry of Food & Public Distribution | State Director Dr. Sunita Verma"
        action={
          <PrimaryButton icon={MapPin} onClick={() => navigate('/admin/state-analytics')}>
            State Wise Heatmap
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Grain Procured" value="4.85 Million MT" subtitle="Kharif Season 2026" icon={Building2} color="emerald" />
        <StatsCard title="Total DBT Amount" value="₹ 11,155 Cr" subtitle="Direct to Farmer Accounts" icon={Landmark} color="amber" />
        <StatsCard title="Active Mandi Centres" value="4,250 Centres" subtitle="Live Across 22 States" icon={MapPin} color="blue" />
        <StatsCard title="Registered Farmers" value="1.24 Million" subtitle="Aadhaar Verified" icon={Users} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="National Procurement Summaries">
            <DataTable
              headers={['Report ID', 'State / District', 'Date', 'Procured (Tons)', 'DBT Disbursed']}
              data={reportsData}
            />
          </Card>
        </div>

        <div>
          <Card title="Admin Master Controls">
            <div className="space-y-2">
              <button onClick={() => navigate('/admin/state-analytics')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                State & Regional Analytics
              </button>
              <button onClick={() => navigate('/admin/district-analytics')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                District Level Monitoring
              </button>
              <button onClick={() => navigate('/admin/centre-monitoring')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                Procurement Centre Master List
              </button>
              <button onClick={() => navigate('/admin/payments')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                DBT Payment Releases & Audit
              </button>
              <button onClick={() => navigate('/admin/users')} className="w-full text-left p-3 rounded-md bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold">
                User Access & Role Management
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
