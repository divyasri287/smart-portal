import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import SearchBox from '../../components/inputs/SearchBox';
import { Eye, Download, ArrowUpDown } from 'lucide-react';
import historyData from '../../data/procurementHistory.json';

const statusConfig = {
  'Receipt Generated': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  'Rejected': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
};

const paymentConfig = {
  'DBT Credited': { bg: 'bg-green-50', text: 'text-green-700' },
  'Pending Processing': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'N/A': { bg: 'bg-slate-100', text: 'text-slate-500' },
};

const gradeConfig = {
  'Grade A': { text: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  'FAQ': { text: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  'Rejected': { text: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

const StatusPill = ({ status, config }) => {
  const cfg = config[status] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.dot && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
      {status}
    </span>
  );
};

export const OfficerHistory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');

  const grades = ['All', 'Grade A', 'FAQ', 'Rejected'];

  const filtered = historyData.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.farmerName.toLowerCase().includes(q) ||
      item.receiptId.toLowerCase().includes(q) ||
      item.tokenNo.toLowerCase().includes(q) ||
      item.commodity.toLowerCase().includes(q);
    const matchGrade = gradeFilter === 'All' || item.gradeResult === gradeFilter;
    return matchSearch && matchGrade;
  });

  const totalAmount = filtered
    .filter((i) => i.status === 'Receipt Generated')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement History"
        subtitle="Archive of all verified batches, quality checks, and receipts generated"
        action={
          <button
            onClick={() => alert('Export CSV triggered')}
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-green-700 text-slate-700 hover:text-green-800 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      />

      {/* Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Batches', value: historyData.length, color: 'text-slate-700 bg-slate-50 border-slate-200' },
          { label: 'Grade A', value: historyData.filter(i => i.gradeResult === 'Grade A').length, color: 'text-green-700 bg-green-50 border-green-200' },
          { label: 'FAQ Grade', value: historyData.filter(i => i.gradeResult === 'FAQ').length, color: 'text-blue-700 bg-blue-50 border-blue-200' },
          { label: 'Rejected', value: historyData.filter(i => i.gradeResult === 'Rejected').length, color: 'text-rose-700 bg-rose-50 border-rose-200' },
        ].map((s) => (
          <div key={s.label} className={`flex flex-col px-4 py-3 rounded-xl border ${s.color}`}>
            <p className="text-2xl font-bold leading-none">{s.value}</p>
            <p className="text-[11px] font-medium mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBox
            placeholder="Search by receipt ID, farmer, token, or crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                gradeFilter === g
                  ? 'bg-green-800 text-white border-green-800'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-green-700 hover:text-green-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="px-4 py-3">
                  <span className="flex items-center gap-1">Receipt ID <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-4 py-3">Farmer</th>
                <th className="px-4 py-3 hidden sm:table-cell">Commodity</th>
                <th className="px-4 py-3 hidden md:table-cell">Weight (Qtl)</th>
                <th className="px-4 py-3 hidden md:table-cell">Grade</th>
                <th className="px-4 py-3 hidden lg:table-cell">MSP Amount</th>
                <th className="px-4 py-3 hidden lg:table-cell">Payment</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-slate-400 text-sm">
                    No procurement records match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const gradeCfg = gradeConfig[item.gradeResult] || gradeConfig['FAQ'];
                  const payCfg = paymentConfig[item.paymentStatus] || paymentConfig['N/A'];
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{item.receiptId}</td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-slate-800">{item.farmerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.farmerId}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700 hidden sm:table-cell">{item.commodity}</td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-slate-800 hidden md:table-cell">
                        {item.netWeightQtl > 0 ? item.netWeightQtl : '—'}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${gradeCfg.bg} ${gradeCfg.text}`}>
                          {item.gradeResult}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-green-800 hidden lg:table-cell">
                        {item.totalAmount > 0 ? `₹ ${item.totalAmount.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${payCfg.bg} ${payCfg.text}`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell font-mono">{item.date}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={item.status} config={statusConfig} />
                      </td>
                      <td className="px-4 py-3">
                        {item.status === 'Receipt Generated' && (
                          <button
                            onClick={() => navigate(`/officer/receipt/${item.receiptId}`)}
                            className="text-[11px] inline-flex items-center gap-1 bg-white border border-slate-300 hover:border-green-700 text-slate-600 hover:text-green-800 font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <Eye className="w-3 h-3" /> View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          <span>Showing {filtered.length} of {historyData.length} records</span>
          {filtered.length > 0 && (
            <span className="font-semibold text-green-700 text-xs">
              Total MSP Paid: ₹ {totalAmount.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OfficerHistory;
