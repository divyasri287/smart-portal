const adminService = require('../services/adminService');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getDashboard = async (req, res, next) => {
  try {
    const analytics = await adminService.getStateAnalytics();
    return sendSuccess(res, 'Government Admin dashboard analytics fetched successfully', analytics);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return sendSuccess(res, 'Users list fetched successfully', users);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    const user = await adminService.manageUserRole(userId, role);
    return sendSuccess(res, 'User role updated successfully', user);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getDashboard,
  getUsers,
  updateUserRole
};
