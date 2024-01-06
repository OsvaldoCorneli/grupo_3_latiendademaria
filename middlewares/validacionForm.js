const { check, validationResult } = require('express-validator');

const validacionForm = {
    login: function () {
        return [
            check('email')
                .isEmail().withMessage('el correo es invalido'),
            check('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .isLength({min: 6, max: 20}).withMessage('la contraseña debe ser mayor a 6 y menor a 20 caracteres'),
        ]
    },
    register: function () {
        return [
            check('email')
                .isEmail().withMessage('el correo es invalido'),
            check('username')
                .isEmpty().withMessage('Debes completar el nombre')
                .isLength({min: 4}).withMessage('el nombre debe ser mayor a 4 caracteres'),
            check('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .isLength({min: 6}).withMessage('la contraseña debe ser mayor a 6 caracteres'),
            check('fechaNacimiento')
                .isDate().withMessage('ingresar una fecha valida'),
            check('provincia')
                .notEmpty().withMessage('selecciona una provincia'),
            check('codigopostal')
                .isNumeric().withMessage('solo numeros')
                .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            check('calle')
                .notEmpty().withMessage('la calle no puede estar vacia'),
            check('callenumero')
                .isNumeric().withMessage('ingresar el numero de calle'),
            check('imagen')
                .isHexadecimal().withMessage('seleccionar al menos una imagen'),
            check('piso')
                .isAlphanumeric().withMessage('solo numeros y/o letras'),
            check('departamento')
                .isAlphanumeric().withMessage('solo numeros y/o letras'),
        ]
    }
}

module.exports = validacionForm
