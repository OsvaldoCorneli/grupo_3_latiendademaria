const express = require('express')
const router = express.Router()
const { users } = require('../controllers')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `/images/uploads`)
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
	}
})

let upload = multer({storage: storage})

router.route('/login')
    .get(users.index)
    .post(users.login);

router.get('/register', users.create)

router.get('/profile', users.index)

router.get('/:id/update', users.update)

module.exports = router
