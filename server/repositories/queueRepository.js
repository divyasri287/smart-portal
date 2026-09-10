const Queue = require('../models/Queue');

class QueueRepository {
  async findByTokenNo(tokenNo) {
    return await Queue.findOne({ tokenNo }).populate('booking farmer centre');
  }

  async findTodayQueue(centreId) {
    const query = centreId ? { centre: centreId } : {};
    return await Queue.find(query).populate('booking farmer centre').sort({ createdAt: 1 });
  }

  async create(data) {
    return await Queue.create(data);
  }

  async updateStatus(tokenNo, status, bayAssigned = null) {
    const update = { status };
    if (bayAssigned) update.bayAssigned = bayAssigned;
    return await Queue.findOneAndUpdate({ tokenNo }, update, { new: true });
  }
}

module.exports = new QueueRepository();
