const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`[${req.method}] ${req.originalUrl} — ${err.message}`);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message    = err.message || 'Internal Server Error';
  let data       = null;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message    = `Invalid ID format: ${err.value}`;
    statusCode = 400;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message    = `Duplicate value for '${field}'. Please use a different value.`;
    statusCode = 409;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    message    = Object.values(err.errors).map((e) => e.message).join(', ');
    statusCode = 422;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError')  { message = 'Invalid token';         statusCode = 401; }
  if (err.name === 'TokenExpiredError')  { message = 'Token has expired';     statusCode = 401; }

  // Expose stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    data = err.stack;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data
  });
};

module.exports = errorHandler;
