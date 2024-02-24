
const products = require('../models/products');
const cart = require('../models/cart');
const db = require("../database/models")

module.exports = {
	getHome: async function (req, res) {
    try {
      const productSublimados = await products.filter({line: 'sublimada'})
      const productosArtesanales = await products.filter({line: 'artesanal'})
      res.render('Home/home', {
        sublimados: productSublimados.slice(0,8),
        artesanales: productosArtesanales.slice(0,4)
      })
    } catch (error) {
      res.status(500).json(error.message)
    }
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
    getCart: async function (req,res) {
      try {
        const cartDetail = await cart.cart(req.session.user?.id)
        if (cartDetail) {
            res.render('cart/cart', {cartDetail})
        } else {
            res.render('404notfound', {url: req.url})
        }
      } catch (error) {
        res.status(500).json(error.message)
      }
  },
  addCart: async function (req, res){
    try {
      const carrito = await db.Products.findByPk(req.params.id, {raw: true})
      console.log(carrito)

    } catch (error) {
      return error
    }
  }
}
