const express = require('express');
const router = express.Router();
const { users } = require('../controllers');
const { upload, validacionForm } = require('../middlewares');
const {check, validationResult} = require('express-validator')

router.route('/login')
    .get(users.index)
    .post(validacionForm.login(), users.login);

router.route('/register')
    .get(users.create)
    .post(upload.any(), validacionForm.users(), users.create);

router.get('/restore', users.restore)

router.get('/profile', users.index)

router.get('/:id/update', validacionForm.users(), users.update);
router.put('/:id/update', upload.any(), users.update)
;

module.exports = router
