const payments = require('../models/payments');
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
    profile: async function (req,res){
        try {
            const userId = req.session.user?.id
            const historialPagos = await payments.all(userId)
            const userData = users.detail(userId)
            const productos = await products.all()
            //res.send(historialPagos)
            res.render('users/profile', {userData, productos, historialPagos })
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    login: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const user = users.login(req.body)
            if (user.access) {
                delete user?.password
                req.session.user = user? user : {}
                if(req.body.recordame != undefined){
                    const oneDayInMillis = 24 * 60 * 60 * 1000;
                     res.cookie('recordame', user.email, { expires: new Date(Date.now() + oneDayInMillis), httpOnly: true });
                } 
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
        res.clearCookie('recordame');
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