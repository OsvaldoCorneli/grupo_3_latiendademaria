const fs = require('fs')

let sublimadas = [
    'Tazas de cerámica',
    'Tazas de polimero',
    'Botellas hoppy',
    'Botellas de aluminio',
    'Jarrón térmico',
    'Sublimate',
    'Cuaderno tapa dura a5',
    'Cuaderno tapa blanda a5',
    'Libreta tapa dura a6',
    'Agenda perpetua',
]

let artesanales = [
    'Mates de madera',
    'Mates de calabaza y cuero',
    'Estatuillas', 
    'Cuadros'
]

let LoremIpsum = `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?`

let colores = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'brown', 'gray', 'orange', 'purple', 'pink', 'turquoise', 'cyan', 'magenta']
let idproducto = 1
let lineaArtesanal = []
for (let i = 0; i < artesanales.length; i++) {
    let colors = [colores[Math.round((colores.length-1)*Math.random())]]
    for (let i = 0; i < 2; i++) {
        let random = colores[Math.round((colores.length-1)*Math.random())]
        while (colors.includes(random)){
            random = colores[Math.round((colores.length-1)*Math.random())]
        }
        colors.push(random)
    }
    lineaArtesanal.push(
        {
            id: idproducto++,
            name: artesanales[i],
            description: LoremIpsum,
            category: artesanales[i].split(' ')[0],
            line: 'artesanal',
            image: 'https://random.imagecdn.app/260/140',
            price: Number((10000*Math.random()).toFixed(2)),
            color: colors,
        }
    )
}

let lineaSublimada = []
for (let i = 0; i < sublimadas.length; i++) {
    let colors = [colores[Math.round((colores.length-1)*Math.random())]]
    for (let i = 0; i < 2; i++) {
        let random = colores[Math.round((colores.length-1)*Math.random())]
        while (colors.includes(random)){
            random = colores[Math.round((colores.length-1)*Math.random())]
        }
        colors.push(random)
    }
    lineaSublimada.push(
        {
            id: idproducto++,
            name: sublimadas[i],
            description: LoremIpsum,
            category: sublimadas[i].split(' ')[0],
            line: 'sublimada',
            image: 'https://random.imagecdn.app/260/140',
            price: Number((10000*Math.random()).toFixed(2)),
            color: colors,
        }
    )
}

let Allproducts = [...lineaArtesanal, ...lineaSublimada].sort((a,b) => a.id - b.id)

fs.writeFileSync(__dirname+'/productos.json', JSON.stringify(Allproducts,0,4),'utf-8')