import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Building2,
  Search,
  Plus,
  Eye,
  Edit,
  Power,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('officers'); // 'officers' | 'managers'
  const [officers, setOfficers] = useState(() => adminStorage.getOfficers());
  const [managers, setManagers] = useState(() => adminStorage.getManagers());
  const [searchQuery, setSearchQuery] = useState('');
  const [centres, setCentres] = useState(() => adminStorage.getCentres());

  // Modals state
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState(null);

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    employeeId: '',
    assignedCentre: '',
    phone: '',
    email: '',
    designation: '',
  });

  useEffect(() => {
    setOfficers(adminStorage.getOfficers());
    setManagers(adminStorage.getManagers());
    setCentres(adminStorage.getCentres());
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleToggleOfficer = (off) => {
    const updated = adminStorage.toggleOfficerStatus(off.id);
    setOfficers(adminStorage.getOfficers());
    showToast(`Officer ${off.name} is now ${updated.status}.`);
  };

  const handleToggleManager = (mgr) => {
    const updated = adminStorage.toggleManagerStatus(mgr.id);
    setManagers(adminStorage.getManagers());
    showToast(`Manager ${mgr.name} is now ${updated.status}.`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editUser) return;
    if (activeTab === 'officers') {
      adminStorage.updateOfficer(editUser.id, editUser);
      setOfficers(adminStorage.getOfficers());
    } else {
      adminStorage.updateManager(editUser.id, editUser);
      setManagers(adminStorage.getManagers());
    }
    showToast(`Updated details for ${editUser.name} successfully.`);
    setEditUser(null);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.employeeId) return;

    if (activeTab === 'officers') {
      adminStorage.addOfficer({
        ...newUserForm,
        status: 'Active',
        joiningDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
      setOfficers(adminStorage.getOfficers());
      showToast(`Officer ${newUserForm.name} added successfully.`);
    } else {
      adminStorage.addManager({
        ...newUserForm,
        status: 'Active',
        joiningDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
      setManagers(adminStorage.getManagers());
      showToast(`Manager ${newUserForm.name} added successfully.`);
    }

    setNewUserForm({
      name: '',
      employeeId: '',
      assignedCentre: centres[0]?.name || '',
      phone: '',
      email: '',
      designation: '',
    });
    setShowAddModal(false);
  };

  // Filter lists
  const filteredOfficers = officers.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.assignedCentre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredManagers = managers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.assignedCentre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeOfficersCount = officers.filter((o) => o.status === 'Active').length;
  const activeManagersCount = managers.filter((m) => m.status === 'Active').length;
  const totalStaff = officers.length + managers.length;
  const disabledCount =
    officers.filter((o) => o.status === 'Disabled').length +
    managers.filter((m) => m.status === 'Disabled').length;

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              Personnel Directory
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            User & Staff Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Administer Procurement Officers and Centre Managers across active government yards
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeTab === 'officers' ? 'Officer' : 'Centre Manager'}</span>
        </button>
      </div>

      {/* ── NOTICE TOAST ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── SUMMARY STATS (MAX 4 CARDS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Personnel</p>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{totalStaff}</p>
          <p className="text-[11px] text-slate-400 mt-1">Officers & Managers</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700">Active Officers</p>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono mt-1">{activeOfficersCount}</p>
          <p className="text-[11px] text-emerald-600 mt-1">On Yard Duty</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700">Active Managers</p>
          <p className="text-2xl font-extrabold text-emerald-800 font-mono mt-1">{activeManagersCount}</p>
          <p className="text-[11px] text-emerald-600 mt-1">Mandi Centre Chiefs</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Disabled Staff</p>
          <p className="text-2xl font-extrabold text-slate-700 font-mono mt-1">{disabledCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Inactive / Transferred</p>
        </div>
      </div>

      {/* ── TAB SELECTOR & SEARCH ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('officers')}
            className={
              'flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ' +
              (activeTab === 'officers'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900')
            }
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Procurement Officers ({officers.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('managers')}
            className={
              'flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ' +
              (activeTab === 'managers'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900')
            }
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Centre Managers ({managers.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab} by name or ID...`}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>
      </div>

      {/* ── OFFICERS TABLE TAB ── */}
      {activeTab === 'officers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Officer Name</th>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Assigned Centre</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredOfficers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No procurement officers found.
                    </td>
                  </tr>
                ) : (
                  filteredOfficers.map((officer) => {
                    const isActive = officer.status === 'Active';
                    return (
                      <tr key={officer.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                              {officer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{officer.name}</p>
                              <p className="text-[11px] text-slate-400">{officer.designation || 'Inspection Officer'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {officer.employeeId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {officer.assignedCentre}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                              (isActive
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200')
                            }
                          >
                            <span
                              className={
                                'w-1.5 h-1.5 rounded-full ' +
                                (isActive ? 'bg-emerald-600' : 'bg-rose-600')
                              }
                            />
                            <span>{officer.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setViewUser({ ...officer, roleType: 'Officer' })}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditUser({ ...officer })}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleOfficer(officer)}
                              className={
                                'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ' +
                                (isActive
                                  ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200')
                              }
                            >
                              {isActive ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MANAGERS TABLE TAB ── */}
      {activeTab === 'managers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Manager Name</th>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Assigned Centre</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredManagers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No centre managers found.
                    </td>
                  </tr>
                ) : (
                  filteredManagers.map((mgr) => {
                    const isActive = mgr.status === 'Active';
                    return (
                      <tr key={mgr.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {mgr.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{mgr.name}</p>
                              <p className="text-[11px] text-slate-400">Centre Manager In-Charge</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {mgr.employeeId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {mgr.assignedCentre}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                              (isActive
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200')
                            }
                          >
                            <span
                              className={
                                'w-1.5 h-1.5 rounded-full ' +
                                (isActive ? 'bg-emerald-600' : 'bg-rose-600')
                              }
                            />
                            <span>{mgr.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setViewUser({ ...mgr, roleType: 'Manager' })}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditUser({ ...mgr })}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleManager(mgr)}
                              className={
                                'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ' +
                                (isActive
                                  ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200')
                              }
                            >
                              {isActive ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── VIEW USER MODAL ── */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">{viewUser.roleType} Profile</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewUser(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-lg">
                  {viewUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-base text-slate-900">{viewUser.name}</p>
                  <p className="text-slate-500 font-mono text-xs mt-0.5">ID: {viewUser.employeeId}</p>
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-slate-500">Assigned Centre:</span>
                  <span className="font-bold text-slate-900 text-right">{viewUser.assignedCentre}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-slate-500">Phone:</span>
                  <span className="font-mono text-slate-900">{viewUser.phone || '+91 98000 00000'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-slate-500">Official Email:</span>
                  <span className="text-slate-900">{viewUser.email || 'officer@gov.in'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-semibold text-slate-500">Status:</span>
                  <span
                    className={
                      'font-bold ' +
                      (viewUser.status === 'Active' ? 'text-emerald-700' : 'text-rose-700')
                    }
                  >
                    {viewUser.status}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-500">Joining Date:</span>
                  <span className="text-slate-900">{viewUser.joiningDate || '01 Jan 2023'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setViewUser(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT USER MODAL ── */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">Edit User Information</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  required
                  value={editUser.employeeId}
                  onChange={(e) => setEditUser({ ...editUser, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Centre</label>
                <select
                  value={editUser.assignedCentre}
                  onChange={(e) => setEditUser({ ...editUser, assignedCentre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  {centres.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editUser.phone || ''}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={editUser.email || ''}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD NEW USER MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">
                  Add New {activeTab === 'officers' ? 'Procurement Officer' : 'Centre Manager'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Government Employee ID</label>
                <input
                  type="text"
                  required
                  placeholder={activeTab === 'officers' ? 'e.g. INS-TN-5501' : 'e.g. MGR-TN-409'}
                  value={newUserForm.employeeId}
                  onChange={(e) => setNewUserForm({ ...newUserForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Centre</label>
                <select
                  value={newUserForm.assignedCentre || (centres[0]?.name || '')}
                  onChange={(e) => setNewUserForm({ ...newUserForm, assignedCentre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  {centres.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98000 00000"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Govt Email</label>
                  <input
                    type="email"
                    placeholder="user@gov.in"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
