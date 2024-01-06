const { users, products, dataGeo } = require('../models');
const { check, validationResult } = require('express-validator');

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
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const user = users.login(req.body)
            if (user.access) {
                res.status(200).redirect('/')
            } else {
                res.render('users/login', {errors: {login: user.error}})
            }
        } else {
            console.log(errores.mapped())
            res.render('users/login', {errors: errores.mapped()})
        }
    },
    create: function (req,res) {
        const errores = validationResult(req)
        if (req.method == 'GET') {
            res.render('users/register', {
                body: {},
                localidades: dataGeo.localidades()
            })
        }
        if (req.method == 'POST') {
            if (errores.isEmpty()) {
                const newUser = users.create(req.body, req.files)
                if (newUser) {
                    res.redirect('/users/login')
                }
            } else {
                res.render('users/register', {
                    body: req.body,
                    localidades: dataGeo.localidades(),
                    errors: errores.mapped()
                })
            }
        }
    },
    update: function (req,res) {
        let { id } = req.params
        const errores = validationResult(req)
        if (req.method == 'GET') {
            res.render('users/edit-user', { 
                userData: users.detail(id),
                localidades: dataGeo.localidades(),
                body: {}
            })
        }
        else if (req.method == 'PUT') {
            if ()
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