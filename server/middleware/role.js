const { sendError } = require('../utils/responseFormatter');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'User not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `User role '${req.user.role}' is not authorized to access this route. Allowed roles: ${roles.join(', ')}`,
        403
      );
    }

    next();
  };
};

module.exports = { authorize };
