const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/main.routes');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loguearRuta = require('./middlewares/loguearRutas') 
const rutaNoEncontrada = require('./middlewares/rutaNoEncontrada');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'la tienda de maria 2024', 
    resave: false, 
    saveUninitialized: false
}));
app.use(cookieParser())

app.set('view engine', 'ejs');
//app.set('views', './carpeta-de-vistas')   <<--- ejemplo de codigo a usar si se quiere cambiar la ruta views por defecto(./views).

app.use(loguearRuta)

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', mainRoutes);

app.use(rutaNoEncontrada)

app.listen(3001,(req,res) => {
    console.log(`Server corriendo en http://localhost:3001`)
});