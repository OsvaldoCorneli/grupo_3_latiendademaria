const Models = require('../models');

const Controllers = {
    getHome: async function (req, res) {
        try {
            res.render('home', {
                sublimados: Models.filterProducts('line','sublimada').slice(0,8),
                artesanales: Models.filterProducts('line','artesanal').slice(0,4)
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getLogin: async function (req,res) {
        try {
            res.render('login')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },    
    getCart: async function (req,res) {
        try {
            res.render('cart')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getProfile: async function (req,res) {
        try {
            res.render('profile')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getContacto: async function (req,res) {
        try {
            res.render('contacto')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getAbout: async function (req,res) {
        try {
            res.render('about')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getBrowser: async function (req,res) {
        try {
            res.render('browser')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getRegister: async function (req,res) {
        try {
            res.render('register')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getDetail: async function (req,res) {
        try {
            res.render('detail')
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    postContacto: async function (req,res) {
        try {
            res.status(200).json(req.body)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = Controllers