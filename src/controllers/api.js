const products = require('../models/products');
const payments = require('../models/payments');
const categories = require('../models/categories.js');

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
    }
}