const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'smart_procurement_sih',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789012345',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abcdefghijklmnopqrstuvwxyz12345'
});

/**
 * Upload buffer or file path to Cloudinary or fallback to data URL / mock URL
 */
const uploadToCloudinary = async (filePath, folder = 'smart_procurement') => {
  try {
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== '123456789012345') {
      const result = await cloudinary.uploader.upload(filePath, { folder });
      return result.secure_url;
    }
  } catch (error) {
    console.warn(`[Cloudinary Warning] Upload fallback active: ${error.message}`);
  }
  // Fallback URL if Cloudinary keys are placeholders
  return `https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80`;
};

module.exports = {
  cloudinary,
  uploadToCloudinary
};
