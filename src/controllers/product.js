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
    getCreateForm: async function(req,res) {
        try {
            res.render(view+'createForm', {
                productEdit: null,
                categorias: await categories.all(),
                body: {}
            })
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    postCreateForm: async function (req,res) {
        try {
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const newProduct = await products.create(req.body, req.files)
                if (newProduct) {
                    res.redirect('/users/profile')
                }
            } else {
                res.render(view+'createForm', {
                    productEdit: null,
                    body: req.body,
                    categorias: await categories.all(),
                    errors: errores.mapped() 
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    update: async function (req, res) {
        try {
            let {id} = req.params
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const response = await products.edited({id: +id, ...req.body, imagen: req.files})
                if (response) {
                    res.status(200).redirect(`/products/${id}/edit?message=editado`)
                }
            } else {
                let newImage = []
                const product = await products.detail(id)
                if (req.files) newImage = Array.isArray(req.files)? req.files.map((img) => {return img.path.split('public')[1]}) : [req.files.path.split('public')[1]];
                //if (req.body.imageHold) holdImage = typeof(req.body.imageHold) == 'string'? [req.body.imageHold] : req.body.imageHold;

                res.render(`${view}/editForm`, {
                    productEdit: {...req.body, image: [...newImage, ...product.images]},
                    categorias: await categories.all(),
                    message: null,
                    errors: errores.mapped()
                })
                //res.send(errores.mapped())
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    edit: async function (req,res) {
        try{
            if(req.query.message === "editado"){
                res.status(200).render(`${view}/editForm`, {
                    productEdit: await products.detail(req.params.id),
                    categorias: await categories.all(),
                    message: req.query
                }) 
            } else {    
                res.render(`${view}/editForm`, {
                    productEdit: await products.detail(req.params.id),
                    categorias: await categories.all(),
                    message: null
                })
            }}
        catch(error){
            res.status(500).send(error.message)
        }
    }, 
    delete: async function (req,res) {
        try {
            const {id} = req.params
            const responseDelete = await products.remove(+id)
            if (responseDelete) {
                res.status(200).redirect('/products');
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}
