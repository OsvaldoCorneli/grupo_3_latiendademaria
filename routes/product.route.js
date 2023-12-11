const {Router} = require('express')
const router = Router()
const Controllers = require('../controllers').products

router.get('/', Controllers.index)

router.post('/', Controllers.create)

router.route('/:id')
    .get(Controllers.index)
    .put(Controllers.update)
    .patch(Controllers.edit)
    .delete(Controllers.delete)
;

module.exports = router