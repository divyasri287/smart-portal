const Centre = require('../models/Centre');

class CentreRepository {
  async findById(id) {
    return await Centre.findById(id).populate('manager');
  }

  async findByCode(centreCode) {
    return await Centre.findOne({ centreCode }).populate('manager');
  }

  async findAll(query = {}) {
    return await Centre.find(query).populate('manager');
  }

  async create(data) {
    return await Centre.create(data);
  }

  async update(centreCode, updateData) {
    return await Centre.findOneAndUpdate({ centreCode }, updateData, { new: true });
  }
}

module.exports = new CentreRepository();
