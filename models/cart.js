const fs = require('fs');
const path = require('path');

const products = require('./products')
const users = require('./user')


module.exports = {
    cart: function (userId) {
        const user = users.detail(userId)
        if (user?.carrito) {
            const carrito = user.carrito.map((prod) => {
                return {
                        ...products.detail(prod.id),
                        cantidad: prod.cantidad
                    }
            })
            return {...user, carrito}
        } else {
            return {}
        }
    }
}