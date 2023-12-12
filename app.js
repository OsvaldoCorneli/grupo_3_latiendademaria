const express = require('express');
const morgan = require('morgan')
const path = require('path');
const app = express();
const routes = require('./routes')
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
//app.set('views', './carpeta-de-vistas')   <<--- ejemplo de codigo a usar si se quiere cambiar la ruta views por defecto(./views).

app.use('/products', routes.products)
app.use('/', routes.main);

app.listen(3001,(req,res) => {
    console.log(`Server corriendo en puerto http://localhost:3001`)
});