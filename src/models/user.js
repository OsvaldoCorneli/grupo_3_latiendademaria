const db = require('../database/models')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../middlewares/mailer');
const images = require('./images');


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
                for (let i in image) {
                    const uploadImage = await images.uploadFile(image[i].path)
                    imagen = uploadImage.url
                    break
                }
            }

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
        const detailUser = await db.Users.findByPk(id,{logging: false, raw: true})
        if (detailUser) {
            return detailUser
        } else {
            return {}
        }}catch(error){return error}
        
    }, 
    cartAdd: async function(data){
         
        try {
            const user = await db.Users.findByPk(data.id,{raw: true})
            
            const cart = {
                id: +data.body.id,
                cantidad: +data.body.cantidad,
                color: data.body.color || null
            }
            
            if(!user) throw new Error ("Usuario no encontrado")
            if(user.carrito == null){ 
                user.carrito = [cart]
            }
            else{
                for(let i=0; i<user.carrito.length; i++) {
                    if(user.carrito[i].id == data.body.id && user.carrito[i].color === data.body.color){
                         return false
                    }
                } user.carrito.push(cart);
            }

            const userUpdate = await db.Users.update(user,{where:{id:data.id}})
            if(userUpdate){
                return true
            }
            else{
                throw new Error ("No se agrego correctamente")
            }

        
        } catch (error) {
            return error
        }
    },
    cartDelete: async function(data){
        try {
            const user = await db.Users.findByPk(data.idUser);
    
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
    
            const newCart = user.carrito.filter(element => element.id !== data.idProduct && element.color !== data.color);
            
            await user.update({ carrito: newCart });
    
            return { success: true, message: "Producto eliminado del carrito correctamente" };

        } catch (error) {

            return { success: false, message: error };
        }
    },
    deleteUser: async function(id,password){
        try {
            const user = await db.Users.findByPk(id,{raw:true})
            const checkPass = bcrypt.compareSync(password, user.password)
            if(checkPass){
                const deleted = await db.Users.destroy({where:{id}})
                if(deleted == 1){
                    return {success: true, message: "Eliminado correctamente"}
                }
                else{ return {success: false, message: "No se pudo eliminar"}}
            }else{return {success: false, message: "La contraseña es incorrecta"}}
        } catch (error) {
             return error
        }
       
      },
    restorePassword: async function (userData) {
        try {
            const user = await this.detail(userData.id)
            if (user) {
                const email = {
                    to: user.email,
                    subject: `Restaurar contraseña de La tienda de Maria💚`,
                    text: `Querido ${user.nombre}. Restaura tu contraseña del sitio`,
                    html: `<p><strong>Querid@ ${user.nombre}</strong></p>
                    <p>restaura tu contraseña en el sitio usando el siguiente <b>Token</b>. tendras hasta 10 minutos antes de que expire. seleccionalo y copialo en el sitio<b>¡No lo compartas con nadie!</b></p>
                    <p><b>Token:</b></br>
                    ${userData.token}</p>
                    <p>Saludos,</p></br>
                    <hr>
                    <p>El equipo de La Tienda de Maria</p>
                    <p>@2024 La Tienda de Maria💚. Todos los derechos reservados.</p>
                    <img src="" alt="logo"/>
                    `
                }
                sendEmail(email.to, email.subject, email.text, email.html)
            } else {
                throw Error('el usuario no existe')
            }
        } catch (error) {
            return error
        }
    },
    updatePassword: async function (userData) {
        try {
            const {password, repeatPassword, id} = userData
            const passEncriptada = bcrypt.hashSync(password, 10)
            const updatePassword = await db.Users.update({password: passEncriptada},{where: {id: id}})
            return updatePassword
        } catch (error) {
            return error
        }
    },
}