const {Productos} = require('./db')

const productModels = {
    allProducts: function () {
        return Productos
    },
    productDetail: function (id) {
        return Productos.find((x) => x.id == id)
    },
    filterProducts: function (body) {
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
    allCategories: function () {
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
    }
}

module.exports = productModels