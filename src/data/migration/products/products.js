const fs = require('fs')
const products = require('../../productos.json');
const categories = require('../../category.json');
const colors = require('../../colors.json');

let imageid = 1

products.forEach(e => {
    let {id,name,description, category, line, stock, image, price, color} = e
    fs.appendFileSync(__dirname+'/products.txt',`('${id}','${name}','${description}','${categories.find(e => e.name == category).id}','${line}',${price},default,default),\n`,'utf-8')
    image.forEach(i => {
        fs.appendFileSync(__dirname+'/product_images.txt',`('${id}','${imageid}'),\n`,'utf-8')
        fs.appendFileSync(__dirname+'/images.txt',`('${imageid}','${i}',default,default),\n`,'utf-8')
        imageid += 1
    })
    color.forEach(c => {
        let findcolor = colors.find(co => co.hex == c.toUpperCase())
        fs.appendFileSync(__dirname+'/product_colors.txt',`('${id}','${findcolor.id}','${Math.ceil(10*Math.random())}'),\n`,'utf-8')
    })

})