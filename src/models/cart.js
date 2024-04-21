const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const {Op, Association} = require('sequelize')

const products = require('./products')
const users = require('./user');
const { logging } = require('googleapis/build/src/apis/logging');
let idcont = 0

module.exports = {
    cart: async function (userId) {
        try {
            const user = await users.detail(userId);
            if (user.carrito?.length != null) {
                const cartDetails = await Promise.all(user.carrito.map(async (prod) => {
                    const producto = await products.detail(prod.id);
                    return {
                        ...producto.dataValues,
                        cantidad: prod.cantidad,
                        colorSelected: prod.color
                    };
                }));
    
                user.carrito = cartDetails;
                return user;
            } else {
                user.carrito = []
                return user
                
        } }catch (error) {
            console.log(error)
            return error;
        }
    },
    add: async function(data){
        try {
            const {body, id} = data
            const checkStock = await this.checkStock(+body.id, +body.color, +body.cantidad)
            if (checkStock instanceof(Error)) throw Error(checkStock)
            else { 
                const [addProduct, created] = await db.Cart.findOrCreate({
                    where: {
                        product_color_id: checkStock.id,
                        user_id: +id
                    },
                    defaults: {quantity: +body.cantidad},
                    logging: false
                })
                if (created) {
                    return {success: true, message: 'Producto agregado al carrito'}
                } else if (!created && addProduct.dataValues) {
                    return await this.update(data)
                } else throw new Error(`el articulo ${checkStock.product_id} y color ${checkStock.color_id} ya existen en el carrito`)
            }
        } catch (error) {
            console.log(error)
            return error
        }
    },
    update: async function(data){
        try {
            const {body, id} = data
            const checkStock = await this.checkStock(body.id, body.color, body.cantidad)
            if (checkStock instanceof(Error)) throw Error(checkStock)
            else {
                const updCart = await db.Cart.update({quantity: +body.cantidad},{
                    where: {
                        product_color_id: checkStock.id,
                        user_id: +id
                    },
                    logging: false})
                if (updCart) {
                    // console.log(updCart)
                    // console.log(+updCart.quantity,  typeof(+updCart.quantity))
                    // console.log(+body.cantidad, typeof(+body.cantidad) )
                    // updCart.quantity = +body.cantidad
                    // updCart.save()
                    return {success: true, message: 'Carrito actualizado'}
                } else if (updCart) return {success: true, message: 'carrito sin cambios'}
                else throw Error(`No se puedo actualizar la cantidad ${body.cantidad} para el producto: ${body.id} color: ${body.color}`)
            }
        } catch (error) {
            console.log(error)
            return error
        }
    },
    delete: async function (data) {
        try {
            const {body, id} = data
            const checkStock = await this.checkStock(body.id, body.color, 1)
            if (checkStock instanceof(Error)) throw Error(checkStock)
            const deleteProduct = await db.Cart.destroy({
                where: {
                    product_color_id: +checkStock.id,
                    user_id: +id,
                }
                //,logging: false
            })
            if (deleteProduct >= 1) return {success: true, message: "producto borrado con exito"}
            else throw new Error(`No se pudo borrar el producto: ${body.id}, color: ${body.color}`)
        } catch (error) {
            console.log(error)
            return error
        }
    },
    detail: async function (userid) {
        try {
            const [results, metadata] = await db.sequelize.query(`select JSON_OBJECT('id', p.id, 'name', p.name,'price', p.price, 'images', JSON_ARRAYAGG(JSON_OBJECT('id', i.id,'pathName', i.pathName))) as product, 
            JSON_OBJECT('id',c.id ,'name', c.name, 'name_es', c.name_es, 'hex', c.hex) as color, cart.quantity as quantity,pc.stock as stock from cart
            inner join product_colors pc on cart.product_color_id = pc.id
            inner join products p on p.id = pc.product_id
            inner join colors c on c.id = pc.color_id
            inner join prod_images pi on pi.product_id = p.id
            inner join images i on i.id = pi.image_id
            where cart.user_id = ${userid}
            group by pc.id;`,{logging: false})
            return results
        } catch (error) {
            return error
        }
    },
    checkStock: async function (product_id, color_id, cantidad) {
        try {
            if (+cantidad == 0) throw new Error(`La cantidad debe ser mayor a 0`)
            const data = await db.product_colors.findOne({where: {product_id, color_id, stock: {[Op.gte]: +cantidad}}, logging: false})
            if (data) return {id: data.id, product_id, color_id, cantidad, check: true}
            else throw new Error(`sin existencia de stock para el articulo ${product_id} y color ${color_id}, o no existen`)
        } catch (error) {
            return error
        }
    }

}