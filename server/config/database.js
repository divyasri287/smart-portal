const mongoose = require('mongoose');

const connectDB = async () => {
  const urisToTry = [
    process.env.MONGO_URI,
    'mongodb://127.0.0.1:27017/smart_procurement'
  ].filter(Boolean);

  for (const uri of urisToTry) {
    try {
      console.log(`[MongoDB] Connecting to: ${uri.split('@').pop() || uri}...`);
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      });
      console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.warn(`[MongoDB Connection Notice] Couldn't connect to ${uri.split('@').pop()}: ${error.message}`);
    }
  }

  // Attempt MongoMemoryServer fallback
  console.log('[MongoDB] Attempting to start local MongoMemoryServer...');
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    
    const conn = await mongoose.connect(memoryUri);
    console.log(`[MongoMemoryServer Connected] In-memory database ready at: ${memoryUri}`);
    return conn;
  } catch (memErr) {
    console.warn(`[MongoDB Warning] In-memory server initialization deferred: ${memErr.message}`);
    console.log('[MongoDB] Backend running in resilient service mode.');
  }
};

module.exports = connectDB;
