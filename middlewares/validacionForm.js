const { body, validationResult } = require('express-validator');
const users = require('../models/user');
const Category = require('../data/category.json');
const bcrypt = require('bcryptjs');
const path = require('path');

module.exports = {
    login: function () {
        return [
            body('email')
                .notEmpty().withMessage('Ingresar Usuario o email registrado')
                .custom((value) => {
                    const user = users.index().find((u) => u.username == value || u.email == value)
                    if (!user) {
                        throw new Error('usuario o email no registrados')
                    } else return true
                }),
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .custom((value,{req}) => {
                    const user = users.index().find((u) => u.username == req.body.email || u.email == req.body.email)
                    if (user) {
                        const checkPass = bcrypt.compareSync(value, user.password)
                        if (checkPass) {
                            return true
                        } else {
                            throw new Error('Contraseña incorrecta')
                        }
                    } else {
                        throw new Error('Verificar Usuario')
                    }
                }
            )
        ]
    },
    registerUser: function () {
        return [
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .isLength({min: 6}).withMessage('la contraseña debe ser mayor a 6 caracteres'),
            body('repassword').custom((value, {req}) => {
                return value === req.body.password
            }).withMessage('las contraseñas no coinciden'),
            body('username')
                .notEmpty().withMessage('Debes completar el nombre')
                .isLength({min: 4, max: 20}).withMessage('el nombre debe ser mayor a 4 caracteres y menor a 20')
                .custom((value) => {
                    const userEmail = users.index().some((user) => user.username == value)
                    if (userEmail) {
                        throw new Error('El nombre de usuario ya esta en uso')
                    } else return true
                }),
            body('email')
                .isEmail().withMessage('email no valido')
                .custom((value,{req}) => {
                    const anotherUserWithSameEmail = users.index().some((user) => user.email == value)
                    if (anotherUserWithSameEmail) {
                        throw new Error('El email ya esta en uso')
                    } else return true
                }),
            body('fechanacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            body('provincia')
                .notEmpty().withMessage('selecciona una provincia'),
            body('codigopostal')
                .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
                .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            body('calle')
                .isLength({min: 3, max:30}) 
                .notEmpty().withMessage('la calle no puede estar vacia'),
            body('callenumero')
                .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle'),
            body('imagen')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    const extNames = ['.jpg', '.png', '.jpeg']
                    if (!extensionName.some((ext) => extNames.includes(ext)) && req.files.length > 0) {
                        throw new Error(`solo se admiten archivos ${extNames.join(', ')}`)
                    } else return true
                }),
            body('piso')
                .isLength({max:10}),
                //.isAlphanumeric().withMessage('solo numeros y/o letras'),
            body('departamento')
                .isLength({max:10}),
                //.isAlphanumeric().withMessage('solo numeros y/o letras'),
        ]
    },
    editUser: function () {
        return [
            body('email')
                .isEmail().withMessage('email invalido')
                .custom((value,{req}) => {
                    const anotherUserWithSameEmail = users.index().some((user) => user.id != req.params.id && user.email == value)
                    if (anotherUserWithSameEmail) {
                        throw new Error('El email ya esta en uso')
                    } else return true
                }),
            body('fechanacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            body('provincia')
                .notEmpty().withMessage('selecciona una provincia'),
            body('localidad')
                .notEmpty().withMessage('selecciona una localidad'),
            body('codigopostal')
                .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
                .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            body('calle')
                .isLength({min: 3, max:30})
                .notEmpty().withMessage('la calle no puede estar vacia'),
            body('callenumero')
                .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle'),
            body('imagen')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    const extNames = ['.jpg', '.png', '.jpeg']
                    if (!extensionName.some((ext) => extNames.includes(ext))) {
                        throw new Error(`solo se admiten archivos ${extNames.join(', ')}`)
                    } else return true
                }),
            body('piso', 'no puede superar 10 caracteres')
                .isLength({max:10}),
            body('departamento', 'no puede superar 10 caracteres')
                .isLength({max:10}) 
        ]
    },
    formProducto: function () {
        return [
            body('name')
                .notEmpty().withMessage('completar el nombre')
                .isLength({min: 4, max:50}).withMessage('el nombre debe ser entre 4 a 50 caracteres'),
            body('description')
                .notEmpty().withMessage('no puede estar vacio')
                .isLength({max: 256}).withMessage('Maximo 256 caracteres'),
            body('image')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    const extNames = ['.jpg', '.png', '.jpeg']
                    if (!extensionName.some((ext) => extNames.includes(ext))) {
                        throw new Error(`solo se admiten archivos ${extNames.join(', ')}`)
                    } else return true
                }),
            body('line')
                .custom(value => {return value == 'artesanal' || value == 'sublimada'}).withMessage('Campo Categoria inexistente'),
            body('category')
                .custom(value => {return Category.some(c => c.name == value)}).withMessage('Campo linea inexistente'),
            body('color.*')
                .isHexColor().withMessage('Solo se admite color con valor hexadecimal'),
            body('price')
                .notEmpty()
                .isDecimal().withMessage('Debe ser un numero con 2 decimales maximo'),
            body('stock')
                .notEmpty()
                .isNumeric().withMessage('Solo numeros')
        ]
    },
    editFormProducto: function () {
        return [

        ]
    }
}
