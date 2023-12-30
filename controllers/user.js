const { users, products } = require('../models')

const usersController = {
    index: function (req, res) {
        if (req.url == '/profile') {
            res.render('users/profile', {
                userData: users.detail(1),
                productos: products.all() 
            })
        } else {
            res.render('users/login', {errors: {}})
        }
    },
    login: function (req,res) {
        const user = users.login(req.body)
        if (user.access) {
            res.send(user)
        } else {
            res.render('users/login', {errors: {login: `Usuario y/o contraseña incorrecta`}})
        }
    },
    create: function (req,res) {
        if (req.method == 'GET') {
            res.render('users/register')
        }
        if (req.method == 'POST') {
            const newUser = users.create(req.body, req.files)
            if (newUser) {
                res.redirect(`users/login`)
            }
        }
    },
    update: function (req,res) {
        let { id } = req.params
        if (req.method == 'GET') {
            res.render('users/edit-user', { userData: users.detail(id)})
        }
        else if (req.method == 'PUT') {
            console.log(req.files)
            //const imagen = req.files.map(x => {return x.path})
            const updatedData = users.update({...req.body, imagen })
            if (updatedData) {
                res.send(updatedData)
            }
        }
        // const updatedUser = users.update(req.body)
        // if (updatedUser) {
        //     res.send(`el usuario ${newUser.name} fue actualizado con exito!`)
        // }
    },
    restore: function (req,res) {
        if (req.method == "GET") {
            res.render('users/restore')
        } else if (req.method == "POST") {
            
        }
    }
}

module.exports = usersController