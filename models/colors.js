const db = require('../database/models')
const {Op, Sequelize} = require('sequelize');

module.exports = {
    all: async function(){
        try {
            const response = await db.colors.findAll({attributes: ['id','name','hex'], logging: false})
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
                raw: true,
                logging: false
            })
            return response.filter(c => c.productsCount !== 0)
        } catch (error) {
            return error
        }
    },
    createProductColor: async function (colors, stocks, prodId) {
        try {
            if (colors.length > 0) {
                let productColors = typeof(colors) == 'string'? [colors.toUpperCase()] : colors.map(c => {return c.toUpperCase()});
                let productStocks = typeof(stocks) == 'string'? [stocks] : stocks
                for (let i in productColors) {
                    const color = await db.colors.findOne({where: {hex: productColors[i]}})
                    await db.product_colors.create({
                        product_id: prodId,
                        color_id: color.id,
                        stock: productStocks[i]
                    })
                }
            }
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
                },
                logging: false
            })
            if (colors.length > 0) {
                let newColors = typeof(colors) == 'string'? [colors.toUpperCase()] : colors.map(c => {return c.toUpperCase()});
                for (let i in productColors) {
                    const { id, hex, products } = productColors[i]
                    if (!newColors.includes(hex)) {
                        await db.product_colors.destroy({where: {id: products[0].product_colors.id}})
                    }
                }
                for (let x in newColors) {
                    if (!productColors.some(({hex}) => hex == newColors[x])) {
                        const newColor = await db.colors.findOne({where: {hex: newColors[x]}})
                        await db.product_colors.create({
                            product_id: +prodId,
                            color_id: newColor.id,
                            stock: stock[x]
                        })
                    }
                }
            }
        } catch (error) {
            return error
        }
    },
    destroyProduct: async function (prodId) {
        try {
            const productColors = await db.colors.findAll({
                include: {
                    model: db.products,
                    as: 'products',
                    where: {id: prodId}
                },
                logging: false
            })
            for (let i in productColors) {
                const { products } = productColors[i]
                await db.product_colors.destroy({where: {id: products[0].product_colors.id}})
            }
        } catch (error) {
            return error
        }
    }
}