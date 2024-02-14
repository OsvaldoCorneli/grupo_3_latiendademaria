const fs = require('fs');
const path = require('path');
const users = require('./user')
const products = require('./products')
const db = require('../database/models')

const pagosPath = path.join(__dirname+'/../data/payments.json')
const pagosJson = JSON.parse(fs.readFileSync(pagosPath, 'utf-8'))

module.exports = {
    all: async function(query) {
        try {
            let condition = {}
            if (query.user) condition = {user_id: query.user}
            const response = await db.payment.findAll({
                where: condition,
                attributes: {exclude: ['user_id']},
                logging: false
            })
            if (response.length > 0) return response
            else throw Error
        } catch (error) {
            return error
        }
    },
    detallePago: async function (id) {
        try {
            return await db.payment.findAll({
                include: [
                    {   association: 'user',
                        attributes: ['id','nombre','apellido']
                    },
                    {
                        association: 'products',
                        include: [
                            {   association: 'product',
                                attributes: ['id','name'],
                                include: {
                                    model: db.images,
                                    as: 'images',
                                    attributes: ['id','pathName'],
                                    through: { attributes: [] }
                                }
                            },
                            {   association: 'color',
                                attributes: ['id','name','hex']
                            }
                        ],
                        attributes: {exclude: ['id','product_id','payment_id','color_id']}
                    }
                ],
                attributes: {exclude: ['user_id']},
                where: {id},
                logging: false
            })
        } catch (error) {
            return error
        }
    }
}