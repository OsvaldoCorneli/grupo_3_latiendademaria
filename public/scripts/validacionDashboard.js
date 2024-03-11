const form = document.querySelector('form#payment')



const ArrayForm = Array.from(form)
ArrayForm.forEach((key,i) => {
    key.onchange= () => {
        document.querySelector(`small#${key.name}`) && document.querySelector(`small#${key.name}`).remove()
        delete errores[key.name]
        validateForm(key.name)
        if (errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
    key.onfocus = () => {
        document.querySelector(`small#${key.name}`) && document.querySelector(`small#${key.name}`).remove()
        delete errores[key.name]
        validateForm(key.name)
        if (errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
})

form.onsubmit = (event) => {
    if(Object.keys(errores).length > 0) {
        event.preventDefault()
        alert('corregir los errores del formulario')
    }
}