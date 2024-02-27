function isLogged (req,res, next) {
    res.locals.login = false
    if (req.session.user) {
        res.locals = { login: true, admin: req.session.user.admin }
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = isLogged