const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')

router.route('/')
    .get(Controllers.getHome);

// router.route('/login')
//     .get(Controllers.);

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'/views/home.html'))
// });

// app.route('/login')
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/login.html'))})
//     .post((req,res) => {
//         res.send(req.body)
//     })
// ;

// app.route("/cart")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/cart.html'))
//     })
// ;
// app.route("/profile")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/profile.html'))
//     })
// ;
// app.route("/contacto")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/contacto.html'))
//     })
//     .post((req,res) => {
//         res.send(req.body)
//     })
// ;
// app.route("/about")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/about.html'))
//     })
// ;
// app.route("/browser")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/browser.html'))
//     })
// ;


// app.route("/register")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/registro.html'))
//     })
// ;

// app.route("/detail")
//     .get((req,res) => {
//         res.sendFile(path.join(__dirname,'/views/detail.html'))
//     })
// ;

module.exports = router