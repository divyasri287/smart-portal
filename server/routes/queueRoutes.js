const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', queueController.getQueueList);
router.put('/status', queueController.updateQueueStatus);

module.exports = router;
