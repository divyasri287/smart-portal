const Report = require('../models/Report');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Reports fetched successfully', reports);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const generateReport = async (req, res, next) => {
  try {
    const reportCount = await Report.countDocuments();
    const reportId = `RPT-2026-${String(reportCount + 1).padStart(2, '0')}`;

    const report = await Report.create({
      reportId,
      title: req.body.title || 'Daily Procurement Summary Report',
      type: req.body.type || 'Daily',
      state: req.body.state || 'Punjab',
      district: req.body.district || 'Ludhiana',
      data: req.body.data || { totalProcuredQuintals: 3450, totalDisbursedINR: 7935000 },
      fileUrl: `https://smartprocurement.gov.in/reports/${reportId}.pdf`
    });

    return sendSuccess(res, 'Report generated successfully', report, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getReports,
  generateReport
};
