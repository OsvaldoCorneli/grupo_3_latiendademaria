const fs = require('fs')
const path = require('path')
const db = require('../database/models')
const {Op, Sequelize} = require('sequelize');
const Images = require('./images');
const Colors = require('./colors');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const Productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
                attributes: {exclude: ['category_id']}
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
                attributes: {exclude: ['category_id']}
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
            if (color) condition.colors = {...condition.colors, id: color};

            return await db.products.findAll({
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','hex'],
                            where: condition.colors,
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
                        attributes: ['id','name'],
                        where: condition.categories
                    }
                ],
                where: condition.products,
                attributes: {exclude: ['category_id']}
            })
        } catch (error) {
            return error
        }
    },
    create: function (data, images) {
        const { name, description, line, category, color, price, stock } = data
        const image = images.map((x) => {return x.path.split('public')[1]})
        let id = 0
        for (let i in Productos) {
            if (id < Productos[i].id) id = Productos[i].id
        }
        //delete data.imagen
        const newProduct = { id: id+1, 
            ...data,
            color: typeof(color) == 'string'? [color] : color,
            stock: Number(stock),
            price: Number(price),
            image: image
        }
        const allProduct = [...Productos, newProduct ]
        fs.writeFileSync(productsFilePath, JSON.stringify(allProduct,0,4), 'utf-8')
        if (newProduct) {
            return newProduct
        } else {
            throw new Error('error al crear producto')
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
    destroy: function(id){
        Productos = Productos.filter((product) => product.id !== +id);
        return Productos;
    }
}