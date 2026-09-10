/**
 * Push Notification Utility Placeholder
 */
const sendPushNotification = async (userId, title, body) => {
  console.log(`[Push Notification Sent] User: ${userId} | Title: "${title}" | Body: "${body}"`);
  return {
    success: true,
    notificationId: `PUSH-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Delivered'
  };
};

module.exports = {
  sendPushNotification
};
