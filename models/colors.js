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
    },
    editProductColors: async function (colors, stock, prodId) {
        try {
            const productColors = await db.colors.findAll({
                include: {
                    model: db.products,
                    as: 'products',
                    where: {id: prodId}
                }
            })
            if (colors.lenght > 0) {
                let newColors = typeof(colors) == 'string'? [colors.toUpperCase()] : colors.map(c => {return c.toUpperCase()});
                console.log(productColors)
                for (let i in productColors) {
                    const { id, hex, products } = productColors[i]
                    if (!newColors.includes(hex)) {
                        await db.product_colors.destroy({where: products[0].product_colors.id})
                    }
                    for (let x in newColors) {
                        if (hex !== newColors[x]) {
                            const newColor = await db.colors.findOne({where: {hex: newColors[x]}})
                            await db.product_colors.create({
                                product_id: +prodId,
                                color_id: newColor.id,
                                stock: stock[x]
                            })
                        }
                    }
                }
            }
        } catch (error) {
            return error
        }
    }
}