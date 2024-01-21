const fs = require('fs');
const path = require('path');
const users = require('./user')

const pagosPath = path.join(__dirname+'/../data/payments.json')
const pagosJson = JSON.parse(fs.readFileSync(pagosPath, 'utf-8'))

module.exports = {
    historialPagos: function (userId) {
        const user = users.detail(userId)
        if (user) {
            const historial = pagosJson.filter((pago) => pago.Userid == userId)
            if (historial) return historial
            else return []
        } else {
            return []
        }
    }
}