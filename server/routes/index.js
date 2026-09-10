const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes    = require('./authRoutes');
const farmerRoutes  = require('./farmerRoutes');
const officerRoutes = require('./officerRoutes');
const managerRoutes = require('./managerRoutes');
const adminRoutes   = require('./adminRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const queueRoutes   = require('./queueRoutes');
const reportRoutes  = require('./reportRoutes');
const qrRoutes      = require('./qrRoutes');

// GET /api/v1  — API index with all available endpoints
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Procurement Portal API Running Successfully',
    version: 'v1',
    endpoints: {
      auth:     '/api/v1/auth',
      farmer:   '/api/v1/farmer',
      officer:  '/api/v1/officer',
      manager:  '/api/v1/manager',
      admin:    '/api/v1/admin',
      bookings: '/api/v1/bookings',
      payments: '/api/v1/payments',
      queue:    '/api/v1/queue',
      reports:  '/api/v1/reports',
      qr:       '/api/v1/qr',
      health:   '/api/v1/health'
    }
  });
});

// GET /api/v1/health — module-level health check
router.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbState  = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'Connected' : dbState === 2 ? 'Connecting' : 'Disconnected';

  res.status(200).json({
    success:   true,
    database:  dbStatus,
    server:    'Running',
    timestamp: new Date().toISOString()
  });
});

// Mount sub-routers
router.use('/auth',     authRoutes);
router.use('/farmer',   farmerRoutes);
router.use('/officer',  officerRoutes);
router.use('/manager',  managerRoutes);
router.use('/admin',    adminRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/queue',    queueRoutes);
router.use('/reports',  reportRoutes);
router.use('/qr',       qrRoutes);

// Convenience aliases
router.use('/book-slot',   bookingRoutes);
router.use('/queue-list',  queueRoutes);

module.exports = router;
