const { body } = require('express-validator');

const bookingValidation = [
  body('crop').trim().notEmpty().withMessage('Crop commodity is required'),
  body('estimatedQuantity').isNumeric().withMessage('Estimated quantity must be a number'),
  body('slotDate').notEmpty().withMessage('Slot date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required')
];

module.exports = {
  bookingValidation
};
