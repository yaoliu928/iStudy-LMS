const mongoose = require('mongoose');
const config = require('../../config');
const getLogger = require('../logger');

const logger = getLogger(__filename);

const connectToDb = async () => {
  const db = mongoose.connection;
  db.on('error', (error) => {
    logger.error(error);
    throw new Error(error);
  });
  db.on('connected', () => {
    logger.info('DB connected');
  });
  db.on('disconnected', () => {
    logger.warn('DB disconnected');
  });
  console.log('DB', config.DB_CONNECTION_STRING);
  return mongoose.connect(config.DB_CONNECTION_STRING);
};

module.exports = connectToDb;