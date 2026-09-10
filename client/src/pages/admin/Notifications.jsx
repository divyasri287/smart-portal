import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Trash2,
  Eye,
  X,
  Send,
  Megaphone,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(() => adminStorage.getNotifications());
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewNotif, setViewNotif] = useState(null);
  const [notice, setNotice] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Government Announcement',
    targetAudience: 'All Centres',
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

    adminStorage.addNotification({
      title: form.title,
      category: form.category,
      targetAudience: form.targetAudience,
      message: form.message,
    });
    setNotifications(adminStorage.getNotifications());
    showToast(`Notification "${form.title}" published successfully.`);
    setForm({
      title: '',
      category: 'Government Announcement',
      targetAudience: 'All Centres',
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

  // EXACT CATEGORIES SPECIFIED BY USER
  const categories = [
    'All',
    'Government Announcement',
    'Holiday Notice',
    'Centre Closed',
    'Procurement Schedule Update',
  ];

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || n.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Holiday Notice':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Centre Closed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Procurement Schedule Update':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Government Announcement':
      default:
        return 'bg-green-50 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">
              <Megaphone className="w-3.5 h-3.5" />
              Administrative Broadcasts
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publish announcements, holiday notices, and centre schedule updates
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-800 hover:bg-green-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── CATEGORY PILLS & SEARCH ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-green-800 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-green-700 bg-slate-50/60"
          />
        </div>
      </div>

      {/* ── NOTIFICATIONS LIST (VIEW NOTIFICATIONS) ── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
            No notifications found in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-green-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getCategoryBadge(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Audience: <strong className="text-slate-700">{item.targetAudience}</strong>
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.message}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => setViewNotif(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                  title="Delete notice"
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">Create Notification</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Centre Closed Notice: Heavy Rain Expected"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700 bg-white"
                  >
                    <option value="Government Announcement">Government Announcement</option>
                    <option value="Holiday Notice">Holiday Notice</option>
                    <option value="Centre Closed">Centre Closed</option>
                    <option value="Procurement Schedule Update">Procurement Schedule Update</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Audience</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700 bg-white"
                  >
                    <option value="All Centres">All Centres</option>
                    <option value="All Officers">All Officers</option>
                    <option value="All Managers">All Managers</option>
                    <option value="Farmers &amp; Public">Farmers &amp; Public</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter notice details or instructions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
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
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── VIEW NOTIFICATION MODAL ── */}
      {viewNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">{viewNotif.category}</h3>
              <button
                type="button"
                onClick={() => setViewNotif(null)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <h2 className="text-base font-bold text-slate-900">{viewNotif.title}</h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Date: {viewNotif.date} · Audience: {viewNotif.targetAudience}
              </p>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                {viewNotif.message}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
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
