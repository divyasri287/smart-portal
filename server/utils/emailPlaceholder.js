/**
 * Email Notification Utility (Nodemailer Placeholder)
 */
const sendEmail = async (toEmail, subject, htmlBody) => {
  console.log(`[Email Sent] To: ${toEmail} | Subject: "${subject}"`);
  return {
    success: true,
    messageId: `MAIL-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Sent'
  };
};

module.exports = {
  sendEmail
};
