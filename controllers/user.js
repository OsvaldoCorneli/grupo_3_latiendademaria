const dataGeo = require('../models/dataGeo');
const products = require('../models/products');
const users = require('../models/user');
const { check, validationResult } = require('express-validator');

module.exports = {
    index: function (req, res) {
        res.render('users/login', {
            body: {},
            errors: {}
        })
    },
    profile: function (req,res){
        res.render('users/profile', {
            userData: users.detail(req.session.user?.id),
            productos: products.all() 
        })
    },
    login: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const user = users.login(req.body)
            if (user.access) {
                delete user?.password
                req.session.user = user? user : {}
                res.status(200).redirect('/')
            } else {
                res.render('users/login', {
                    body: {},
                    errors: {login: user.error}
                })
            }
        } else {
            res.render('users/login', {
                body: req.body,
                errors: errores.mapped()
            })
        }
    },
    logout: function (req,res) {
        delete req.session.user
        res.redirect('/')
    },
    getCreateForm: function (req,res) {
        res.render('users/register', {
            body: {},
            localidades: dataGeo.localidades()
        })
    },
    postCreateForm: function (req,res) {
        const errores = validationResult(req)
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
    },
    getUpdateForm: function (req,res) {
        res.render('users/edit-user', { 
            userData: users.detail(req.params.id),
            localidades: dataGeo.localidades(),
            body: {}
        })
    },
    putUpdateForm: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const updatedData = users.update({id: parseInt(id), ...req.body, imagen: req.files })
            if (updatedData) {
                res.redirect('/users/profile')
            }
        } else {
            res.render('users/edit-user', { 
                userData: users.detail(id),
                localidades: dataGeo.localidades(),
                body: req.body,
                errors: errores.mapped()
            })
        }
    },
    getRestoreUser: function (req,res) {
        res.render('users/restore')
    },
    postRestoreUser: function (req,res) {
        res.render('404notfound',{url: req.url})
    }
}