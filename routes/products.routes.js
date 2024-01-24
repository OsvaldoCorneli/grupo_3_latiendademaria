const express = require('express')
const router = express.Router()
const products = require('../controllers/product')
const upload = require('../middlewares/multerMid')
const validacionForm = require('../middlewares/validacionForm') 


router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
;
router.get('/filter', products.filter);

router.route('/create') 
    .get(products.getCreateForm)
    .post(upload.any(),
        validacionForm.formProducto(),
        products.postCreateForm
    )
;
        // (req,res,next)=> {console.log(req.body); next()},
router.route('/:id/edit')
    .get(products.edit) // para renderizar al front el form edit de producto
    .put(upload.any(), products.update)
; 

router.route('/:id/delete')
    .delete(products.delete)
;

router.route('/:id')
    .get(products.detail) // esta es para el detalle, entra en el ultimo else del controller
;

module.exports = router