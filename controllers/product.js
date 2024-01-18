const path = require('path');
const users = require('../models/user');
const products = require('../models/products');

const view = path.join(__dirname,'../views/products/');

module.exports = {
    index: function (req,res) {
        let { id } = req.params
        if (!id && req.method == 'POST') { //este if es para el filtro
            res.render(view+'products', { 
                productos: products.filter(req.body),
                categorias: products.categories(),
                colors: products.colors()
            })
        } else if (!id && req.method == 'GET') { // este if es para primera vista o resetear filtro
            res.render(view+'products', { 
                productos: products.all(),
                categorias: products.categories(),
                colors: products.colors()
            })
        } else {
            const detalle = products.detail(id)
            if (detalle) res.render(view+'detail',{ detalle }) // si no, renderiza el detalle de producto que recibo por params
            else res.render('404notFound', {url: req.url}) // si no encuentra el producto, devuelve 404
            
        }
    },
    create: function (req,res) {
        let {method} = req
        if (method == 'GET') {
            res.render(view+'createForm', {
                productEdit: null,
                categorias: products.categories(),
                colors: products.colors()
            })
        } else if (method == 'POST') {
            const newProduct = products.create(req.body, req.files)
            if (newProduct) {
                res.redirect('/users/profile')
            }
        }
    },

    update: function (req, res) {
        let {id} = req.params
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
