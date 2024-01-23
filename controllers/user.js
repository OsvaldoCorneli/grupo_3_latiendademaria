const { users, products } = require('../models')

const usersController = {
    index: function (req, res) {
        if (req.url == '/profile') {
            res.render('users/profile', {
                userData: users.detail(1),
                productos: products.all() 
            })
        } else {
            res.render('users/login', {errors: {}})
        }
    },
    login: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const user = users.login(req.body)
            if (user.access) {
                delete user?.password
                req.session.user = user? user : {}
                if(req.body.recordame != undefined){
                    const oneDayInMillis = 24 * 60 * 60 * 1000;
                     res.cookie('recordame', user.email, { expires: new Date(Date.now() + oneDayInMillis), httpOnly: true });
                } 
                res.status(200).redirect('/')
            } else {
                res.render('users/login', {
                    body: {},
                    errors: {login: user.error}
                })
            }
        } else {
            res.render('users/login', {errors: {login: `Usuario y/o contraseña incorrecta`}})
        }
    },
    logout: function (req,res) {
        delete req.session.user
        res.clearCookie('recordame');
        res.redirect('/')
    },
    getCreateForm: function (req,res) {
        res.render('users/register', {
            body: {},
            localidades: dataGeo.localidades()
        })
    },
    postCreateForm: function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const newUser = users.create(req.body, req.files)
            if (newUser) {
                res.redirect(`users/login`)
            }
        }
    },
    update: function (req,res) {
        let { id } = req.params
        if (req.method == 'GET') {
            res.render('users/edit-user', { userData: users.detail(id)})
        }
        else if (req.method == 'PUT') {
            console.log(req.files)
            //const imagen = req.files.map(x => {return x.path})
            const updatedData = users.update({...req.body, imagen })
            if (updatedData) {
                res.send(updatedData)
            }
        }
        // const updatedUser = users.update(req.body)
        // if (updatedUser) {
        //     res.send(`el usuario ${newUser.name} fue actualizado con exito!`)
        // }
    }
}

module.exports = usersController