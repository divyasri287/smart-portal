const Queue = require('../models/Queue');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getQueueList = async (req, res, next) => {
  try {
    const queue = await Queue.find().sort({ createdAt: 1 });
    return sendSuccess(res, 'Queue list fetched successfully', queue);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const updateQueueStatus = async (req, res, next) => {
  try {
    const { tokenNo, status, bayAssigned } = req.body;
    const update = { status };
    if (bayAssigned) update.bayAssigned = bayAssigned;

    const queueItem = await Queue.findOneAndUpdate({ tokenNo }, update, { new: true });
    return sendSuccess(res, 'Queue status updated successfully', queueItem);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getQueueList,
  updateQueueStatus
};
