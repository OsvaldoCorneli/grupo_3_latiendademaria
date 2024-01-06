const middlewares = {
    loguearRuta: require('./loguearRutas'),
    isAdmin: require('./isAdmin'),
    rutaNoEncontrada: require('./rutaNoEncontrada'),
    ensureLogin: require('./ensureLogin'),
    upload: require('./multerMid'),
    validacionForm: require('./validacionForm')
}

module.exports = middlewares