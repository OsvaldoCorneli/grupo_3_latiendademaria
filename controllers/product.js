const path = require('path');
const users = require('../models/user');
const products = require('../models/products');
const categories = require('../models/categories');
const colors = require('../models/colors');
const {validationResult} = require('express-validator');

const view = path.join(__dirname,'../views/products/');

module.exports = {
    index: async function (req,res) {
        try {
            const allProduct = await products.all()
            const allCategories = await categories.countAll()
            const allColors = await colors.countAll()
            res.render(view+'products', { 
                productos: allProduct,
                categorias: allCategories,
                colors: allColors
            })
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    filter: async function (req,res) {
        try {
            res.render(view+'products', { 
                productos: await products.filter(req.query),
                categorias: await categories.countAll(),
                colors: await colors.countAll()
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    detail: async function (req,res) {
        try {
            const detalle = await products.detail(req.params.id)
            if (detalle) res.render(view+'detail',{ detalle })
            else res.render('404notFound', {url: req.url}) // si no encuentra el producto, devuelve 404
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getCreateForm: function(req,res) {
        res.render(view+'createForm', {
            productEdit: null,
            categorias: products.categories(),
            body: {}
        })
    },
    postCreateForm: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const newProduct = products.create(req.body, req.files)
            if (newProduct) {
                res.redirect('/users/profile')
            }
        } else {
            res.render(view+'createForm', {
                productEdit: null,
                body: req.body,
                categorias: products.categories(),
                errors: errores.mapped() 
            })
        }
    },

    update: function (req, res) {
        let {id} = req.params
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const response = products.edited({id: +id, ...req.body, imagen: req.files})
            if (response) {
                res.status(200).redirect(`/products/${id}/edit?message=editado`)
            }
        } else {
            const newImage = Array.isArray(req.files)? req.files.map((img) => {return img.path.split('public')[1]}) : [req.files.path.split('public')[1]];
            const holdImage = typeof(req.body.imageHold) == 'string'? [req.body.imageHold] : req.body.imageHold;
            res.render(`${view}/editForm`, {
                productEdit: {...req.body, image: [...newImage, ...holdImage]},
                categorias: products.categories(),
                colors: products.colors(),
                message: null,
                errors: errores.mapped()
            })
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
