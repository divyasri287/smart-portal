import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Clock,
  CheckCircle2,
  Ticket,
  ChevronRight,
  X,
  User,
  Truck,
  Scale,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

export const QueueMonitoring = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [queue, setQueue] = useState(() => managerStorage.getQueue());
  const [selectedToken, setSelectedToken] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadQueue = () => {
    const data = managerStorage.refreshQueue();
    setQueue(data);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadQueue();
      setIsRefreshing(false);
      if (addToast) addToast('Queue refreshed with latest tokens.', 'success');
    }, 400);
  };

  // Metrics computation
  const waitingList = queue.filter((q) => q.status === 'Waiting');
  const inProgressItem = queue.find((q) => q.status === 'In Progress') || waitingList[0];
  const currentToken = inProgressItem?.tokenNumber || 'None';
  
  // Next token is the first waiting token after the current one
  const nextToken = waitingList.find((q) => q.tokenNumber !== currentToken)?.tokenNumber || (waitingList.length > 0 ? waitingList[0].tokenNumber : 'None');
  
  const waitingCount = waitingList.length;
  const completedCount = queue.filter((q) => q.status === 'Completed').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* ── HEADER & REFRESH BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Queue Monitoring</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time token sequence and farmer check-in status for today
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* ── 4 SUMMARY STATUS CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Token */}
        <div className="bg-white rounded-2xl border-2 border-emerald-600 p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Current Token
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono mt-1">
            {currentToken}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">At weighment bay</p>
        </div>

        {/* Next Token */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Next Token
          </span>
          <p className="text-2xl sm:text-3xl font-black text-slate-800 font-mono mt-1">
            {nextToken}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Next in line</p>
        </div>

        {/* Waiting Farmers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Waiting Farmers
          </span>
          <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
            {waitingCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">In staging area</p>
        </div>

        {/* Completed Farmers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Completed Farmers
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
            {completedCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Receipt issued</p>
        </div>
      </div>

      {/* ── QUEUE TABLE (EXACT 5 COLUMNS + ACTION BUTTON) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Today's Queue List ({queue.length} Total Tokens)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Token Number</th>
                <th className="px-5 py-3.5">Farmer Name</th>
                <th className="px-5 py-3.5">Crop</th>
                <th className="px-5 py-3.5">Time Slot</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {queue.map((item) => {
                const isCurrent = item.tokenNumber === currentToken;
                return (
                  <tr
                    key={item.id || item.tokenNumber}
                    className={`hover:bg-slate-50 transition-colors ${
                      isCurrent ? 'bg-emerald-50/50' : ''
                    }`}
                  >
                    {/* 1. Token Number */}
                    <td className="px-5 py-4 font-mono font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        {item.tokenNumber}
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 bg-emerald-700 text-white rounded text-[9px] font-bold uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </span>
                    </td>

                    {/* 2. Farmer Name */}
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      <div>{item.farmerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {item.farmerId}
                      </div>
                    </td>

                    {/* 3. Crop */}
                    <td className="px-5 py-4 text-slate-700">{item.crop}</td>

                    {/* 4. Time Slot */}
                    <td className="px-5 py-4 text-xs font-mono text-slate-600">
                      {item.timeSlot}
                    </td>

                    {/* 5. Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            item.status === 'Completed'
                              ? 'bg-emerald-600'
                              : item.status === 'In Progress'
                              ? 'bg-blue-600 animate-pulse'
                              : 'bg-amber-600'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Button: View Details */}
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedToken(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── VIEW DETAILS MODAL ── */}
      {selectedToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Token Information
                </span>
                <h3 className="text-xl font-black text-slate-900 font-mono mt-1">
                  {selectedToken.tokenNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedToken(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Farmer Name</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedToken.farmerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Farmer ID</span>
                  <span className="font-mono font-bold text-slate-800">{selectedToken.farmerId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Mobile Number</span>
                  <span className="font-semibold text-slate-800">{selectedToken.mobile || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Time Slot</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedToken.timeSlot}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Commodity</span>
                  <span className="font-bold text-emerald-800">{selectedToken.crop}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Quantity</span>
                  <span className="font-mono font-bold text-slate-900">{selectedToken.quantity || 'Pending Weighment'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Vehicle Number</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedToken.vehicleNo || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Current Status</span>
                  <span className="font-bold text-slate-900">{selectedToken.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedToken(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueMonitoring;
