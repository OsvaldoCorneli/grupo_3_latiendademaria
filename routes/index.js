const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')

router.route('/')
    .get(Controllers.getHome);

router.route('/login')
    .get(Controllers.getLogin);

router.route('/cart')
    .get(Controllers.getCart);

router.route("/profile")
    .get(Controllers.getProfile)
;
router.route("/contacto")
    .get(Controllers.getContacto)
    .post(Controllers.postContacto)
;
router.route("/about")
    .get(Controllers.getAbout)
;
router.route("/autor")
    .get(Controllers.getAutor)
;
router.route("/browser")
    .get(Controllers.getBrowser)
    .post(Controllers.postBrowser)
;

router.route("/register")
    .get(Controllers.getRegister)
;

router.route("/detail")
    .get(Controllers.getDetail)
;

router.route("/autor")
    .get(Controllers.getAutor)
;

module.exports = router