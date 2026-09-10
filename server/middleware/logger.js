const morgan = require('morgan');
const logger = require('../utils/logger');

const morganStream = {
  write: (message) => logger.info(message.trim())
};

const requestLogger = morgan(
  ':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
  { stream: morganStream }
);

module.exports = requestLogger;
