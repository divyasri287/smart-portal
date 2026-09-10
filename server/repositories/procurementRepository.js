const Procurement = require('../models/Procurement');

class ProcurementRepository {
  async findById(id) {
    return await Procurement.findById(id).populate('booking farmer centre officer');
  }

  async findByProcurementId(procurementId) {
    return await Procurement.findOne({ procurementId }).populate('booking farmer centre officer');
  }

  async findByFarmer(farmerId) {
    return await Procurement.find({ farmer: farmerId }).sort({ createdAt: -1 });
  }

  async findAll(query = {}) {
    return await Procurement.find(query).populate('booking farmer centre officer').sort({ createdAt: -1 });
  }

  async create(data) {
    return await Procurement.create(data);
  }

  async update(procurementId, data) {
    return await Procurement.findOneAndUpdate({ procurementId }, data, { new: true });
  }
}

module.exports = new ProcurementRepository();
