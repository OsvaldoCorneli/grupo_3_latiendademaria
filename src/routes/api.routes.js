const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
const isLogged = require('../middlewares/isLogged.js')

router.get('/products', api.products.list);

router.get('/payment', isLogged, api.payments.all);
router.get('/payment/user', isLogged, api.payments.userPayment);
router.get('/payment/:id', isLogged, api.payments.detail);
router.post('/categories', isLogged, api.categories.new);


module.exports = router


