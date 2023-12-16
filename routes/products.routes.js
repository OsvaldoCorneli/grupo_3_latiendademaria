const express = require('express')
const router = express.Router()
const { products } = require('../controllers')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
	}
})

let upload = multer({storage: storage})


router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
    .post(products.index) // para el filtro de products
;

router.route('/create') 
    .get(products.create)
    .post(upload.any(), products.create)


router.route('/:id')
    .get(products.index)
    .put(products.update)
    .patch(products.edit)
    .delete(products.delete)
;



module.exports = router