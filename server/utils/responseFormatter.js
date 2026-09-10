/**
 * Standard API Response Formatter
 * Format: { success: boolean, message: string, data: any }
 */

const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data
  });
};

const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message = 'Error occurred', statusCode = 400, data = null) => {
  return sendResponse(res, statusCode, false, message, data);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError
};
