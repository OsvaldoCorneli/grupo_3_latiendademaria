const products = require('./productos.json')

const fs = require('fs')

let id = 1
let categories = []
products.forEach(c => {
    if (!categories.includes(c.category)) {
        categories.push(c.category)
        fs.appendFileSync(__dirname+'/category.txt', `('${c.category}'),\n`,'utf-8')
    }
    id += 1
})