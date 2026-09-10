require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const { generateQRCode } = require('./utils/generateQR');

// Models
const User = require('./models/User');
const Farmer = require('./models/Farmer');
const Centre = require('./models/Centre');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');
const Queue = require('./models/Queue');
const Procurement = require('./models/Procurement');
const Payment = require('./models/Payment');
const Notification = require('./models/Notification');
const Report = require('./models/Report');
const AuditLog = require('./models/AuditLog');

const seedDatabase = async (forceClear = true) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }

    if (mongoose.connection.readyState !== 1) {
      console.warn('[Seeder Warning] Database connection is not ready. Skipping database seeding.');
      return;
    }

    const userCount = await User.countDocuments().catch(() => 0);
    if (!forceClear && userCount > 0) {
      console.log('[Seeder] Database already populated. Skipping seeder.');
      return;
    }

    console.log('[Seeder] Seeding database with initial data...');

    if (forceClear) {
      await Promise.all([
        User.deleteMany({}),
        Farmer.deleteMany({}),
        Centre.deleteMany({}),
        Slot.deleteMany({}),
        Booking.deleteMany({}),
        Queue.deleteMany({}),
        Procurement.deleteMany({}),
        Payment.deleteMany({}),
        Notification.deleteMany({}),
        Report.deleteMany({}),
        AuditLog.deleteMany({})
      ]);
    }

    // 1. Create Users
    const users = await User.create([
      {
        name: 'Ramesh Singh',
        email: 'ramesh.farmer@smartprocurement.gov.in',
        mobile: '+91 98765 43210',
        password: 'password123',
        role: 'Farmer',
        district: 'Ludhiana',
        state: 'Punjab'
      },
      {
        name: 'Sukhwinder Kaur',
        email: 'sukhwinder.farmer@smartprocurement.gov.in',
        mobile: '+91 98123 45678',
        password: 'password123',
        role: 'Farmer',
        district: 'Patiala',
        state: 'Punjab'
      },
      {
        name: 'Inspector Rajesh Kumar',
        email: 'officer.ludhiana@smartprocurement.gov.in',
        mobile: '+91 98999 11122',
        password: 'password123',
        role: 'Procurement Officer',
        district: 'Ludhiana',
        state: 'Punjab'
      },
      {
        name: 'Manjit Singh',
        email: 'manager.centre4@smartprocurement.gov.in',
        mobile: '+91 98888 33344',
        password: 'password123',
        role: 'Centre Manager',
        district: 'Ludhiana',
        state: 'Punjab'
      },
      {
        name: 'Dr. Anita Verma',
        email: 'admin.gov@smartprocurement.gov.in',
        mobile: '+91 98777 55566',
        password: 'password123',
        role: 'Government Admin',
        district: 'Chandigarh',
        state: 'Punjab'
      }
    ]);

    const farmerUser1 = users[0];
    const farmerUser2 = users[1];
    const officerUser = users[2];
    const managerUser = users[3];
    const adminUser = users[4];

    // 2. Create Farmers
    const farmers = await Farmer.create([
      {
        farmerId: 'FRM-1001',
        user: farmerUser1._id,
        name: 'Ramesh Singh',
        aadhaar: 'XXXX-XXXX-8912',
        mobile: '+91 98765 43210',
        cropType: 'Paddy (Grade A)',
        acreage: 12.5,
        district: 'Ludhiana',
        state: 'Punjab',
        bankAccount: 'SBIN0001234 - xxxx5678',
        bankIFSC: 'SBIN0001234',
        landRecordNo: 'LR-2026-9011'
      },
      {
        farmerId: 'FRM-1002',
        user: farmerUser2._id,
        name: 'Sukhwinder Kaur',
        aadhaar: 'XXXX-XXXX-4421',
        mobile: '+91 98123 45678',
        cropType: 'Wheat',
        acreage: 8.0,
        district: 'Patiala',
        state: 'Punjab',
        bankAccount: 'HDFC0004321 - xxxx9012',
        bankIFSC: 'HDFC0004321',
        landRecordNo: 'LR-2026-9012'
      }
    ]);

    // 3. Create Centre
    const centre = await Centre.create({
      centreCode: 'PB-LDH-004',
      name: 'Ludhiana Mandi Centre 4',
      district: 'Ludhiana',
      state: 'Punjab',
      address: 'GT Road, Near Grain Market, Ludhiana, Punjab 141001',
      capacityQuintals: 15000,
      activeBays: 4,
      operatingHours: '08:00 AM - 06:00 PM',
      contactNumber: '+91 161 2456789',
      manager: managerUser._id
    });

    // 4. Create Slots
    await Slot.create([
      {
        centre: centre._id,
        date: '2026-09-02',
        timeSlot: '09:00 AM - 11:00 AM',
        maxCapacity: 50,
        bookedCount: 1,
        isAvailable: true
      },
      {
        centre: centre._id,
        date: '2026-09-02',
        timeSlot: '11:00 AM - 01:00 PM',
        maxCapacity: 50,
        bookedCount: 1,
        isAvailable: true
      }
    ]);

    // 5. Create QR codes & Bookings
    const qr1 = await generateQRCode({ bookingId: 'BK-2026-001', tokenId: 'TKN-A901', farmerName: 'Ramesh Singh' });
    const qr2 = await generateQRCode({ bookingId: 'BK-2026-002', tokenId: 'TKN-A902', farmerName: 'Sukhwinder Kaur' });

    const bookings = await Booking.create([
      {
        bookingId: 'BK-2026-001',
        tokenId: 'TKN-A901',
        farmer: farmers[0]._id,
        farmerName: farmers[0].name,
        farmerId: farmers[0].farmerId,
        centre: centre._id,
        centreName: centre.name,
        slotDate: '2026-09-02',
        timeSlot: '09:00 AM - 11:00 AM',
        estimatedQuantity: 150,
        crop: 'Paddy (Grade A)',
        vehicleNo: 'PB-10-CZ-4419',
        status: 'Procurement Completed',
        qrCodeUrl: qr1
      },
      {
        bookingId: 'BK-2026-002',
        tokenId: 'TKN-A902',
        farmer: farmers[1]._id,
        farmerName: farmers[1].name,
        farmerId: farmers[1].farmerId,
        centre: centre._id,
        centreName: centre.name,
        slotDate: '2026-09-02',
        timeSlot: '11:00 AM - 01:00 PM',
        estimatedQuantity: 100,
        crop: 'Wheat',
        vehicleNo: 'PB-11-AB-1290',
        status: 'In Queue',
        qrCodeUrl: qr2
      }
    ]);

    // 6. Create Queue
    await Queue.create([
      {
        tokenNo: 'TKN-A901',
        booking: bookings[0]._id,
        farmer: farmers[0]._id,
        farmerName: farmers[0].name,
        centre: centre._id,
        vehicleNo: 'PB-10-CZ-4419',
        commodity: 'Paddy Grade A',
        gateEntryTime: '08:45 AM',
        status: 'Completed',
        bayAssigned: 'Bay 3'
      },
      {
        tokenNo: 'TKN-A902',
        booking: bookings[1]._id,
        farmer: farmers[1]._id,
        farmerName: farmers[1].name,
        centre: centre._id,
        vehicleNo: 'PB-11-AB-1290',
        commodity: 'Wheat',
        gateEntryTime: '09:15 AM',
        status: 'In Queue',
        bayAssigned: 'Bay 1'
      }
    ]);

    // 7. Create Procurement
    const procurement = await Procurement.create({
      procurementId: 'PRC-2026-001',
      booking: bookings[0]._id,
      farmer: farmers[0]._id,
      centre: centre._id,
      officer: officerUser._id,
      commodity: 'Paddy (Grade A)',
      grossWeight: 150,
      tareWeight: 10,
      netWeight: 140,
      moistureLevel: 12.5,
      foreignMatter: 0.4,
      qualityGrade: 'Grade A',
      ratePerQuintal: 2300,
      totalAmount: 322000,
      status: 'Approved',
      receiptUrl: 'https://smartprocurement.gov.in/receipts/PRC-2026-001.pdf'
    });

    // 8. Create Payments
    await Payment.create([
      {
        paymentId: 'PAY-882109',
        procurement: procurement._id,
        farmer: farmers[0]._id,
        farmerName: farmers[0].name,
        quantityQuintals: 140,
        mspPerQuintal: 2300,
        totalAmount: 322000,
        bankRefNo: 'DBT-2026-990123',
        disbursementDate: '2026-08-28',
        status: 'DBT Credited'
      },
      {
        paymentId: 'PAY-882110',
        procurement: procurement._id,
        farmer: farmers[1]._id,
        farmerName: farmers[1].name,
        quantityQuintals: 95,
        mspPerQuintal: 2300,
        totalAmount: 218500,
        bankRefNo: 'DBT-2026-990124',
        disbursementDate: '2026-08-29',
        status: 'Pending Processing'
      }
    ]);

    // 9. Create Notifications
    await Notification.create([
      {
        recipient: farmerUser1._id,
        farmer: farmers[0]._id,
        title: 'Booking Confirmed',
        message: 'Your slot BK-2026-001 for Paddy Grade A on 2026-09-02 has been confirmed.',
        channel: 'SMS',
        status: 'Sent'
      },
      {
        recipient: farmerUser1._id,
        farmer: farmers[0]._id,
        title: 'DBT Credited',
        message: 'Payment of ₹3,22,000 has been credited to your bank account ref: DBT-2026-990123.',
        channel: 'SMS',
        status: 'Sent'
      }
    ]);

    // 10. Create Reports
    await Report.create([
      {
        reportId: 'RPT-2026-01',
        title: 'Daily Procurement Summary - Ludhiana',
        type: 'Daily',
        state: 'Punjab',
        district: 'Ludhiana',
        data: { totalQuantityMT: 345, totalDBTAmount: 7935000, farmersServed: 28 },
        generatedBy: managerUser._id,
        fileUrl: 'https://smartprocurement.gov.in/reports/RPT-2026-01.pdf'
      }
    ]);

    // 11. Create AuditLog
    await AuditLog.create([
      {
        user: officerUser._id,
        action: 'Weighment Entry',
        module: 'Officer Module',
        description: 'Verified 140 Quintals Paddy Grade A for Farmer Ramesh Singh (FRM-1001)'
      }
    ]);

    console.log('[Seeder] Database seeded successfully with mock data!');
  } catch (error) {
    console.error('[Seeder Error] Failed to seed database:', error);
  }
};

if (require.main === module) {
  seedDatabase(true).then(() => {
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
    process.exit(0);
  });
}

module.exports = seedDatabase;
