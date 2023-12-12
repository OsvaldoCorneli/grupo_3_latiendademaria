const express = require('express')
const router = express.Router()
const { products } = require('../controllers')

router.get('/', products.index)

router.get('/create', products.create)

router.route('/:id')
    .get(products.index)
    .put(products.update)
    .patch(products.edit)
    .delete(products.delete)
;



module.exports = router