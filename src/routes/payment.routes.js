const express = require('express')
const router = express.Router()
const payment = require('../controllers/payment')

router.get('/', payment.all)
router.get('/:id', payment.detail)

module.exports = router