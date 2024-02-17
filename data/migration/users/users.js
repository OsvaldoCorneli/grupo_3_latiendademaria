const user = require('../../data/users.json');
const fs = require('fs')

for (let i in user) {
    let {id, nombre, apellido, provincia, localidad, codigopostal,
    calle, callenumero, imagen, piso, departamento, username, email,
    password, fechanacimiento, admin, carrito, favoritos} = user[i]

    fs.appendFileSync(__dirname+'/user.txt', `('${nombre}','${apellido}','${provincia}','${localidad}','${codigopostal}','${calle}','${callenumero}','${imagen}','${piso}','${departamento}','${username}','${email}','${password}','${fechanacimiento}','${admin}'),\n`, 'utf-8')
}