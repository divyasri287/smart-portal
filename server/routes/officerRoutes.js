const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const upload = require('../middleware/upload');

router.post('/login', authController.login);

router.use(protect);

router.get('/today-queue', officerController.getTodayQueue);
router.get('/search-farmer', officerController.searchFarmer);
router.post('/verify-farmer', officerController.verifyFarmer);

router.post('/update-quality', officerController.updateQuality);
router.post('/update-weight', officerController.updateWeight);
router.post('/approve-procurement', officerController.approveProcurement);
router.post('/upload-images', upload.array('images', 5), officerController.uploadInspectionImages);

module.exports = router;
