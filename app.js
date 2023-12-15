const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')
const methodOverride = require('method-override');
const {loguearRuta} = require('./middlewares')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
//app.set('views', './carpeta-de-vistas')   <<--- ejemplo de codigo a usar si se quiere cambiar la ruta views por defecto(./views).

app.use(loguearRuta)

app.use('/products', routes.products)
app.use('/users', routes.users)
app.use('/', routes.main);

app.use((req,res,next) => {
    res.status(404).render('404notFound' , {url: req.url})
})

app.listen(3001,(req,res) => {
    console.log(`Server corriendo en http://localhost:3001`)
});