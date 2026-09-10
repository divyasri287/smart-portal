import React, { useState } from 'react';
import QueueMonitorCard from '../../components/manager/QueueMonitorCard';
import StatisticsCard from '../../components/manager/StatisticsCard';
import { queueTelemetryStats, initialQueueList } from '../../data/manager/queue';
import { gateTelemetry } from '../../data/manager/dashboard';
import { 
  Activity, 
  Truck, 
  Clock, 
  Search, 
  CheckCircle2, 
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

export const QueueMonitoring = () => {
  const [search, setSearch] = useState('');
  const [bayFilter, setBayFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [queueItems, setQueueItems] = useState(initialQueueList);

  const handleAdvanceStatus = (tokenNo) => {
    setQueueItems(queueItems.map((item) => {
      if (item.tokenNo === tokenNo) {
        let nextStatus = 'In Queue';
        if (item.status === 'In Queue') nextStatus = 'Weighment';
        else if (item.status === 'Weighment') nextStatus = 'Moisture Quality Check';
        else if (item.status === 'Moisture Quality Check') nextStatus = 'Unloading';
        else if (item.status === 'Unloading') nextStatus = 'Dispatched';
        else nextStatus = 'Completed';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const filteredItems = queueItems.filter((item) => {
    const matchesSearch =
      item.tokenNo.toLowerCase().includes(search.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicleNo.toLowerCase().includes(search.toLowerCase());
    const matchesBay = bayFilter === 'All' || item.bayAssigned.includes(bayFilter);
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesBay && matchesStatus;
  });

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Real-Time Mandi Queue Oversight
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Live monitoring of vehicle entry, weighbridge turnaround, moisture testing &amp; dispatch flow
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-[#166534] text-xs font-bold font-['Roboto_Mono'] border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Telemetry Online
          </span>
        </div>
      </div>

      {/* Overview Metric Cards — sourced from queueTelemetryStats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Total Queued Trucks"
          value={queueTelemetryStats.totalQueuedTrucks}
          subtitle={queueTelemetryStats.totalQueuedSub}
          trend={queueTelemetryStats.totalQueuedTrend}
          isTrendPositive={true}
          icon={Truck}
          color="emerald"
        />
        <StatisticsCard
          title="Avg Turnaround Time"
          value={queueTelemetryStats.avgTurnaround}
          subtitle={queueTelemetryStats.avgTurnaroundSub}
          trend={queueTelemetryStats.avgTurnaroundTrend}
          isTrendPositive={true}
          icon={Clock}
          color="amber"
        />
        <StatisticsCard
          title="Active Weighbridge Bays"
          value={queueTelemetryStats.activeBays}
          subtitle={queueTelemetryStats.activeBaysSub}
          trend={queueTelemetryStats.activeBaysTrend}
          isTrendPositive={true}
          icon={CheckCircle2}
          color="blue"
        />
        <StatisticsCard
          title="Flow Efficiency"
          value={queueTelemetryStats.flowEfficiency}
          subtitle={queueTelemetryStats.flowEfficiencySub}
          trend={queueTelemetryStats.flowEfficiencyTrend}
          isTrendPositive={true}
          icon={Activity}
          color="emerald"
        />
      </div>

      {/* Gate Status Cards — sourced from gateTelemetry in dashboard.js */}
      <div>
        <h2 className="text-base font-bold font-['Poppins'] text-[#111827] mb-3">
          Entry Gate Congestion Telemetry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gateTelemetry.map((gate) => (
            <QueueMonitorCard
              key={gate.id}
              title={gate.title}
              vehicleCount={gate.vehicleCount}
              maxCapacity={gate.maxCapacity}
              flowRate={gate.flowRate}
              avgWaitTime={gate.avgWaitTime}
              status={gate.status}
              assignedInspector={gate.assignedInspector}
              onActionClick={() => setBayFilter(gate.title.split(' ')[0] + ' ' + gate.title.split(' ')[1])}
            />
          ))}
        </div>
      </div>

      {/* Live Table Section */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs overflow-hidden font-['Inter']">
        {/* Table Filters */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter token no, farmer name, or vehicle number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-600 font-medium font-['Poppins']">Bay:</span>
              <select
                value={bayFilter}
                onChange={(e) => setBayFilter(e.target.value)}
                className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
              >
                <option value="All">All Bays</option>
                <option value="Gate 1">Gate 1 Intake</option>
                <option value="Gate 2">Gate 2 Intake</option>
                <option value="Weighbridge">Weighbridge Bay 2</option>
                <option value="Unloading">Unloading Yard B</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-600 font-medium font-['Poppins']">Stage:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
              >
                <option value="All">All Stages</option>
                <option value="In Queue">In Queue</option>
                <option value="Weighment">Weighment</option>
                <option value="Moisture Quality Check">Moisture Check</option>
                <option value="Unloading">Unloading</option>
                <option value="Dispatched">Dispatched</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-[#E5E7EB] text-[11px] font-bold text-slate-600 uppercase tracking-wider font-['Poppins']">
                <th className="py-3.5 px-4">Token &amp; Farmer</th>
                <th className="py-3.5 px-4">Vehicle Details</th>
                <th className="py-3.5 px-4">Commodity</th>
                <th className="py-3.5 px-4">Assigned Location</th>
                <th className="py-3.5 px-4">Wait Time</th>
                <th className="py-3.5 px-4">Current Workflow Stage</th>
                <th className="py-3.5 px-4 text-right">Stage Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-['Inter']">
              {filteredItems.map((item) => (
                <tr key={item.tokenNo} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-bold text-[#166534] font-['Roboto_Mono'] text-xs">
                        {item.tokenNo}
                      </span>
                      <p className="font-bold text-[#111827] font-['Poppins']">{item.farmerName}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-['Roboto_Mono'] font-medium text-slate-800">
                    {item.vehicleNo}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                      {item.commodity}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {item.bayAssigned}
                  </td>

                  <td className="py-3.5 px-4 font-['Roboto_Mono'] text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {item.waitTime}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold font-['Roboto_Mono'] text-[11px] ${
                        item.status === 'Dispatched' || item.status === 'Completed'
                          ? 'bg-emerald-100 text-[#166534]'
                          : item.status === 'In Queue'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleAdvanceStatus(item.tokenNo)}
                      className="h-9 px-3.5 rounded-lg bg-white border border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white font-semibold text-xs font-['Poppins'] transition-all inline-flex items-center gap-1"
                      title="Advance Vehicle Stage"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueueMonitoring;
