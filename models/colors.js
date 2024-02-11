const db = require('../database/models')
const {Op, Sequelize} = require('sequelize');

module.exports = {
    all: async function(){
        try {
            const response = await db.colors.findAll({attributes: ['id','name','hex']})
            return response
        } catch (error) {
            return error
        }
    },
    countAll: async function(){
        try {
            const response = await db.colors.findAll({
                include: {
                    model: db.products,
                    as: 'products',
                    attributes: [],
                    through: {attributes: []}
                },
                attributes: [
                    'id',
                    'name',
                    'hex',
                    [Sequelize.fn('count',Sequelize.col('products.id')),'productsCount']
                ],
                group: ['colors.name'],
                raw: true
            })
            return response.filter(c => c.productsCount !== 0)
        } catch (error) {
            return error
        }
    }
}