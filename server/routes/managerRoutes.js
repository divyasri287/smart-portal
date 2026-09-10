const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const queueController = require('../controllers/queueController');
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.get('/dashboard', managerController.getDashboard);
router.get('/queue-monitoring', queueController.getQueueList);
router.post('/slot-management', managerController.allocateSlots);
router.get('/daily-reports', reportController.getReports);
router.get('/centre-statistics', managerController.getDashboard);

module.exports = router;
