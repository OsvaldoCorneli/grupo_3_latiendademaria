const fs = require('fs')
const path = require('path')
const db = require('../database/models')
const {Op, Sequelize} = require('sequelize')

const productsFilePath = path.join(__dirname, '../data/productos.json');
const Productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const publicPath = path.join(__dirname+'/../public')


module.exports = {
    all: async function () {
        try {
            return await db.products.findAll({
                include: [
                    {
                        model: db.colors,
                        as: 'colors',
                        attributes: ['id','name','hex'],
                        through: { attributes: [] }
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
                        model: db.colors,
                        as: 'colors',
                        attributes: ['id','name','hex'],
                        through: { attributes: [] }
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
                        model: db.colors,
                        as: 'colors',
                        attributes: ['id','name','hex'],
                        where: condition.colors,
                        through: { attributes: [] }
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
    edit: function (id) {
        return Productos.find((product) => product.id === +id)
    },
    edited: function (body) {
        const updateProduct = Productos.find((prod) => prod.id == body.id);
        const filterProduct = Productos.filter((prod) => prod.id != body.id);
        const images = this.editImages(body.imagen, body.imageHold, body.id)
        delete body.imagen
        delete body.imageHold
        const editedProduct = {
            ...updateProduct, 
            ...body,
            id: +body.id,
            color: typeof(body.color) == 'string'? [body.color] : body.color,
            stock: +body.stock,
            price: +body.price,
            image: images
        }
        const allProducts = [...filterProduct, editedProduct].sort((a,b) => a.id - b.id)

        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts,0,4),'utf-8')
        
        return editedProduct
    },
    destroy: function(id){
        Productos = Productos.filter((product) => product.id !== +id);
        return Productos;
    },
    editImages: function (upload, local, prodId) {
        const updateProduct = Productos.find((prod) => prod.id == prodId);
        let newImage = []
        if (upload.length > 0) {
            newImage = upload.map((img) => {return img.path.split('public')[1]});
        }
        let holdImage = []
        if (local) {
            holdImage = !typeof(local) == 'string'? local : [local];
        }
        updateProduct.image.forEach(img => {
            if (!holdImage.includes(img)) {
                if (fs.readdirSync(publicPath+'/images/uploads').includes(img.split('uploads/')[1])) {
                    fs.rmSync(publicPath+img)
                }
            }
        })
        return [...newImage, ...holdImage]
    }
}