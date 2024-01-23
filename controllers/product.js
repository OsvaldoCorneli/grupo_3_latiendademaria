const path = require('path');
const users = require('../models/user');
const products = require('../models/products');
const {validationResult} = require('express-validator');

const view = path.join(__dirname,'../views/products/');

module.exports = {
    index: function (req,res) {
        res.render(view+'products', { 
            productos: products.all(),
            categorias: products.categories(),
            colors: products.colors()
        })
    },
    filter: function (req,res) {
        if (Object.keys(req.query).length == 0) {
            res.render(view+'products', { 
                productos: products.all(),
                categorias: products.categories(),
                colors: products.colors()
            })
        } else {
            res.render(view+'products', { 
                productos: products.filter(req.query),
                categorias: products.categories(),
                colors: products.colors()
            })
        }
    },
    detail: function (req,res) {
        const detalle = products.detail(req.params.id)
        if (detalle) res.render(view+'detail',{ detalle }) // si no, renderiza el detalle de producto que recibo por params
        else res.render('404notFound', {url: req.url}) // si no encuentra el producto, devuelve 404
    },
    getCreateForm: function(req,res) {
        res.render(view+'createForm', {
            productEdit: null,
            categorias: products.categories(),
            colors: products.colors()
        })
    },
    postCreateForm: function (req,res) {
        const newProduct = products.create(req.body, req.files)
        if (newProduct) {
            res.redirect('/users/profile')
        }
    },

    update: function (req, res) {
        let {id} = req.params
        const errores = validationResult(req)
        if(id && req.body){
            const response = products.edited({id: parseInt(id), ...req.body, imagen: req.files})
            if (response) {
                res.status(200).redirect(`/products/${id}/edit?message=editado`)
            }
        }
    },

    edit: function (req,res) {
        try{
        if(req.query.message === "editado"){
            const response = products.edit(req.params.id)
            res.render(`${view}/editForm`, {
                productEdit: response,
                categorias: products.categories(),
                colors: products.colors(),
                message: req.query
            }) 
        } else {    
            const response = products.edit(req.params.id)
            res.render(`${view}/editForm`, {
                productEdit: response,
                categorias: products.categories(),
                colors: products.colors(),
                message: null
            })
            }}
        catch(error){
            res.status(404).send(error) 
        }
    }, 
    delete:  function (req,res) {
        
        const {id} = req.params
        const responseDelete = products.destroy(id)
        res.status(200).redirect('/users/profile'); 
        
    }
}
