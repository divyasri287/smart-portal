const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', reportController.getReports);
router.post('/generate', reportController.generateReport);

module.exports = router;
