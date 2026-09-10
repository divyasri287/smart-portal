import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  Trash2,
  Eye,
  X,
  Send,
  CloudRain,
  Building2,
  Megaphone,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(() => adminStorage.getNotifications());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewNotif, setViewNotif] = useState(null);
  const [notice, setNotice] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Government Circular',
    targetAudience: 'All Centres',
    priority: 'Normal',
    message: '',
  });

  useEffect(() => {
    setNotifications(adminStorage.getNotifications());
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return;

    adminStorage.addNotification(form);
    setNotifications(adminStorage.getNotifications());
    showToast(`Notification "${form.title}" published successfully.`);
    setForm({
      title: '',
      category: 'Government Circular',
      targetAudience: 'All Centres',
      priority: 'Normal',
      message: '',
    });
    setShowCreateModal(false);
  };

  const handleDelete = (id) => {
    const updated = adminStorage.deleteNotification(id);
    setNotifications(updated);
    showToast('Notification removed.');
    if (viewNotif && viewNotif.id === id) setViewNotif(null);
  };

  const categories = [
    'All',
    'Holiday Notice',
    'Centre Closed',
    'Heavy Rain Alert',
    'Government Circular',
  ];

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Heavy Rain Alert':
        return <CloudRain className="w-4 h-4 text-blue-600" />;
      case 'Centre Closed':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'Holiday Notice':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'Government Circular':
      default:
        return <FileText className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Heavy Rain Alert':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Centre Closed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Holiday Notice':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Government Circular':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Megaphone className="w-3.5 h-3.5 text-emerald-700" />
              Administrative Broadcasts
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Notification & Circular Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Issue weather alerts, holiday notices, centre closure orders, and official ministry circulars
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── TOP STATS (MAX 4 CARDS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Broadcasts</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {notifications.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Active Notices</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-blue-700">Weather & Rain Alerts</p>
          <p className="text-2xl font-extrabold text-blue-800 font-mono mt-1">
            {notifications.filter((n) => n.category === 'Heavy Rain Alert').length}
          </p>
          <p className="text-[11px] text-blue-600 mt-1">Yard Safety Advisories</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-amber-700">Holiday Notices</p>
          <p className="text-2xl font-extrabold text-amber-800 font-mono mt-1">
            {notifications.filter((n) => n.category === 'Holiday Notice').length}
          </p>
          <p className="text-[11px] text-amber-600 mt-1">Operational Adjustments</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700">Govt Circulars</p>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono mt-1">
            {notifications.filter((n) => n.category === 'Government Circular').length}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">Ministry Standard Policies</p>
        </div>
      </div>

      {/* ── CATEGORY PILLS & SEARCH ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ' +
                (selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>
      </div>

      {/* ── NOTIFICATIONS LIST ── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No announcements found in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-600/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={
                      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ' +
                      getCategoryBadgeClass(item.category)
                    }
                  >
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </span>

                  <span className="text-[11px] text-slate-500 font-medium">
                    Target: <strong className="text-slate-700">{item.targetAudience}</strong>
                  </span>

                  <span className="text-slate-300">·</span>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => setViewNotif(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Notice</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── CREATE NOTIFICATION MODAL ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">Create Official Notification</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Rain Alert: Tarpaulin Coverage Mandated"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="Holiday Notice">Holiday Notice</option>
                    <option value="Centre Closed">Centre Closed</option>
                    <option value="Heavy Rain Alert">Heavy Rain Alert</option>
                    <option value="Government Circular">Government Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="All Centres">All Centres</option>
                    <option value="All Officers">All Officers</option>
                    <option value="All Managers">All Managers</option>
                    <option value="Farmers & Public">Farmers & Public</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Notification Message & Instructions
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter complete circular text or operational guidelines..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── VIEW NOTIFICATION MODAL ── */}
      {viewNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">{viewNotif.category}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewNotif(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <span
                  className={
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ' +
                    getCategoryBadgeClass(viewNotif.category)
                  }
                >
                  {getCategoryIcon(viewNotif.category)}
                  <span>{viewNotif.category}</span>
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">
                  {viewNotif.title}
                </h2>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Published: {viewNotif.date} · Audience: {viewNotif.targetAudience}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed text-slate-700 text-xs">
                {viewNotif.message}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px]">
                <strong>Dispatch Status: </strong> Delivered to all registered SMS and portal dashboards across verified user accounts.
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(viewNotif.id)}
                className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg font-bold cursor-pointer inline-flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                type="button"
                onClick={() => setViewNotif(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
