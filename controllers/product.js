const path = require('path')
const { products } = require('../models')

const view = path.join(__dirname,'../views/products/');

const productsController = {
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
                categorias: products.categories(),
                colors: products.colors()
            })
        } else if (method == 'POST') {
            const newProduct = products.create(req.body, req.file)
            console.log(req.body, req.file)
            if (newProduct) {
                res.send(`producto ${req.body.name} creado con exito!`)
            }
        }
    },
    update: function (req,res) {

    },
    edit: function (req,res) {
        
    },
    delete: function (req,res) {

    }
}

module.exports = productsController