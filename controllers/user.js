const Models = require('../models').users

const usersController = {
    index: function (req, res) {
        let {id} = req.params
        if (id) {
            res.render('profile', {userData: Models.detail(id)})
        }
        
    },

}