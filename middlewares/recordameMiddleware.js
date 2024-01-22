const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = require("../models/user");
const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function recordameMiddleware(req, res, next) {
    
    if (req.cookies.recordame !== undefined && req.session.user === undefined) {
        
        const { recordame } = req.cookies;
        const email =  recordame
        let user = Users.find((user) => user.email == email)
        if (user != undefined) {
            
            req.session.user = user? user : {}
            return res.status(200).redirect('/')
        }
    
} 
    next();
}

module.exports = recordameMiddleware;
