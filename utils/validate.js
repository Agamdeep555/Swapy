const { body, validationResult } = require('express-validator')

const studentValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('hostel').trim().notEmpty().withMessage('Hostel is required'),
  body('roomNumber').trim().notEmpty().withMessage('Room number is required'),
  body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
]

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

module.exports = { studentValidationRules, validate }