require('dotenv').config();

const app       = require('./app');
const connectDB = require('./config/database');
const logger    = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB (Atlas → local → MongoMemoryServer)
    await connectDB();

    // 2. Auto-seed if the database is empty (runs only once)
    const seedDatabase = require('./seed');
    await seedDatabase(false);

    // 3. Start HTTP listener
    app.listen(PORT, () => {
      logger.info('=======================================================');
      logger.info(' Smart Procurement Portal Backend — SIH 2026');
      logger.info(`   Environment : ${process.env.NODE_ENV || 'development'}`);
      logger.info(`   Port        : ${PORT}`);
      logger.info(`   Root        : http://localhost:${PORT}/`);
      logger.info(`   Health      : http://localhost:${PORT}/health`);
      logger.info(`   API Base    : http://localhost:${PORT}/api/v1`);
      logger.info('=======================================================');
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
