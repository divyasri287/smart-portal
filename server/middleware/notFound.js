const { sendError } = require('../utils/responseFormatter');

const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Route Not Found — ${req.method} ${req.originalUrl}`,
    hint: 'Check GET /api/v1 for a list of all available endpoints.',
    data: null
  });
};

module.exports = notFound;
