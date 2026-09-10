const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const paymentController = require('../controllers/paymentController');
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.get('/national-dashboard', adminController.getDashboard);
router.get('/state-dashboard', adminController.getDashboard);
router.get('/district-dashboard', adminController.getDashboard);
router.get('/centre-dashboard', adminController.getDashboard);
router.get('/payment-dashboard', paymentController.getPayments);
router.get('/analytics', adminController.getDashboard);
router.get('/reports', reportController.getReports);
router.get('/users', adminController.getUsers);
router.put('/users/role', adminController.updateUserRole);

module.exports = router;
