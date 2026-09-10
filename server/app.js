require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const path     = require('path');
const mongoose = require('mongoose');

const requestLogger = require('./middleware/logger');
const errorHandler  = require('./middleware/errorHandler');
const notFound      = require('./middleware/notFound');
const { apiLimiter } = require('./middleware/rateLimiter');

// Central API v1 router (handles /api/v1 and all sub-routes)
const v1Router = require('./routes/index');

const app = express();

// ─────────────────────────────────────────────
// 1. SECURITY HEADERS
// ─────────────────────────────────────────────
app.use(helmet());

// ─────────────────────────────────────────────
// 2. CORS
// ─────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ─────────────────────────────────────────────
// 3. BODY PARSERS
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─────────────────────────────────────────────
// 4. REQUEST LOGGER (Morgan → Winston)
// ─────────────────────────────────────────────
app.use(requestLogger);

// ─────────────────────────────────────────────
// 5. RATE LIMITER
// ─────────────────────────────────────────────
app.use('/api', apiLimiter);

// ─────────────────────────────────────────────
// 6. STATIC FILES
// ─────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─────────────────────────────────────────────
// 7. ROOT ENDPOINT  GET /
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Procurement Portal API Server (SIH 2026)',
    version: '1.0.0',
    apiBase: '/api/v1',
    docs:    '/api/v1'
  });
});

// ─────────────────────────────────────────────
// 8. HEALTH ENDPOINT  GET /health
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  const dbState  = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'Connected' : dbState === 2 ? 'Connecting' : 'Disconnected';

  res.status(200).json({
    success:   true,
    database:  dbStatus,
    server:    'Running',
    timestamp: new Date().toISOString()
  });
});

// ─────────────────────────────────────────────
// 9. ALL API v1 ROUTES  mounted at /api/v1
//    GET /api/v1            → index
//    GET /api/v1/health     → health
//    /api/v1/auth           → authRoutes
//    /api/v1/farmer         → farmerRoutes
//    /api/v1/officer        → officerRoutes
//    /api/v1/manager        → managerRoutes
//    /api/v1/admin          → adminRoutes
//    /api/v1/bookings       → bookingRoutes
//    /api/v1/payments       → paymentRoutes
//    /api/v1/queue          → queueRoutes
//    /api/v1/reports        → reportRoutes
//    /api/v1/qr             → qrRoutes
// ─────────────────────────────────────────────
app.use('/api/v1', v1Router);

// ─────────────────────────────────────────────
// 10. 404 HANDLER  (must be after all routes)
// ─────────────────────────────────────────────
app.use(notFound);

// ─────────────────────────────────────────────
// 11. GLOBAL ERROR HANDLER (must be last)
// ─────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
