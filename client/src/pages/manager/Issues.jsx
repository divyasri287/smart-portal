import React, { useState } from 'react';
import StatisticsCard from '../../components/manager/StatisticsCard';
import { complaintStats, initialComplaintsList } from '../../data/manager/complaints';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  FileText, 
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Issues = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [tickets, setTickets] = useState(initialComplaintsList);

  const handleResolveTicket = (status) => {
    if (!selectedTicket) return;
    setTickets(tickets.map((t) => {
      if (t.ticketId === selectedTicket.ticketId) {
        return { ...t, status };
      }
      return t;
    }));
    setSelectedTicket(null);
    setResolutionNote('');
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Grievances &amp; Moisture Disputes Resolution Desk
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Review farmer complaints raised at Mandi Helpdesk, moisture sample disputes &amp; payment hold issues
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards — sourced from complaintStats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Open Grievances"
          value={`${tickets.filter(t => t.status !== 'Resolved').length} Tickets`}
          subtitle={complaintStats.openSub}
          trend={complaintStats.openTrend}
          isTrendPositive={false}
          icon={AlertTriangle}
          color="amber"
        />
        <StatisticsCard
          title="Resolved Today"
          value={complaintStats.resolvedToday}
          subtitle={complaintStats.resolvedSub}
          trend={complaintStats.resolvedTrend}
          isTrendPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatisticsCard
          title="Moisture Re-tests"
          value={complaintStats.moistureRetests}
          subtitle={complaintStats.retestsSub}
          trend={complaintStats.retestsTrend}
          isTrendPositive={true}
          icon={FileText}
          color="blue"
        />
        <StatisticsCard
          title="Avg Resolution Time"
          value={complaintStats.avgResolutionTime}
          subtitle={complaintStats.avgSub}
          trend={complaintStats.avgTrend}
          isTrendPositive={true}
          icon={Clock}
          color="emerald"
        />
      </div>

      {/* Dataset Table */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs overflow-hidden">
        {/* Table Filter controls */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ticket ID, farmer name, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-['Inter']">
            <thead>
              <tr className="bg-slate-100/70 border-b border-[#E5E7EB] text-[11px] font-bold text-slate-600 uppercase tracking-wider font-['Poppins']">
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Farmer Details</th>
                <th className="py-3.5 px-4">Dispute Category</th>
                <th className="py-3.5 px-4">Date Submitted</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredTickets.map((t) => (
                <tr key={t.ticketId} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold font-['Roboto_Mono'] text-[#166534]">
                    {t.ticketId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#111827] font-['Poppins']">{t.farmerName}</p>
                    <p className="text-[11px] text-slate-500 font-['Roboto_Mono']">{t.farmerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-slate-800 font-medium border border-[#E5E7EB]">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-['Roboto_Mono'] text-slate-600">
                    {t.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold font-['Roboto_Mono'] uppercase ${
                        t.priority === 'High'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : t.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold font-['Roboto_Mono'] text-[11px] ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-100 text-[#166534]'
                          : t.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="h-9 px-3.5 rounded-lg bg-white border border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white font-semibold text-xs font-['Poppins'] transition-all inline-flex items-center gap-1"
                    >
                      <span>Review Ticket</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[18px] p-6 max-w-lg w-full border border-[#E5E7EB] shadow-2xl space-y-4 font-['Inter']"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                  Resolve Ticket {selectedTicket.ticketId}
                </h3>
                <p className="text-xs text-slate-500">{selectedTicket.category}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <p className="text-[10px] text-slate-400 uppercase font-bold font-['Poppins']">Farmer Description</p>
                <p className="text-slate-800 font-medium mt-1 leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
                  <span className="text-[10px] text-slate-400 uppercase block font-['Poppins']">Duty Station</span>
                  <span className="font-bold font-['Poppins']">{selectedTicket.bay}</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
                  <span className="text-[10px] text-slate-400 uppercase block font-['Poppins']">Inspector</span>
                  <span className="font-bold font-['Poppins']">{selectedTicket.assignedInspector}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                  Manager Resolution Decision &amp; Audit Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter manager audit findings or re-testing result..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full p-3 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 font-['Poppins']">
                <button
                  onClick={() => handleResolveTicket('In Progress')}
                  className="h-11 px-5 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-xs transition-all"
                >
                  Mark In-Progress
                </button>
                <button
                  onClick={() => handleResolveTicket('Resolved')}
                  className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Resolve &amp; Close</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Issues;
