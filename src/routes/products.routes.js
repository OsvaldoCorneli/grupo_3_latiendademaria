const express = require('express');
const router = express.Router();
const multer = require('multer')
const products = require('../controllers/product');
const upload = require('../middlewares/multerMid');
const validacionForm = require('../middlewares/validacionForm');
const validacionProducts = require('../middlewares/validacionProducts');


router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
;

router.get('/filter', products.filter);

router.route('/create') 
    .get(products.getCreateForm)
    .post(function(req,res,next) {
        upload.any()(req,res,function(err){
            if(err instanceof multer.MulterError) {
                console.log(err)
            } else if (err) {
                console.log(err)
            }
            next()
        })
    },
        validacionProducts.formProducto(),
        products.postCreateForm
    )
;

router.route('/:id/edit')
    .get(products.edit) // para renderizar al front el form edit de producto
    .put(upload.any(),
        validacionProducts.formEditProducto(),
        products.update
    )
; 

router.route('/:id/delete')
    .delete(products.delete)
;

router.route('/:id')
    .get(products.detail) // esta es para el detalle, entra en el ultimo else del controller
;

module.exports = router