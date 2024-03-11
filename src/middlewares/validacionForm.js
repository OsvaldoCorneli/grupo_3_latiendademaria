const { body, validationResult } = require('express-validator');
const users = require('../models/user');
const productos = require('../models/products');
const Images = require('../models/images')
const bcrypt = require('bcryptjs');
const path = require('path');
const categories = require('../models/categories');
const Colors = require('../models/colors');
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
                    const user = usersdb.find((u) => u.userName == req.body.email || u.email == req.body.email);
            
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
                .isLength({min: 8}).withMessage('la contraseña debe ser mayor a 8 caracteres')
                .custom(value => regexPassword.test(value)).withMessage('La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial.'),
            body('repassword').custom((value, {req}) => {
                return value === req.body.password
            }).withMessage('las contraseñas no coinciden'),
            body('userName')
                .notEmpty().withMessage('Debes completar el nombre')
                .isLength({min: 6}).withMessage('el nombre debe ser mayor a 6 caracteres')
                .custom(async (value) => {
                    const users1 = await users.index();
                    const user = users1.some((u) => u.username == value);
            
                    if (user) {
                        throw new Error('El nombre de usuario ya está en uso');
                    }
            
                    return true;
                }),
            body('email')
                .isEmail().withMessage('email no valido')
                .custom(async (value, { req }) => {
                 const user1 = await users.index();
                 const anotherUserWithSameEmail = user1.some((user) => user.email == value);

                  if (anotherUserWithSameEmail) {
                     throw new Error('Este email ya esta registrado');
                     }

                     return true;
                }),
            body('fechaNacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            // body('provincia')
            //     .notEmpty().withMessage('selecciona una provincia'),
            // body('codigoPostal')
            //     .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
            //     .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            // body('calle')
            //     .isLength({min: 3, max:30}) 
            //     .notEmpty().withMessage('la calle no puede estar vacia'),
            // body('calleNumero')
            //     .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle'),
            body('imagen')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext)) 
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            // body('piso')
            //     .isLength({max:10}), 
            // body('departamento')
            //     .isLength({max:10}),
        ]
    },
    editUser: function () {
        return [
            body('email')
                .isEmail().withMessage('email invalido')
                .custom(async (value,{req}) => {

                    const usuario1 = await users.index()
                    const anotherUserWithSameEmail = usuario1.some((user) => user.id != req.params.id && user.email == value)
                    if (anotherUserWithSameEmail) {
                        throw new Error('El email ya está en uso');
                        }
   
                        return true;
                   }),
            body('fechaNacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            // body('provincia')
            //     .notEmpty().withMessage('selecciona una provincia'),
            // body('localidad')
            //     .notEmpty().withMessage('selecciona una localidad'),
            // body('codigoPostal')
            //     .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
            //     .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            // body('calle')
            //     .isLength({min: 3, max:30})
            //     .notEmpty().withMessage('la calle no puede estar vacia'),
            // body('calleNumero')
            //     .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle'),
            body('imagen')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            // body('piso', 'no puede superar 10 caracteres')
            //     .isLength({max:10}),
            // body('departamento', 'no puede superar 10 caracteres')
            //     .isLength({max:10}) 
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
                .custom(value => {return value == 'artesanal' || value == 'sublimada'}).withMessage('Campo "Linea" inexistente'),
            body('category')
            .custom(async (value) => {
                const allCategories = await categories.all()
                return allCategories.some(({id}) => id == value)}).withMessage('Campo "Categoria" inexistente'),
            body('color.*')
                .notEmpty()
                .isHexColor().withMessage('Solo se admite colores con valor hexadecimal')
                .custom(async(value) => {
                    const allColors = await Colors.all()
                    return allColors.some(({hex})=> hex == value.toUpperCase())
                }).withMessage('Campo "Color" no existe'),
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
                .custom(async (value,{req}) => {
                    const productDetail = await productos.detail(+value)
                    return productDetail.id === +req.params.id
                }).withMessage('el product Id no existe'),
            body('name')
                .notEmpty().withMessage('completar el nombre')
                .isLength({min: 4, max:50}).withMessage('el nombre debe ser entre 4 a 50 caracteres'),
            body('description')
                .notEmpty().withMessage('no puede estar vacio')
                .isLength({max: 256}).withMessage('Maximo 256 caracteres'),
            body('image')
                .custom((value, {req})=>{
                    if (!value && req.body.imageHold) return true
                    if (!value && !req.body.imageHold) throw Error('debes Subir al menos una imagen')
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    if (!value) return true
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            body('imageHold.*')
                .custom(async (value,{req}) => {
                    if (value) {
                        const productDetail = await productos.detail(+req.body.id)
                        return productDetail.images.some((img) => img.pathName == value)
                    } else return true
                }).withMessage('la imagen de origen local no existe o no es pertinente al producto'),
            body('line')
                .custom(value => {return value == 'artesanal' || value == 'sublimada'}).withMessage('Campo "Linea" inexistente'),
            body('category')
                .custom(async (value) => {
                    const allCategories = await categories.all()
                    return allCategories.some(c => c.name == value)}).withMessage('Campo "Categoria" inexistente'),
            body('color.*')
                .notEmpty()
                .isHexColor().withMessage('Solo se admite colores con valor hexadecimal')
                .custom(async(value) => {
                    const allColors = await Colors.all()
                    return allColors.some(({hex})=> hex == value.toUpperCase())
                }).withMessage('Campo "Color" no existe'),
            body('price')
                .notEmpty()
                .isDecimal().withMessage('Debe ser un numero con 2 decimales maximo'),
            body('stock.*')
                .notEmpty()
                .isNumeric().withMessage('Solo numeros')
        ]
    }
}
