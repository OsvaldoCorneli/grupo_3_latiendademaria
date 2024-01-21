const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const validacionForm = require('../middlewares/validacionForm') 
const upload = require('../middlewares/multerMid');
const {check, validationResult} = require('express-validator')

router.route('/login')
    .get(users.index)
    .post(validacionForm.login(), users.login);

router.get('/logout', users.logout)

router.route('/register')
    .get(users.getCreateForm)
    .post(upload.any(), validacionForm.registerUser(), users.postCreateForm);

router.get('/restore', users.getRestoreUser);

router.get('/profile', users.profile);

router.get('/:id/update', users.getUpdateForm);
router.put('/:id/update', upload.any(), validacionForm.editUser(), users.putUpdateForm);

module.exports = router
