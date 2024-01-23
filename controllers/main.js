
const { products } = require('../models');

const main = {
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
    },
    getCart: function (req,res) {
      const cartDetail = cart.cart(req.session.user?.id)
      if (cartDetail) {
          res.render('cart/cart', {cartDetail})
      } else {
          res.render('404notfound', {url: req.url})
      }
  },
}

module.exports = main