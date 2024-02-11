const fs = require('fs')
const payment = require('../../data/payments.json');

for (let i in payment) {
    let {referencia, Userid, total,products, estado_pago, fecha} = payment[i]
    for (let x in products) {
        let {price, cantidad, id, color} = products[x]
        fs.appendFileSync(__dirname+'/payment_products.txt',`(default,'${id}','${referencia}','${cantidad}','${price}','${color}'),\n`,'utf-8')
    }
    //fs.appendFileSync(__dirname+'/payment.txt',`('${Userid}','${total}','${estado_pago}','${new Date(fecha).toISOString().replace("T"," ").slice(0,-5)}'),\n`,'utf-8')
}