const products = require('../models/products');
const payments = require('../models/payments');
const categories = require('../models/categories.js');
const favorites = require('../models/favorites');
const colors = require('../models/colors.js'); 
const users = require('../models/user');
const {validationResult} = require('express-validator')


module.exports = {
    products: {
        list: async function (req,res) {
            try {
                const response = await products.filter(req.query)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        detail: async function (req,res) {
            try {
                const response = await products.detail(+req.params.id)
                res.status(200).json(response)
            } catch (error) {s
                res.status(500).json(error.message)
            }
        }
    },
    payments: {
        all: async function (req,res) {
            try {
                const response = await payments.all(req.query)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        detail: async function (req,res) {
            try {
                const response = await payments.detallePago(req.params.id)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        userPayment: async function (req,res) {
            try {
                const id = req.session.user.id
                const {perPage, page} = req.query
                const response = await payments.userDetail(id,+perPage,+page)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        new: async function(req,res) {
            try {
                const response = await payments.create(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        update: async function(req,res) {
            try {
                const response = await payments.updateStatus(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    categories: {
        new: async function (req,res) {
            try {
                const response = await categories.create(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    favorites: {
        user: async function (req,res) {
            try {
                const userId = req.session.user.id;
                const response = await favorites.userFav(userId)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        add: async function (req,res) {
            try {
                let { product } = req.body
                const user = req.session.user.id
                const addFav = await favorites.add(user, product)
                res.status(200).json(addFav)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    users: {
        all: async function(req, res){
            try {
                const users = await user.index()
                if(!users) throw new Error ("no hay usuario")
                res.status(200).json(users)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        login: async function (req,res) {
            try {
                const errores = validationResult(req)
                if (errores.isEmpty()) {
                    const user = await users.login(req.body)
                    if (user.access) {
                        delete user?.password
                        req.session.user = user? user : {};
                        
                        if(req.body.recordame != undefined){
                            const oneDayInMillis = 24 * 60 * 60 * 1000;
                            res.cookie('recordame', user.email, { expires: new Date(Date.now() + oneDayInMillis), httpOnly: true });
                        }
                        res.status(200).json(user)
                    } else {
                        res.status(403).json()
                    }
                } else {
                    res.status(401).json(errores.mapped())
                } 
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    }

}