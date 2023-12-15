const Admins = require('../utils/adminUsers.json')

function isAdmin (req,res,next) {
    const admin = Admins.find((user) => user.id == req.user.id)?.admin
        ? true 
        : false;
    req.user.admin = admin
    next()
}

module.exports = isAdmin