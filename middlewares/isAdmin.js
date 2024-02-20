const users = require('../data/users.json')

function isAdmin (req,res,next) {
    const admin = users.find((user) => user.id == req.user.id)?.admin
        ? true 
        : false;
    req.user.admin = admin
    res.locals.admin = admin
    next()
}

module.exports = isAdmin