
const products = require('../models/products');

module.exports = {
	getHome: function (req, res) {
		res.render('Home/home', {
			sublimados: products.filter({line: 'sublimada'}).slice(0,8),
			artesanales: products.filter({line: 'artesanal'}).slice(0,4)
		})
	},
    getCart: function (req,res) {
		res.render('cart')
    },
    getContacto: function (req,res) {
		res.render('contacto')
    },
    getAbout: function (req,res) {
		res.render('about')
    },
    getAutor: function (req,res) {
        res.render('autor')
    },
    postContacto: function (req,res) {
		res.status(200).json(req.body)
    },
    getAutor: function (req,res) {
        res.render('autor')
    }
}
