const { body, validationResult } = require('express-validator');
const users = require('../models/user');
const Category = require('../data/category.json');
const productos = require('../data/productos.json');
const bcrypt = require('bcryptjs');
const path = require('path');

const extNames = ['.jpg', '.png', '.jpeg']
const maxFileSize = 2048000 //bytes

module.exports = {
    login: function () {
        return [
            body('email')
                .notEmpty().withMessage('Ingresar Usuario o email registrado')
                .custom(async (value) => {
                    const usersdb = await users.index()
                    const user = usersdb.some((u) => u.userName == value || u.email == value)
                    if (!user) {
                        return Promise.reject('usuario o email no registrados');
                    }
            
                    return Promise.resolve();
                }),
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .custom(async (value, { req }) => {
                    const usersdb = await users.index();
                    const user = usersdb.find((u) => u.username == req.body.email || u.email == req.body.email);
            
                    if (!user) {
                        throw new Error('Verificar Usuario');
                    }
            
                    const checkPass = await bcrypt.compare(value, user.password);
            
                    if (!checkPass) {
                        throw new Error('Contraseña incorrecta');
                    }
            
                    return true;
                }),
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
                    return !users.index().some((user) => user.username == value)
                }).withMessage('El nombre de usuario ya esta en uso'),
            body('email')
                .isEmail().withMessage('email no valido')
                .custom((value,{req}) => {
                    const anotherUserWithSameEmail = users.index().some((user) => user.email == value)
                    return !anotherUserWithSameEmail
                }).withMessage('El email ya esta en uso'),
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
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            body('piso')
                .isLength({max:10}),
            body('departamento')
                .isLength({max:10}),
        ]
    },
    editUser: function () {
        return [
            body('email')
                .isEmail().withMessage('email invalido')
                .custom((value,{req}) => {
                    const anotherUserWithSameEmail = users.index().some((user) => user.id != req.params.id && user.email == value)
                    return !anotherUserWithSameEmail
                }).withMessage('El email ya esta en uso'),
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
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
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
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            body('line')
                .custom(value => {return value == 'artesanal' || value == 'sublimada'}).withMessage('Campo Categoria inexistente'),
            body('category')
                .custom(value => {return Category.some(c => c.name == value)}).withMessage('Campo linea inexistente'),
            body('color.*')
                .notEmpty()
                .isHexColor().withMessage('Solo se admite colores con valor hexadecimal'),
            body('price')
                .notEmpty()
                .isDecimal().withMessage('Debe ser un numero con 2 decimales maximo'),
            body('stock')
                .notEmpty()
                .isNumeric().withMessage('Solo numeros')
        ]
    },
    formEditProducto: function () {
        return [
            body('id')
                .custom((value,{req}) => {
                    return productos.some(product => product.id == +value) && +req.params.id == +value
                }).withMessage('el product Id no existe'),
            body('name')
                .notEmpty().withMessage('completar el nombre')
                .isLength({min: 4, max:50}).withMessage('el nombre debe ser entre 4 a 50 caracteres'),
            body('description')
                .notEmpty().withMessage('no puede estar vacio')
                .isLength({max: 256}).withMessage('Maximo 256 caracteres'),
            body('image')
                .custom((value, {req})=>{
                    if (!value) return true
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    if (!value) return true
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            body('imageHold.*')
                .custom((value,{req}) => {
                    if (value) {
                        const imageHold = products.some((prod) => prod.id == +req.body.id && prod.image.includes(value))
                        return imageHold
                    } else return true
                }).withMessage('la imagen de origen local no existe o no es pertinente al producto'),
            body('line')
                .custom(value => {return value == 'artesanal' || value == 'sublimada'}).withMessage('Campo Categoria inexistente'),
            body('category')
                .custom(value => {return Category.some(c => c.name == value)}).withMessage('Campo linea inexistente'),
            body('color.*')
                .notEmpty()
                .isHexColor().withMessage('Solo se admite colores con valor hexadecimal'),
            body('price')
                .notEmpty()
                .isDecimal().withMessage('Debe ser un numero con 2 decimales maximo'),
            body('stock')
                .notEmpty()
                .isNumeric().withMessage('Solo numeros')
        ]
    }
}
