const Cart = require('../models/cart')
const userService = require('../models/user')

module.exports = {
    getCart: async function (req,res) {
        try {
            if(!req.session.user){
                res.redirect("/")}
            else{  
            const cartDetail = await Cart.detail(req.session.user?.id)
            const userData = await userService.detail(req.session.user?.id)
            //res.status(200).json(cartDetail)
            if (cartDetail) { 
                res.render('cart/cart', {cartDetail: {carrito: cartDetail, ...userData}})
            } else {
                res.render('404notfound', {url: req.url})
            }}
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    detail: async function (req,res) {
        try {
            const response = await Cart.detail(req.session?.user.id)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    add: async function (req,res) {
        try {
            const response = await Cart.add({body: req.body, id: req.session?.user.id})
            if (response instanceof(Error)) throw Error(response)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    update: async function (req,res) {
        try {
            const response = await Cart.update({body: req.body, id: req.session?.user.id})
            if (response instanceof(Error)) throw Error(response)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    delete:async function (req,res) {
        try {
            const response = await Cart.delete({body: req.body, id: req.session?.user.id})
            if (response instanceof(Error)) throw Error(response)
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}