const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const {Op} = require('sequelize')

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
                    where: [
                        {product_id: +body.id},
                        {color_id: +body.color},
                        {user_id: +id}
                    ],
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
            return error
        }
    },
    update: async function(data){
        try {
            const {body, id} = data
            const checkStock = await this.checkStock(body.id, body.color, body.cantidad)
            if (checkStock instanceof(Error)) throw Error(checkStock)
            else {
                const updCart = await db.Cart.findOne({
                    where: [
                        {product_id: +body.id},
                        {color_id: +body.color},
                        {user_id: +id}
                    ],
                    logging: false})
                if (updCart && +updCart.quantity != +body.cantidad) {
                    updCart.quantity = +body.cantidad
                    updCart.save()
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
            const deleteProduct = await db.Cart.destroy({
                where: {
                    product_id: body.id,
                    user_id: id,
                    color_id: body.color
                },logging: false})
            if (deleteProduct >= 1) return {success: true, message: "producto borrado con exito"}
            else throw new Error(`No se pudo borrar el producto: ${body.id}, color: ${body.color}`)
        } catch (error) {
            return error
        }
    },
    detail: async function (userid) {
        try {
            const data = await db.Cart.findAll({
                include: [
                    {
                        association: 'product',
                        attributes: ['id','name','price'],
                        include: {
                            association: 'images',
                            attributes: ['pathName'],
                            through: {attributes: []}
                        }
                    }
                    ,{
                        association: 'color',
                        attributes: ['id','name_es','hex'],
                        include: {
                            association: 'available',
                            attributes: ['stock']
                        }
                    }
            ],
                where: {
                    user_id: +userid
                },
                attributes: ['quantity'],
                logging: false
            })
            return data
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