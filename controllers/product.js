const { products } = require('../models')

const productsController = {
    index: function (req,res) {
        let { id } = req.params
        if (!id && req.method == 'POST') {
            res.render('products', { 
                productos: products.filter(req.body),
                categorias: products.categories(),
                colors: products.colors()
            })
        } else if (!id && req.method == 'GET') {
            res.render('products', { 
                productos: products.all(),
                categorias: products.categories(),
                colors: products.colors()
            })
        } else {
            res.render('detail',{
                detalle: products.detail(id)
            })
        }
    },
    create: function (req,res) {
        res.render('createForm', {
            categorias: products.categories(),
            colors: products.colors()
        })
    },
    update: function (req,res) {

    },
    edit: function (req,res) {

    },
    delete: function (req,res) {

    }
}

module.exports = productsController