const express = require('express')
const router = express.Router()
const { getAll, getStats, create, remove } = require('../controllers/studentController')
const { studentValidationRules, validate } = require('../utils/validate')
const protect = require('../middleware/auth')

router.get('/', getAll)
router.get('/stats', getStats)
router.post('/', protect, studentValidationRules, validate, create)
router.delete('/:id', protect, remove)

module.exports = router