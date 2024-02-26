const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');

router.get('/products', api.products.list);

router.get('/payment', api.payments.all);
router.get('/payment/user', api.payments.userPayment);
router.get('/payment/:id', api.payments.detail);
router.post('/categories', api.categories.new);


module.exports = router


