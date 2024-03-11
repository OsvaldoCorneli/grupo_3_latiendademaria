function forRegister (req,res, next) {
    res.locals.login = false
    if (req.query.key === "allUsers") {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = forRegister