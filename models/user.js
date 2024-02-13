const db = require('../database/models')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
// const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const dataGeoFilePath = path.join(__dirname, '../data/users.json');
const dataGeo = JSON.parse(fs.readFileSync(dataGeoFilePath, 'utf-8'));

const preferencias = path.join(__dirname, '../data/users.json');

module.exports = {
    index: async function () {
        const users = await db.Users.findAll({raw: true})
        return users
    },
    create: function (data, image) {
        const imagen = image.map((x) => {return x.path.split('/public')[1]})
        const {nombre, apellido, fechanacimiento, provincia, localidad, codigopostal, calle, callenumero, piso, departamento, email, username, password} = data
        const passEncriptada = bcrypt.hashSync(password, 10)
        let id = 0
        for (let i in Users) {
            if (id < Users[i].id) id = Users[i].id
        }
        const newUser = {
            id: id+1,
            nombre,
            apellido,
            fechanacimiento,
            provincia,
            localidad,
            codigopostal,
            calle,
            callenumero,
            piso,
            departamento,
            email,
            username,
            password: passEncriptada,
            imagen
        }
        const allUsers = [...Users, newUser ]
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers,0,4), 'utf-8')
        return newUser
    },
    login: async function (data) {
        let { email, password } = data
        const Users1 = await db.Users.findAll({raw: true})
        let user = Users1.find((user) => user.email == email || user.userName == email)
        if (!user) return {access: false, error: 'usuario inexistente'}
        const checkPass = bcrypt.compareSync(password, user.password)
        if (checkPass) {
            return {...user, access: true}
        } else {
            return {access: false, error: 'contraseña incorrecta'}
        }
    },
    update: function (data) {
        let { id } = data
        const imagenes = data.imagen.map((x) => {return x.path.split('public')[1]})
        const unupdatedUsers = Users.filter(x => x.id !== id)
        let updateUser = Users.find(u => u.id == id)
        if (updateUser) {
            updateUser = {...updateUser, ...data, imagen: imagenes}
            const allUsers = [...unupdatedUsers, updateUser]
            fs.writeFileSync(usersFilePath, JSON.stringify(allUsers,0,4), 'utf-8')
            return updateUser
        } else {
            throw new Error('error en la edicion de usuario')
        }
    },
    detail: async function (id) {
        const detailUser = await db.Users.findOne({where:{id},raw:true})
        if (detailUser) {
            return detailUser
        } else {
            return {}
        }
        
    },
    restore: function (id) {
        
    }
}