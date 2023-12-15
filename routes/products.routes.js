const express = require('express')
const router = express.Router()
const { products } = require('../controllers')

router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
    .post(products.index) // para el filtro de products
;

router.get('/create', products.create)

router.route('/:id')
    .get(products.index)
    .put(products.update)
    .patch(products.edit)
    .delete(products.delete)
;



module.exports = router