const express = require('express')
const router = express.Router()
const { users } = require('../controllers')

router.route('/login')
    .get(users.index)
    .post(users.login);

router.get('/register', users.create)

router.get('/:id/update', users.update)

router.get('/:id', users.index)

module.exports = router
