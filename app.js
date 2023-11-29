const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
//app.set('views', './carpeta-de-vistas')   <<--- ejemplo de codigo a usar si se quiere cambiar la ruta views por defecto(./views).


app.use('/', routes)


app.listen(3001,(req,res) => {
    console.log(`Server corriendo en puerto http://localhost:3001`)
});