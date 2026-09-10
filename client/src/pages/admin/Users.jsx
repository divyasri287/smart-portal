import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Building2,
  Search,
  Plus,
  Edit,
  X,
  CheckCircle2,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('officers'); // 'officers' | 'managers'
  const [officers, setOfficers] = useState(() => adminStorage.getOfficers());
  const [managers, setManagers] = useState(() => adminStorage.getManagers());
  const [search, setSearch] = useState('');
  const [centres, setCentres] = useState(() => adminStorage.getCentres());

  const [editUser, setEditUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState(null);

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    employeeId: '',
    assignedCentre: '',
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
    showToast(`Updated details for ${editUser.name}.`);
    setEditUser(null);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.employeeId) return;

    const assigned = newUserForm.assignedCentre || (centres[0]?.name || 'Salem Main Centre');
    if (activeTab === 'officers') {
      adminStorage.addOfficer({
        name: newUserForm.name,
        employeeId: newUserForm.employeeId,
        assignedCentre: assigned,
        status: 'Active',
      });
      setOfficers(adminStorage.getOfficers());
      showToast(`Officer ${newUserForm.name} added successfully.`);
    } else {
      adminStorage.addManager({
        name: newUserForm.name,
        employeeId: newUserForm.employeeId,
        assignedCentre: assigned,
        status: 'Active',
      });
      setManagers(adminStorage.getManagers());
      showToast(`Manager ${newUserForm.name} added successfully.`);
    }

    setNewUserForm({ name: '', employeeId: '', assignedCentre: '' });
    setShowAddModal(false);
  };

  const filteredOfficers = officers.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      o.assignedCentre.toLowerCase().includes(search.toLowerCase())
  );

  const filteredManagers = managers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      m.assignedCentre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">
              <Users className="w-3.5 h-3.5" />
              Staff Administration
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Administer Procurement Officers and Centre Managers across operational mandis
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-800 hover:bg-green-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeTab === 'officers' ? 'Officer' : 'Centre Manager'}</span>
        </button>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── TABS & SEARCH ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        {/* EXACT 2 TABS REQUESTED: Officers and Centre Managers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('officers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'officers'
                ? 'bg-green-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Procurement Officers ({officers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('managers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'managers'
                ? 'bg-green-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab} by name, ID or centre...`}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-green-700 bg-slate-50/60"
          />
        </div>
      </div>

      {/* ── USERS TABLE (OFFICERS TAB) ── */}
      {activeTab === 'officers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Assigned Centre</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOfficers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No procurement officers found.
                    </td>
                  </tr>
                ) : (
                  filteredOfficers.map((o) => {
                    const isActive = o.status === 'Active';
                    return (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {o.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {o.employeeId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {o.assignedCentre}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                              isActive
                                ? 'bg-green-50 text-green-800 border-green-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-green-600' : 'bg-rose-600'
                              }`}
                            />
                            <span>{o.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setEditUser(o)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleOfficer(o)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                                  : 'text-green-800 bg-green-50 hover:bg-green-100 border border-green-200'
                              }`}
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

      {/* ── USERS TABLE (MANAGERS TAB) ── */}
      {activeTab === 'managers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Assigned Centre</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredManagers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No centre managers found.
                    </td>
                  </tr>
                ) : (
                  filteredManagers.map((m) => {
                    const isActive = m.status === 'Active';
                    return (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {m.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {m.employeeId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {m.assignedCentre}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                              isActive
                                ? 'bg-green-50 text-green-800 border-green-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-green-600' : 'bg-rose-600'
                              }`}
                            />
                            <span>{m.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => setEditUser(m)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleManager(m)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                                  : 'text-green-800 bg-green-50 hover:bg-green-100 border border-green-200'
                              }`}
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

      {/* ── EDIT USER MODAL ── */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">Edit {activeTab === 'officers' ? 'Officer' : 'Manager'}</h3>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  required
                  value={editUser.employeeId}
                  onChange={(e) => setEditUser({ ...editUser, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Centre</label>
                <select
                  value={editUser.assignedCentre}
                  onChange={(e) => setEditUser({ ...editUser, assignedCentre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700 bg-white"
                >
                  {centres.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD USER MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">Add New {activeTab === 'officers' ? 'Officer' : 'Manager'}</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  required
                  placeholder={activeTab === 'officers' ? 'e.g. INS-TN-5501' : 'e.g. MGR-TN-409'}
                  value={newUserForm.employeeId}
                  onChange={(e) => setNewUserForm({ ...newUserForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Centre</label>
                <select
                  value={newUserForm.assignedCentre || (centres[0]?.name || '')}
                  onChange={(e) => setNewUserForm({ ...newUserForm, assignedCentre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700 bg-white"
                >
                  {centres.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold cursor-pointer"
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
