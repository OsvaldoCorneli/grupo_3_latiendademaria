const payments = require('../models/payments');

module.exports = {
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
    }
}