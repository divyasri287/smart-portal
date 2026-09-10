const managerService = require('../services/managerService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getDashboard = async (req, res, next) => {
  try {
    const status = await managerService.getCentreStatus();
    return sendSuccess(res, 'Manager dashboard statistics fetched successfully', status);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const allocateSlots = async (req, res, next) => {
  try {
    const result = await managerService.allocateSlots(req.body);
    return sendSuccess(res, 'Slots allocated successfully', result);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getDashboard,
  allocateSlots
};
