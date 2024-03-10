// VALIDACION DE FORMULARIO DE PRODUCTOS 

const form = document.querySelector('form')
let errores = {}
function validateForm(inputs) {
    const {name, description, image, line, category, price } = form
    switch (inputs) {
        case 'name':
            if (name.value.length <= 2 || name.value.length > 30) errores.name = "el nombre debe tener entre 2 a 30 caracteres";
            break
        case 'description':
            if (description.value.length <= 10 || description.value.length > 140) errores.description = "la descripcion debe tener entre 10 a 140 caracteres"
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