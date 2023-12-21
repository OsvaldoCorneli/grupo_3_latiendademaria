const express = require('express')
const router = express.Router()
const { users } = require('../controllers')
const { upload } = require('../middlewares')


router.route('/login')
    .get(users.index)
    .post(users.login);

router.get('/register', upload.any(), users.create)

router.get('/profile', users.index)

router.get('/:id/update', users.update);
router.put('/:id/update', upload.any(), users.update)
;

module.exports = router
