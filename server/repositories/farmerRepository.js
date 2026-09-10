const Farmer = require('../models/Farmer');

class FarmerRepository {
  async findById(id) {
    return await Farmer.findById(id).populate('user');
  }

  async findByFarmerId(farmerId) {
    return await Farmer.findOne({ farmerId }).populate('user');
  }

  async findByUserId(userId) {
    return await Farmer.findOne({ user: userId });
  }

  async findAll(query = {}) {
    return await Farmer.find(query).populate('user');
  }

  async create(farmerData) {
    return await Farmer.create(farmerData);
  }

  async update(farmerId, updateData) {
    return await Farmer.findOneAndUpdate({ farmerId }, updateData, { new: true });
  }

  async search(searchTerm) {
    return await Farmer.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { farmerId: { $regex: searchTerm, $options: 'i' } },
        { mobile: { $regex: searchTerm, $options: 'i' } },
        { aadhaar: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }
}

module.exports = new FarmerRepository();
