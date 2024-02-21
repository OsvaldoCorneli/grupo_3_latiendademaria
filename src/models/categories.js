const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');

module.exports = {
    all: async function(){
        try {
            const response = await db.Categories.findAll({attributes: ['id','name']})
            return response
        } catch (error) {
            return error
        }
    },
    countAll: async function(){
        try {
            const response = await db.Categories.findAll({
                include: {
                    association: 'products',
                    attributes: []
                },
                attributes: [
                    'id',
                    'name',
                    [Sequelize.fn('count',Sequelize.col('products.id')),'productsCount']
                ],
                group: ['Categories.id', 'Categories.name'],
                raw:true
            })
            return response.filter(c => c.productsCount !== 0)
        } catch (error) {
            return error
        }
    }
}