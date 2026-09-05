import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users as UsersIcon, UserCheck, ShieldCheck, Search, Filter, Plus, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Modal from '../../components/dialogs/Modal';
import { usersData } from '../../data/adminData';

export const Users = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ user: '', name: '', role: 'District', department: '', email: '', phone: '' });

  const roles = ['All', 'District', 'Centre', 'Admin'];

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u))
    );
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name) return;

    const count = usersList.length + 1;
    const created = {
      userId: `USR-0${count}`,
      user: `User 0${count}`,
      name: newUser.name,
      role: newUser.role,
      department: newUser.department || 'Government Directorate',
      location: 'Regional Office',
      email: newUser.email || `user0${count}@gov.in`,
      phone: newUser.phone || '+91 98000 00000',
      status: 'Active',
      lastActive: 'Just now'
    };

    setUsersList([created, ...usersList]);
    setIsAddUserModalOpen(false);
    setNewUser({ user: '', name: '', role: 'District', department: '', email: '', phone: '' });
  };

  const activeCount = usersList.filter((u) => u.status === 'Active').length;

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/reports')} className="hover:text-[#166534]">
              State Reports
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">Users</span>
            <span>/</span>
            <button onClick={() => navigate('/admin/profile')} className="hover:text-[#166534]">
              Admin Profile
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">System User Directory & Access Governance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Government Admin portal to view system accounts, assign state/district roles, and control access privileges
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl px-5 py-2.5 transition-all text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add User Account
          </button>
          <button
            onClick={() => navigate('/admin/profile')}
            className="flex items-center gap-2 bg-white hover:bg-[#166534]/5 text-[#166534] border border-[#166534]/30 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-2xs"
          >
            Admin Profile <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── User Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#166534]/10 text-[#166534]">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Accounts</p>
            <p className="text-2xl font-bold text-[#111827] mt-0.5 font-mono leading-tight">{usersList.length} Users</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Government Officer Credentials</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#15803D]/10 text-[#15803D]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Sessions</p>
            <p className="text-2xl font-bold text-[#166534] mt-0.5 font-mono leading-tight">{activeCount} Active</p>
            <p className="text-[11px] text-[#15803D] font-semibold mt-0.5">Authorized Operating State</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl shrink-0 bg-[#d97706]/10 text-[#d97706]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Officers</p>
            <p className="text-2xl font-bold text-[#d97706] mt-0.5 font-mono leading-tight">
              {usersList.filter((u) => u.role === 'Admin').length} Admins
            </p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">State Secretariat Level</p>
          </div>
        </div>
      </div>

      {/* ── User Table Container ── */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search user name or role (e.g. User 01)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D] text-sm bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] bg-[#F8FAFC] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r === 'All' ? 'All Roles (District / Centre / Admin)' : `Role: ${r}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clean Table: User | Role | Status */}
        <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-slate-700 font-semibold border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-4">User Handle</th>
                <th className="py-3 px-4">Officer Name & Contact</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.userId} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#166534]">{u.user}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#166534]/10 text-[#166534] font-bold text-xs flex items-center justify-center font-mono">
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{u.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'Active'
                            ? 'bg-emerald-50 text-[#166534] border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {u.status === 'Active' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.userId)}
                        className={`font-semibold rounded-lg px-3.5 py-1.5 transition-all text-xs shadow-2xs ${
                          u.status === 'Active'
                            ? 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                            : 'bg-[#166534] text-white hover:bg-[#14532d]'
                        }`}
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                    No user matches your search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add User Modal ── */}
      {isAddUserModalOpen && (
        <Modal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          title="Onboard New Government User Account"
        >
          <form onSubmit={handleAddUserSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold text-[#111827] mb-1">Full Officer Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Sharma / Officer Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">User Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                >
                  <option value="District">District</option>
                  <option value="Centre">Centre</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Official Email</label>
                <input
                  type="email"
                  placeholder="user@gov.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="bg-white hover:bg-slate-50 text-[#15803D] border border-[#15803D] font-semibold rounded-xl px-4 py-2 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl px-5 py-2 text-sm shadow-xs transition-colors"
              >
                Save User Account
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Users;

