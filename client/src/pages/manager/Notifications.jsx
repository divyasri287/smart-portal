import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Calendar,
  CloudRain,
  AlertCircle,
  DoorClosed,
  Clock,
  X,
  Send,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

const NOTIFICATION_EXAMPLES = [
  {
    category: 'Centre Closed',
    title: 'Centre Operations Suspended Notice',
    sample: 'Due to unscheduled power maintenance at the substation, digital weighbridge operations are closed today.',
    icon: DoorClosed,
    color: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  {
    category: 'Holiday Notice',
    title: 'Statutory Holiday Notice',
    sample: 'Salem Procurement Centre will remain closed for all procurement operations on Tuesday due to Ayudha Pooja. Bookings will resume the following day.',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    category: 'Heavy Rain Alert',
    title: 'Heavy Rain & Moisture Warning Alert',
    sample: 'Light to heavy showers expected in Salem district. Unloading only permitted inside covered Shed A and Shed B. Protect grain bags from moisture.',
    icon: CloudRain,
    color: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    category: 'Delay Notice',
    title: 'Token Clearance Delay Notice',
    sample: 'Routine digital weighbridge recalibration was performed between 08:30 AM and 09:00 AM. Token clearances are now proceeding normally.',
    icon: Clock,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
  },
];

export const Notifications = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [notifications, setNotifications] = useState(() => managerStorage.getNotifications());
  const [modalOpen, setModalOpen] = useState(false);

  // Form fields
  const [category, setCategory] = useState('Centre Closed');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setNotifications(managerStorage.getNotifications());
  }, []);

  const handleOpenModalWithTemplate = (tmpl) => {
    setCategory(tmpl.category);
    setTitle(tmpl.title);
    setMessage(tmpl.sample);
    setModalOpen(true);
  };

  const handleCreateNotification = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotif = {
      title: title.trim(),
      category,
      message: message.trim(),
    };

    const updated = managerStorage.addNotification(newNotif);
    setNotifications(updated);
    setModalOpen(false);
    setTitle('');
    setMessage('');
    if (addToast) addToast('Notification broadcasted to all farmers & officers.', 'success');
  };

  const handleDeleteNotification = (id) => {
    const updated = managerStorage.deleteNotification(id);
    setNotifications(updated);
    if (addToast) addToast('Notification removed from broadcast.', 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* ── HEADER & CREATE BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Centre Notifications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish official alerts and announcements to arriving farmers and duty staff
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCategory('Centre Closed');
            setTitle('');
            setMessage('');
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* ── QUICK TEMPLATE BUTTONS (MATCHING EXACT USER EXAMPLES) ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick Broadcast Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {NOTIFICATION_EXAMPLES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <button
                key={tmpl.category}
                type="button"
                onClick={() => handleOpenModalWithTemplate(tmpl)}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-700 hover:bg-emerald-50/50 text-left transition-all cursor-pointer group"
              >
                <div className={`p-2 rounded-lg border ${tmpl.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                    {tmpl.category}
                  </p>
                  <p className="text-[10px] text-slate-400">Click to use</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE NOTIFICATIONS LIST (VIEW NOTIFICATIONS) ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Active Centre Broadcasts ({notifications.length} Active)
          </h2>
        </div>

        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            No active announcements. Click "Create Notification" above to broadcast.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {notif.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {notif.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{notif.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {notif.message}
                  </p>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteNotification(notif.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CREATE NOTIFICATION MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                Broadcast Centre Notification
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Category <span className="text-rose-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="Centre Closed">Centre Closed</option>
                  <option value="Holiday Notice">Holiday Notice</option>
                  <option value="Heavy Rain Alert">Heavy Rain Alert</option>
                  <option value="Delay Notice">Delay Notice</option>
                  <option value="General Update">General Update</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Notice Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Centre Closed for Ayudha Pooja"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Message Content <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter detailed message to broadcast to farmers and duty officers..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
