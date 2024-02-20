const express = require('express')
const router = express.Router()
const main = require('../controllers/main')
const payment = require('../controllers/payment')

router.get('/', payment.all)
router.get('/:id', payment.detail)

module.exports = router