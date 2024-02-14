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
        try{
        const users = await db.Users.findAll({raw: true})
        return users
        }catch (error) {
            throw new Error(error.message);
        }

    },
    create: async function (data, image) {
        try {
            let imagen = "";
            if(image){
             imagen = image.map(element => element.path.split('public')[1]).join(', ')}
       
            const { nombre, apellido, fechaNacimiento, provincia, localidad, codigopostal, calle, callenumero, piso, departamento, email, userName, password } = data
            const passEncriptada = bcrypt.hashSync(password, 10)
        
            const newUser = await db.Users.create({
                nombre,
                apellido,
                provincia,
                localidad,
                codigopostal,
                calle,
                callenumero,
                piso,
                departamento,
                email,
                userName,
                password: passEncriptada,
                fechaNacimiento,
                imagen
            });
            return newUser; 

        } catch (error) {
            throw new Error(error.message);
        }
    }
    ,
    login: async function (data) {
        try{
        let { email, password } = data
        const Users1 = await db.Users.findAll({raw: true})
        let user = Users1.find((user) => user.email == email || user.userName == email)
        if (!user) return {access: false, error: 'usuario inexistente'}
        const checkPass = bcrypt.compareSync(password, user.password)
        if (checkPass) {
            return {...user, access: true}
        } else {
            return {access: false, error: 'contraseña incorrecta'}
        }}
        catch (error) {
            throw new Error(error.message);
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