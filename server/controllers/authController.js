const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return sendSuccess(res, 'User registered successfully', result, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, mobile, password, role } = req.body;
    const identifier = email || mobile;
    if (!identifier) {
      return sendError(res, 'Email or mobile number is required', 400);
    }
    const result = await authService.loginUser(identifier, password, role);
    return sendSuccess(res, 'Login successful', result);
  } catch (error) {
    return sendError(res, error.message, 401);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return sendError(res, 'Refresh token is required', 400);
    }
    const result = await authService.refreshToken(token);
    return sendSuccess(res, 'Token refreshed successfully', result);
  } catch (error) {
    return sendError(res, error.message, 401);
  }
};

const logout = async (req, res, next) => {
  return sendSuccess(res, 'Logged out successfully');
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    return sendSuccess(res, 'User profile fetched successfully', user);
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe
};
