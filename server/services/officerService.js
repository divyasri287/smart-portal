const Procurement = require('../models/Procurement');
const Booking = require('../models/Booking');
const Queue = require('../models/Queue');
const Payment = require('../models/Payment');
const Farmer = require('../models/Farmer');
const Centre = require('../models/Centre');
const { MSP_RATES } = require('../utils/constants');

class OfficerService {
  async getTodayQueue(centreId) {
    const query = centreId ? { centre: centreId } : {};
    return await Queue.find(query).populate('booking farmer centre').sort({ createdAt: 1 });
  }

  async submitQualityCheck(payload) {
    const { tokenId, bookingId, moistureLevel, foreignMatter, qualityGrade, comments } = payload;

    const booking = await Booking.findOne({
      $or: [{ tokenId }, { bookingId }]
    });

    if (booking) {
      booking.status = 'Quality Verified';
      await booking.save();
    }

    if (tokenId) {
      await Queue.findOneAndUpdate({ tokenNo: tokenId }, { status: 'Quality Verified' });
    }

    return {
      success: true,
      tokenId: tokenId || booking?.tokenId,
      qualityGrade: qualityGrade || 'Grade A',
      moistureLevel: moistureLevel || 12.0,
      foreignMatter: foreignMatter || 0.5,
      status: 'Quality Verified'
    };
  }

  async submitWeighment(payload) {
    const { tokenId, bookingId, grossWeight, tareWeight, netWeight, commodity } = payload;

    const booking = await Booking.findOne({
      $or: [{ tokenId }, { bookingId }]
    }).populate('farmer centre');

    let farmer = booking?.farmer;
    if (!farmer && payload.farmerId) {
      farmer = await Farmer.findOne({ farmerId: payload.farmerId });
    }
    if (!farmer) {
      farmer = await Farmer.findOne();
    }

    const calculatedNetWeight = netWeight || (grossWeight && tareWeight ? grossWeight - tareWeight : grossWeight || 140);
    const cropName = commodity || booking?.crop || 'Paddy (Grade A)';
    const ratePerQuintal = MSP_RATES[cropName] || 2300;
    const totalAmount = calculatedNetWeight * ratePerQuintal;

    const procCount = await Procurement.countDocuments();
    const procurementId = `PRC-2026-${String(procCount + 1).padStart(3, '0')}`;

    const procurement = await Procurement.create({
      procurementId,
      booking: booking?._id || '65e000000000000000000002',
      farmer: farmer._id,
      centre: booking?.centre || '65e000000000000000000001',
      commodity: cropName,
      grossWeight: grossWeight || 150,
      tareWeight: tareWeight || 10,
      netWeight: calculatedNetWeight,
      moistureLevel: payload.moistureLevel || 12.0,
      foreignMatter: payload.foreignMatter || 0.5,
      qualityGrade: payload.qualityGrade || 'Grade A',
      ratePerQuintal,
      totalAmount,
      status: 'Approved',
      receiptUrl: `https://smartprocurement.gov.in/receipts/${procurementId}.pdf`
    });

    if (booking) {
      booking.status = 'Procurement Completed';
      await booking.save();
    }

    if (tokenId || booking?.tokenId) {
      await Queue.findOneAndUpdate({ tokenNo: tokenId || booking?.tokenId }, { status: 'Completed' });
    }

    // Automatically trigger Payment creation
    const payCount = await Payment.countDocuments();
    const paymentId = `PAY-${882109 + payCount}`;
    const bankRefNo = `DBT-2026-${990123 + payCount}`;

    await Payment.create({
      paymentId,
      procurement: procurement._id,
      farmer: farmer._id,
      farmerName: farmer.name,
      quantityQuintals: calculatedNetWeight,
      mspPerQuintal: ratePerQuintal,
      totalAmount,
      bankRefNo,
      status: 'DBT Credited',
      disbursementDate: new Date().toISOString().split('T')[0]
    });

    return procurement;
  }
}

module.exports = new OfficerService();
