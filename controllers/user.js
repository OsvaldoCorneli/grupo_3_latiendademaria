const { users, products, dataGeo } = require('../models')

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
        console.log(req.body)
        const user = users.login(req.body)
        if (user.access) {
            res.send(user)
        } else {
            res.render('users/login', {errors: {login: `Usuario y/o contraseña incorrecta`}})
        }
    },
    create: function (req,res) {
        const {provincia} = req.query
        if (req.method == 'GET') {
            if (!provincia) {
                res.render('users/register', {
                    provincias: dataGeo.all(),
                    localidades: []
                })
            } else {
                res.render('users/register', {
                    provincias: dataGeo.all(),
                    localidades: dataGeo.localidades(provincia)
                })
            }
            
        }
        if (req.method == 'POST') {
            const newUser = users.create(req.body, req.files)
            if (newUser) {
                res.redirect('/users/login')
            }
        }
    },
    update: function (req,res) {
        let { id } = req.params
        if (req.method == 'GET') {
            res.render('users/edit-user', { 
                userData: users.detail(id),
                provincias: dataGeo.all(),
            })
        }
        else if (req.method == 'PUT') {
            const updatedData = users.update({id: parseInt(id), ...req.body, imagen: req.files })
            if (updatedData) {
                res.redirect('/users/profile')
            }
        }
    },
    restore: function (req,res) {
        if (req.method == "GET") {
            res.render('users/restore')
        } else if (req.method == "POST") {
            
        }
    }
}

module.exports = usersController