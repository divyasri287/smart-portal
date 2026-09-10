const { validationResult } = require('express-validator');
const { sendError } = require('../utils/responseFormatter');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(
      res,
      'Validation Error',
      400,
      errors.array().map((err) => ({ field: err.path, message: err.msg }))
    );
  }
  next();
};

module.exports = { validate };
