const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
const isLogged = require('../middlewares/isLogged.js')

router.get('/products', api.products.list);

router.get('/payment', isLogged, api.payments.all);
router.post('/payment', isLogged, api.payments.new);
router.put('/payment', isLogged, api.payments.update);
router.get('/payment/user', isLogged, api.payments.userPayment);
router.get('/payment/:id', isLogged, api.payments.detail);
router.post('/categories', isLogged, api.categories.new);
router.get('/user/favorites', api.favorites.user);
router.post('/user/favorites', api.favorites.add);
// router.get('/products', api.products.list);
// router.get('/products/:id', api.products.detail);


module.exports = router