/**
 * SMS Notification Utility (Twilio Placeholder)
 */
const sendSMS = async (phoneNumber, message) => {
  console.log(`[SMS Sent] To: ${phoneNumber} | Message: "${message}"`);
  return {
    success: true,
    messageId: `SMS-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Delivered'
  };
};

module.exports = {
  sendSMS
};
