const Models = require('../models').products

const products = {
    index: function (req,res) {
        let { id } = req.params
        if (!id) {
            res.render('products', { 
                productos: Models.filter(req.body),
                categorias: Models.categories(),
                colors: Models.colors()
            })
        } else {
            res.render('detail',{
                detalle: Models.productDetail(id)
            })
        }
    },
    create: function (req,res) {
        res.render('createForm', {
            categorias: Models.allCategories(),
            colors: Models.allColors()
        })
    },
    update: function (req,res) {

    },
    edit: function (req,res) {

    },
    delete: function (req,res) {

    }
}

module.exports = products