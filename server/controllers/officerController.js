const officerService = require('../services/officerService');
const farmerRepository = require('../repositories/farmerRepository');
const { sendSuccess, sendError } = require('../utils/responseFormatter');
const { uploadToCloudinary } = require('../config/cloudinary');

const getTodayQueue = async (req, res, next) => {
  try {
    const queue = await officerService.getTodayQueue(req.query.centreId);
    return sendSuccess(res, "Today's queue fetched successfully", queue);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const searchFarmer = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      const allFarmers = await farmerRepository.findAll();
      return sendSuccess(res, 'Farmers fetched successfully', allFarmers);
    }
    const farmers = await farmerRepository.search(query);
    return sendSuccess(res, 'Farmers matching search query', farmers);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const verifyFarmer = async (req, res, next) => {
  try {
    const { farmerId } = req.body;
    const farmer = await farmerRepository.findByFarmerId(farmerId) || await farmerRepository.findById(farmerId);
    if (!farmer) {
      return sendError(res, 'Farmer record not found', 404);
    }
    return sendSuccess(res, 'Farmer verified successfully', {
      isVerified: true,
      farmer
    });
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const updateQuality = async (req, res, next) => {
  try {
    const result = await officerService.submitQualityCheck(req.body);
    return sendSuccess(res, 'Quality assessment submitted successfully', result);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const updateWeight = async (req, res, next) => {
  try {
    const result = await officerService.submitWeighment(req.body);
    return sendSuccess(res, 'Weight entry and procurement recorded successfully', result);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const approveProcurement = async (req, res, next) => {
  try {
    const result = await officerService.submitWeighment(req.body);
    return sendSuccess(res, 'Procurement approved & payment initiated', result);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const uploadInspectionImages = async (req, res, next) => {
  try {
    const files = req.files || [];
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file.path);
      imageUrls.push(url);
    }
    return sendSuccess(res, 'Images uploaded successfully', { imageUrls });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

module.exports = {
  getTodayQueue,
  searchFarmer,
  verifyFarmer,
  updateQuality,
  updateWeight,
  approveProcurement,
  uploadInspectionImages
};
