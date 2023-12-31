const fs = require('fs')
const path = require('path')

const productsFilePath = path.join(__dirname, '../utils/productos.json');
const Productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsModels = {
    all: function () {
        return Productos
    },
    detail: function (id) {
        return Productos.find((x) => x.id == id)
    },
    filter: function (body) {
        let filteredProduct;
        const keys = Object.keys(body)
        function filter (condition, value, array) {
            switch (condition) {
                case 'price':
                    return array.filter((x) => x.price < parseInt(value))
                case 'category':
                    return array.filter((x) => x.category == value)
                case 'color':
                    return array.filter((x) => x.color.includes(value))
                case 'line':
                    return array.filter((x) => x.line == value)
                default:
                    break
            }
        }
        for (let i in keys) {
            let value = body[keys[i]]
            let condition = keys[i]
            
            if (i == 0) {
                filteredProduct = filter(condition, value, Productos)
            } else {
                filteredProduct = filter(condition, value, filteredProduct)
            }
            if (i == keys.length-1) return filteredProduct
        } 
    },
    categories: function () {
        let Categories = []
        for (let i in Productos) {
            let { category } = Productos[i]
            if (!Categories.includes(category)) {
                Categories.push(category)
            }
            if (i == Productos.length-1) {
                return Categories
            }
        }
    },
    colors: function () {
        let Colors = []
        for (let i in Productos) {
            let {color} = Productos[i]
            for (let x in color) {
                if (!Colors.includes(color[x])) {
                    Colors.push(color[x])
                }
            }
            if (i == Productos.length-1) return Colors
        }
    },
    create: function (data, images) {
        const { name, description, line, category, color, price } = data
        let image = images.map((x) => {return x.path.split('grupo_3_latiendademaria/public')[1]})
        let id = 0
        for (let i in Productos) {
            if (id < Productos[i].id) id = Productos[i].id
        }
        const newProduct = { id: id+1, ...data, image }
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
        const image = body.imagen.length > 0
            ? body.imagen.map((img) => {return img.path.split('public')[1]})
            : updateProduct.image;
        const editedProduct = {...updateProduct, ...body, image}
        const allProducts = [...filterProduct, editedProduct].sort((a,b) => a.id - b.id)

        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts,0,4),'utf-8')
        
        return editedProduct
    },
    destroy: function(id){
        Productos = Productos.filter((product) => product.id !== +id);
        return Productos;
    }
}

module.exports = productsModels  