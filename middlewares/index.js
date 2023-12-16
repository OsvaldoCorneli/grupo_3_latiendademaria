const middlewares = {
    loguearRuta: require('./loguearRutas'),
    isAdmin: require('./isAdmin'),
    rutaNoEncontrada: require('./rutaNoEncontrada'),
    ensureLogin: require('./ensureLogin')
}

module.exports = middlewares