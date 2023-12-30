const express = require('express');
const router = express.Router();
const { users } = require('../controllers');
const { upload } = require('../middlewares');
const { check, validationResult } = require('express-validator');


router.route('/login')
    .get(users.index)
    .post([
        check('email')
            .isEmail().withMessage('el correo es invalido'),
        check('password')
            .notEmpty().withMessage('La contraseña no puede estar en blanco')
            .isLength({min: 6}).withMessage('la contraseña debe ser mayor a 6 caracteres'),
    ], users.login);

router.route('/register')
    .get(users.create)
    .post(upload.any(), [
        check('email')
            .isEmail().withMessage('el correo es invalido'),
        check('username')
            .notEmpty().withMessage('Debes completar el nombre')
            .isLength({min: 4}).withMessage('el nombre debe ser mayor a 4 caracteres'),
        check('password')
            .notEmpty().withMessage('La contraseña no puede estar en blanco')
            .isLength({min: 6}).withMessage('la contraseña debe ser mayor a 6 caracteres'),
        check('fechaNacimiento')
            .isDate().withMessage('ingresar una fecha valida'),
        // "provincia": "Santiago del estero",
        // "localidad": "capital",
        // "codigopostal": 4200,
        // "calle": "tomas edison",
        // "callenumero": 520,
        // "imagen": "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png",
        // "piso": null,
        // "departamento": null,
        // "password": "abc123"
    ], users.create);

router.get('/restore', users.restore)

router.get('/profile', users.index)

router.get('/:id/update', users.update);
router.put('/:id/update', upload.any(), users.update)
;

module.exports = router
