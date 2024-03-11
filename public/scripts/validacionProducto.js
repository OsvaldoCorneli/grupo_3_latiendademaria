// VALIDACION DE FORMULARIO DE PRODUCTOS 

const form = document.querySelector('form')
let errores = {}
function validateForm(inputs) {
    const {name, description, image, line, category, price, stock, color } = document.querySelector('form')
    switch (inputs) {
        case 'name':
            if (name.value.length <= 5 || name.value.length > 30) errores.name = "el nombre debe ser mayor a 5 caracteres";
            break
        case 'description':
            if (description.value.length <= 20 || description.value.length > 140) errores.description = "la descripcion debe ser mayor a 20 caracteres"
            break
        case 'line':
            if (!line.value) errores.line = "seleccionar una linea de producto"
            break
        case 'category':
            if (!category.value) errores.category = "seleccionar una categoria"
            break
        case 'price':
            if (!price.value) errores.price = "ingresar un precio"
            if (price.value <= 0) errores.price = "el precio debe ser mayor a 0"
            break
        case 'image':
            let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
            Array.from(image.files).forEach((file,i) => {
                if (!allowedExtension.includes(file.type)) errores.image = `solo se permiten archivos ${allowedExtension.join(',')}`
            })
            break
        case 'stock':
            let stocks = Array.from(stock).length > 0? Array.from(stock) : [stock];
            stocks.forEach((el) => {
                if (el.value <= 0) errores.stock = "la cantidad debe ser mayor a 0"
            })
            break
        case 'color':
            let colors = Array.from(color).length > 0? Array.from(color) : [color];
            colors.forEach((el,i) => {
                if (colors.some((color,z) => color.value == el.value && z != i )) errores.color = "no puede haber 2 colores iguales"
            })
            break
        default:
            break
    }
} 

Array.from(form).forEach((key) => {
    key.onchange= () => {
        document.querySelector(`small#${key.name}`) && document.querySelector(`small#${key.name}`).remove()
        delete errores[key.name]
        validateForm(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
    key.onfocus = () => {
        document.querySelector(`small#${key.name}`) && document.querySelector(`small#${key.name}`).remove()
        delete errores[key.name]
        validateForm(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
})

form.onsubmit = (event) => {
    if(Object.keys(errores).length > 0) {
        console.log(Object.keys(errores))
        event.preventDefault()
        alert('corregir los errores del formulario')
    }
}