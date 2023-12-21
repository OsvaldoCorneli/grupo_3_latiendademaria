const express = require('express')
const router = express.Router()
const { products } = require('../controllers')
const { upload } = require('../middlewares')



router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
    .post(products.index) // para el filtro de products
;

router.route('/create') 
    .get(products.create)
    .post(upload.any(), products.create)

router.route('/:id/edit')
    .get(products.edit) // para renderizar al front el form edit de producto
    .put(upload.any(), products.update)
; 

router.route('/:id/delete')
    .delete(products.delete)
;

router.route('/:id')
    .get(products.index) // esta es para el detalle, entra en el ultimo else del controller
;

module.exports = router