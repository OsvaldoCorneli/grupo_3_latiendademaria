const Models = require('../models')

const products = {
    index: function (req,res) {
        let { id } = req.params
        if (id) {
            // res.render('editForm', {
            //     producto: Models.productDetail(id)
            // })
            res.send({producto: Models.productDetail(parseInt(id))})
        } else {
            res.render('createForm', {
                categorias: Models.allCategories(),
                colors: Models.allColors()
            })
        }
    },
    create: async function (req,res) {

    },
    update: async function (req,res) {

    },
    edit: async function (req,res) {

    },
    delete: async function (req,res) {

    }
}

module.exports = products