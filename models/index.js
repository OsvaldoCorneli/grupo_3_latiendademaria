const {productos} = require('./db')

const productModels = {
    allProducts: function () {
        return productos
    },
    productDetail: function (id) {
        return productos.find((x) => x.id == id)
    },
    filterProducts: function (condition, value) {
        switch (condition) {
            case 'price':
                return productos.filter((x) => x.price < value)
            case 'category':
                return productos.filter((x) => x.category == value)
            case 'color':
                return productos.filter((x) => x.color.includes(value))
            case 'line':
                return productos.filter((x) => x.line == value)
            default:
                break
        }
    }
}

module.exports = productModels