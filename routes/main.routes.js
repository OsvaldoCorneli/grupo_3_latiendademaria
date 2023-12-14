const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')

router.route('/')
    .get(Controllers.getHome);

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




router.route("/autor")
    .get(Controllers.getAutor)
;

module.exports = router