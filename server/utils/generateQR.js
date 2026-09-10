const QRCode = require('qrcode');

/**
 * Generate QR code as Data URL (base64 PNG)
 * @param {string|object} data Payload or string to encode in QR
 */
const generateQRCode = async (data) => {
  try {
    const stringData = typeof data === 'object' ? JSON.stringify(data) : String(data);
    const qrDataUrl = await QRCode.toDataURL(stringData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR Code');
  }
};

module.exports = {
  generateQRCode
};
