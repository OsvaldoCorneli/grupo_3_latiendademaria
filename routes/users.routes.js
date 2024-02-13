const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const validacionForm = require('../middlewares/validacionForm') 
const upload = require('../middlewares/multerMid');
const {check, validationResult} = require('express-validator')

const db = require("../database/models")

router.route('/login')
    .get(users.index)
    .post(validacionForm.login(), users.login);

router.get('/logout', users.logout)

router.get('/probar', async (req , res) =>{
    const user = await db.Users.findAll()

    res.json(user)
})
 
router.route('/register')
    .get(users.getCreateForm)
    .post(upload.any(), validacionForm.registerUser(), users.postCreateForm);

router.get('/restore', users.getRestoreUser);

router.get('/profile', users.profile);

router.get('/:id/update', users.getUpdateForm);
router.put('/:id/update', upload.any(), validacionForm.editUser(), users.putUpdateForm);

module.exports = router
