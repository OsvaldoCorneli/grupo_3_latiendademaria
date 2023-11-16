const express = require('express');
const path = require('path');
const app = express();


app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/views/home.html'))
});

app.route('/login')
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/login.html'))})
    .post((req,res) => {
        res.send(req.body)
    })
;

app.route("/cart")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/cart.html'))
    })
;
app.route("/profile")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/profile.html'))
    })
;
app.route("/contacto")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/contacto.html'))
    })
    .post((req,res) => {
        res.send(req.body)
    })
;
app.route("/about")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/about.html'))
    })
;
app.route("/browser")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/browser.html'))
    })
;


app.route("/register")
    .get((req,res) => {
        res.sendFile(path.join(__dirname,'/views/registro.html'))
    })
;



app.listen(3001,(req,res) => {
    console.log(`Server corriendo en puerto http://localhost:3001`)
});