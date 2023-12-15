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
    }
}

module.exports = productsModels