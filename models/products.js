// const fs = require('fs')
// const path = require('path')
const db = require('../database/models')
const {Op, Sequelize} = require('sequelize');
const Images = require('./images');
const Colors = require('./colors');


// const productsFilePath = path.join(__dirname, '../data/productos.json');
// const Productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    all: async function () {
        try {
            return await db.products.findAll({
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','hex']
                        }
                    },
                    {
                        model: db.images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name']
                    }
                ],
                attributes: {exclude: ['category_id']},
                logging: false
            })
        } catch (error) {
            return error
        }
    },
    detail: async function (id) {
        try {
            return await db.products.findByPk(+id,{
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','hex']
                        }
                    },
                    {
                        model: db.images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name']
                    }
                ],
                attributes: {exclude: ['category_id']},
                logging: false
            })
        } catch (error) {
            return error
        }
    },
    filter: async function (query) {
        try {
            const {price, line, name, category, color} = query
            let condition = {}
            if (price) condition.products = {...condition.products, price: {[Op.lte]: price}};
            if (line) condition.products = {...condition.products, line: line};
            if (name) condition.products = {...condition.products, 
                [Op.or]: [
                    {name: {[Op.startsWith]: name}},
                    {name: {[Op.like]: `%${name}`}}
                ]};
            if (category) condition.categories = { ...condition.categories, id: category};
            if (color) condition.colors = {...condition.colors, color_id: color};

            return await db.products.findAll({
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','hex'],
                            
                        },
                        where: condition.colors,
                    },
                    {
                        model: db.images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name'],
                        where: condition.categories
                    }
                ],
                where: condition.products,
                attributes: {exclude: ['category_id']},
                logging: false
            })
        } catch (error) {
            return error
        }
    },
    create: async function (data, images) {
        try {
            const { name, description, line, category, color, price, stock } = data
            const newProduct = await db.products.create({
                name: name,
                description: description,
                category_id: category,
                line: line,
                price: +price
            })
            if (newProduct) {
                await colors.createProductColor(color, stock, newProduct.id)
                await Images.newProductImage(images, newProduct.id)
                return this.detail(newProduct.id)
            } else {
                throw new Error('error al crear producto')
            }
        } catch (error) {
            return error
        }
    },
    edited: async function (body) {
        try {
            await Images.editProductImages(body.imageHold, body.imagen, body.id)
            await Colors.editProductColors(body.color, body.stock, body.id)

            await db.products.update({
                    name: body.name,
                    description: body.description,
                    category_id: +body.category,
                    line: body.line,
                    price: +body.price
                },              
                {
                    where: {id: body.id}
            });
            return await this.detail(body.id)
        } catch (error) {
            return error
        }
    },
    remove: async function (id){
        try {
            //await Images.destroyProduct(id)
            //await Colors.destroyProduct(id)
            return await db.products.destroy({where: {id: id}})
        } catch (error) {
            return error
        }
    }
}