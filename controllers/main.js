
const Models = require('../models');

const main = {
	getHome: function (req, res) {
		res.render('home', {
			sublimados: Models.filterProducts({line: 'sublimada'}).slice(0,8),
			artesanales: Models.filterProducts({line: 'artesanal'}).slice(0,4)
		})
	},
    getLogin: function (req, res) {
        res.render('login')
    },
    getCart: function (req,res) {
		res.render('cart')
    },
    getProfile: function (req,res) {
		res.render('profile')
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
    getRegister: function (req,res) {
		res.render('registro')
    },
    postContacto: function (req,res) {
		res.status(200).json(req.body)
    },
    getAutor: function (req,res) {
        res.render('autor')
    },
    postBrowser: function (req,res) {
        
    }
}

module.exports = main