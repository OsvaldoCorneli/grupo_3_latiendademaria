const db = require('../database/models')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');


const usersFilePath = path.join(__dirname, '../data/users.json');
const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const dataGeoFilePath = path.join(__dirname, '../data/users.json');
const dataGeo = JSON.parse(fs.readFileSync(dataGeoFilePath, 'utf-8'));

const preferencias = path.join(__dirname, '../data/users.json');

module.exports = {
    index: async function () {
        try{
        const users = await db.Users.findAll({raw: true, logging: false})
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
       
            const { nombre, apellido, fechaNacimiento, provincia, localidad, codigoPostal, calle, calleNumero, piso, departamento, email, userName, password } = data
            const passEncriptada = bcrypt.hashSync(password, 10)
        
            const newUser = await db.Users.create({
                nombre,
                apellido,
                provincia,
                localidad,
                codigoPostal,
                calle,
                calleNumero,
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
        const Users1 = await db.Users.findAll({raw: true, logging: false})
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
    update: async function (data) {
        try {
            let { id } = data
            if(data.imagen){
                    data.imagen = data.imagen.map(element => element.path.split('public')[1]).join(', ')}
                
            let updateUser = await db.Users.findByPk(id, {raw:true, logging: false})
            if(data.imagen?.length === 0){
                {data.imagen = updateUser.imagen }
            }
            
            if(Array.isArray(data.localidad)){
                if(data.localidad.includes(updateUser.localidad) && data.localidad.length === 2){
                    data.localidad = data.localidad.filter(element => element !== updateUser.localidad)
                    data.localidad = data.localidad.join("")
                }else{
                    if(data.localidad.length > 2){
                        data.localidad = data.localidad[0]
                    }
                }
             }  

            if (updateUser) {
                const userUpdate = await db.Users.update(data,{where:{id}})
                if(userUpdate[0] === 1){
                return "Actualizado correctamente"
                } 
            } else {
                throw new Error('error en la edicion de usuario')
            }
        } catch (error) {
            return error;
        }
       
    },
    detail: async function (id) {
        try{
        const detailUser = await db.Users.findByPk(id,{logging: false})
        if (detailUser) {
            return detailUser
        } else {
            return {}
        }}catch(error){return error}
        
    }, 
    restore: function (id) {
        
    }
}