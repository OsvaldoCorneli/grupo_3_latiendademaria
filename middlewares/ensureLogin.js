const fs = require('fs')
const path = require('path')
const users = require('../data/users.json')


function ensureLogin (req,res, next) {
    res.locals.login = false
    if (req.session.user) {
        res.locals.login = true
    }
    next()
}

module.exports = ensureLogin