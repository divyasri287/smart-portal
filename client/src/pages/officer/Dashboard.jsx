import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import DataTable from '../../components/tables/DataTable';
import queueData from '../../data/queue.json';
import { QrCode, Users, Scale, CheckCircle2 } from 'lucide-react';

export const OfficerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement Officer Workstation"
        subtitle="Centre: Ludhiana Mandi Centre 4 | Inspector Vikram Sharma"
        action={
          <PrimaryButton icon={QrCode} onClick={() => navigate('/officer/scan-qr')}>
            Scan QR Gate Token
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Vehicles in Queue" value="12" subtitle="Active Mandi Bays" icon={Users} color="amber" />
        <StatsCard title="Tokens Verified" value="28 Today" subtitle="Gate Entry Passes" icon={QrCode} color="emerald" />
        <StatsCard title="Weight Logged" value="3,420 Qtl" subtitle="Digital Weighbridge" icon={Scale} color="blue" />
        <StatsCard title="Quality Approved" value="95%" subtitle="Moisture < 14%" icon={CheckCircle2} color="indigo" />
      </div>

      <Card title="Live Mandi Queue & Inspection Status">
        <DataTable
          headers={['Token No', 'Farmer Name', 'Vehicle No', 'Commodity', 'Entry Time', 'Status', 'Action']}
          data={queueData}
          renderRow={(item, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              <td className="p-3.5 font-mono text-xs font-bold text-slate-900">{item.tokenNo}</td>
              <td className="p-3.5 text-xs text-slate-800">{item.farmerName}</td>
              <td className="p-3.5 text-xs font-mono text-slate-600">{item.vehicleNo}</td>
              <td className="p-3.5 text-xs text-slate-800">{item.commodity}</td>
              <td className="p-3.5 text-xs text-slate-500">{item.gateEntryTime}</td>
              <td className="p-3.5 text-xs font-semibold text-amber-700">{item.status}</td>
              <td className="p-3.5 text-xs">
                <button
                  onClick={() => navigate('/officer/quality-check')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-2.5 py-1 rounded-md"
                >
                  Inspect
                </button>
              </td>
            </tr>
          )}
        />
      </Card>
    </div>
  );
};

export default OfficerDashboard;
