import React, { useState } from 'react';
import { initialNotifications } from '../../data/manager/notifications';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Info, 
  Trash2, 
  CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleToggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'urgent') return n.type === 'urgent' || n.type === 'warning';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#166534]" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[18px] border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#111827]">
                Centre Dispatch &amp; Operational Alerts
              </h1>
              <p className="text-xs text-slate-500 font-['Inter'] mt-0.5">
                Real-time queue warnings, moisture disputes, officer shifts &amp; payment updates
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-['Poppins']">
          <button
            onClick={handleMarkAllRead}
            className="h-11 px-5 rounded-xl border border-[#166534] text-[#166534] hover:bg-[#f0fdf4] text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>

          <button
            onClick={handleClearAll}
            className="h-11 px-5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3 font-['Poppins']">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#166534] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-[#E5E7EB]'
          }`}
        >
          All Alerts ({notifications.length})
        </button>

        <button
          onClick={() => setActiveFilter('unread')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'unread'
              ? 'bg-[#166534] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-[#E5E7EB]'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>

        <button
          onClick={() => setActiveFilter('urgent')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'urgent'
              ? 'bg-[#166534] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-[#E5E7EB]'
          }`}
        >
          Urgent ({notifications.filter(n => n.type === 'urgent' || n.type === 'warning').length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 font-['Inter']">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-[18px] p-12 text-center border border-[#E5E7EB]">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700 font-['Poppins']">No alerts found</p>
              <p className="text-xs text-slate-400 mt-1">All mandi operations are running smoothly.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-[18px] border p-5 transition-all shadow-xs flex items-start justify-between gap-4 ${
                  !notification.read ? 'border-l-4 border-l-[#166534] border-[#E5E7EB] bg-emerald-50/20' : 'border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    {getIcon(notification.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Poppins'] font-bold text-sm text-[#111827]">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-[#166534]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 font-['Roboto_Mono']">
                      <Clock className="w-3 h-3 text-[#F59E0B]" />
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleRead(notification.id)}
                  className="text-xs text-[#166534] hover:underline font-semibold font-['Poppins'] shrink-0"
                >
                  {notification.read ? 'Mark Unread' : 'Mark Read'}
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
