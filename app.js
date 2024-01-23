const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loguearRuta = require('./middlewares/loguearRutas') 
const rutaNoEncontrada = require('./middlewares/rutaNoEncontrada');
const recordameMiddleware = require('./middlewares/recordameMiddleware');

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
app.use(require('./middlewares/ensureLogin'))
app.use(recordameMiddleware)

app.set('view engine', 'ejs');
//app.set('views', './carpeta-de-vistas')   <<--- ejemplo de codigo a usar si se quiere cambiar la ruta views por defecto(./views).

app.use(loguearRuta)

app.use('/products', routes.products)
app.use('/users', routes.users)
app.use('/', routes.main);

app.use(rutaNoEncontrada)

app.listen(3001,(req,res) => {
    console.log(`Server corriendo en http://localhost:3001`)
});