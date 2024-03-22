const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
const isLogged = require('../middlewares/isLogged.js')
const isAdmin = require('../middlewares/isAdmin.js')
const forRegister = require('../middlewares/forRegister.js')

router.get('/products', api.products.list);
router.get('/users', forRegister, api.users.all);
router.get('/payment', isLogged, api.payments.all);
router.post('/payment', isAdmin, api.payments.new);
router.put('/payment', isAdmin, api.payments.update);
router.get('/payment/user', isLogged, api.payments.userPayment);
router.get('/payment/:id', isLogged, api.payments.detail);
router.post('/categories', isAdmin, api.categories.new);
router.get('/user/favorites', api.favorites.user);
router.post('/user/favorites', isLogged, api.favorites.add);
//router.get('/colors', isLogged, api.colors.list)
// router.get('/products', api.products.list);
// router.get('/products/:id', api.products.detail);


module.exports = router