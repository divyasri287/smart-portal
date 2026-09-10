const Payment = require('../models/Payment');
const Procurement = require('../models/Procurement');
const User = require('../models/User');

class AdminService {
  async getStateAnalytics() {
    const totalProcurementMT = 125000;
    const totalDBTDisbursed = 287500000;
    const activeDistricts = 22;
    const activeCentres = 148;
    const totalFarmersRegistered = await User.countDocuments({ role: 'Farmer' }) || 45200;

    return {
      totalProcurementMT,
      totalDBTDisbursed,
      activeDistricts,
      activeCentres,
      totalFarmersRegistered,
      state: 'Punjab',
      season: 'Kharif 2026'
    };
  }

  async manageUserRole(userId, newRole) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.role = newRole;
    await user.save();
    return user;
  }
}

module.exports = new AdminService();
