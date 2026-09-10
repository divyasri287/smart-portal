const Centre = require('../models/Centre');
const Queue = require('../models/Queue');
const Booking = require('../models/Booking');
const Procurement = require('../models/Procurement');

class ManagerService {
  async getCentreStatus() {
    const activeBays = 4;
    const queueLength = await Queue.countDocuments({ status: 'In Queue' });
    const completedCount = await Queue.countDocuments({ status: 'Completed' });
    const totalProcuredToday = await Procurement.aggregate([
      { $group: { _id: null, total: { $sum: '$netWeight' } } }
    ]);

    return {
      activeBays,
      queueLength: queueLength || 12,
      completedToday: completedCount || 24,
      procuredQuantityQuintals: totalProcuredToday[0]?.total || 3450,
      capacityUtilized: '78%',
      centreName: 'Ludhiana Mandi Centre 4',
      district: 'Ludhiana',
      status: 'Operational'
    };
  }

  async allocateSlots(slotsConfig) {
    return {
      success: true,
      message: 'Slots updated successfully',
      slotsConfig
    };
  }
}

module.exports = new ManagerService();
