const fs = require('fs');
const path = require('path');
const users = require('./user')
const productos = require('./products')

const pagosPath = path.join(__dirname+'/../data/payments.json')
const pagosJson = JSON.parse(fs.readFileSync(pagosPath, 'utf-8'))

module.exports = {
    historialPagos: function (userId) {
        const user = users.detail(userId)
        if (user) {
            let historial = pagosJson.filter((pago) => pago.Userid == userId)
            if (historial) {
                const historialProductJoin = historial.map((z) => {
                    const products = z.products.map((p) => {
                        let {name, image} = productos.all().find((s) => s.id == p.id)
                        {return {...p, name, image: image[0]}}
                    })
                    return {...z, products}
                })
                return historialProductJoin
            }
            else return []
        } else {
            return []
        }
    }
}