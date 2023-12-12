const Models = require('../models')

const products = {
    index: function (req,res) {
        let { id } = req.params
        res.render('detail',{
            detalle: Models.productDetail(id)
        })
    },
    create: async function (req,res) {
        res.render('createForm', {
            categorias: Models.allCategories(),
            colors: Models.allColors()
        })
    },
    update: async function (req,res) {

    },
    edit: async function (req,res) {

    },
    delete: async function (req,res) {

    }
}

module.exports = products