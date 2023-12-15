const { users } = require('../models')

const usersController = {
    index: function (req, res) {
        let {id} = req.params
        if (id) {
            res.render('profile', {userData: users.detail(id)})
        } else {
            res.render('login')
        }
    },
    login: function (req,res) {

        res.render('login')
    },
    create: function (req,res) {
        const newUser = users.create(req.body)
        if (newUser) {
            res.send(`el usuario ${newUser.name} fue registrado con exito!`)
        }
    },
    update: function (req,res) {
        res.render('edit-user', { user: users.detail()})
        const updatedUser = users.update(req.body)
        if (updatedUser) {
            res.send(`el usuario ${newUser.name} fue actualizado con exito!`)
        }
    }
}

module.exports = usersController