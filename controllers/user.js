const { users, products } = require('../models')

const usersController = {
    index: function (req, res) {
        if (req.url == '/profile') {
            res.render('users/profile', {
                userData: users.detail(1),
                productos: products.all() 
            })
        } else {
            res.render('users/login')
        }
    },
    login: function (req,res) {

        res.render('users/login')
    },
    create: function (req,res) {
        const newUser = users.create(req.body)
        if (newUser) {
            res.send(`el usuario ${newUser.name} fue registrado con exito!`)
        }
    },
    update: function (req,res) {
        res.render('users/edit-user', { user: users.detail()})
        const updatedUser = users.update(req.body)
        if (updatedUser) {
            res.send(`el usuario ${newUser.name} fue actualizado con exito!`)
        }
    }
}

module.exports = usersController