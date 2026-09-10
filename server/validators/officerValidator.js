const { body } = require('express-validator');

const qualityValidation = [
  body('moistureLevel').isNumeric().withMessage('Moisture level must be a number'),
  body('qualityGrade').notEmpty().withMessage('Quality grade is required')
];

const weighmentValidation = [
  body('grossWeight').isNumeric().withMessage('Gross weight must be a number'),
  body('netWeight').isNumeric().withMessage('Net weight must be a number')
];

module.exports = {
  qualityValidation,
  weighmentValidation
};
