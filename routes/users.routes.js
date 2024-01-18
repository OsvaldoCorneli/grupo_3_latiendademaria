const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const validacionForm = require('../middlewares/validacionForm') 
const upload = require('../middlewares/multerMid');
const {check, validationResult} = require('express-validator')

router.route('/login')
    .get(users.index)
    .post(validacionForm.login(), users.login);

router.route('/register')
    .get(users.create)
    .post(upload.any(), validacionForm.registerUser(), users.create);

router.get('/restore', users.restore);

router.get('/profile', users.index);

router.get('/:id/update', users.update);
router.put('/:id/update', upload.any(), validacionForm.editUser(), users.update);

module.exports = router
