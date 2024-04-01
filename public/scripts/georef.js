

const form = document.querySelector('form#formulario')

if (!form.localidad.value) {
    form.localidad.disabled = true
}

let errores = {}
async function validateForm(input) {
    try {
        const {provincia, localidad} = document.querySelector('form#formulario')
        if (document.querySelector(`small#${input}`)) {
            document.querySelector(`small#${input}`).remove()
            delete errores[input]
        }
        switch(input) {
            case 'provincia':
                const {cantidad, provincias} = await fetchProvincia(provincia.value)
                if (provincias[0].nombre !== provincia.value) errores.provincia = 'la provincia ingresada no existe'
                break
            case 'localidad':
                if (errores.provincia) break
                const {localidades} = await fetchLocalidad(provincia.value, localidad.value)
                if (!localidades.some(({nombre})=> nombre == localidad.value)) errores.localidad = 'seleccionar una localidad valida'
                break
            default:
                break
        }
    } catch (error) {
        alert(error.message)
    }
}

form.provincia.onchange = async (e) => {
    try {
        form.localidad.disabled = true
        form.localidad.value = ""
        if (document.querySelector(`small#${e.target.name}`)) {
            document.querySelector(`small#${e.target.name}`).remove()
        }
        if(document.querySelector('select[name="idProvincia"]')) {
            document.querySelector('select[name="idProvincia"]').remove()
        }
        const data = await fetchProvincia(e.target.value)
        const {cantidad, provincias} = data

        const selectProvincia = document.createElement('select')
        selectProvincia.name = "idProvincia"
        selectProvincia.multiple = true
        selectProvincia.style.backgroundColor = '#B6E5DB'
        provincias.forEach((prov) => {
            const option = document.createElement('option')
            option.value = prov.id
            option.innerText = prov.nombre

            selectProvincia.appendChild(option)
        })
        selectProvincia.onchange = (s) => {
            let nombreProvincia = provincias.find(({id})=> id == s.target.value).nombre
            form.provincia.value = nombreProvincia
            validateForm(form.provincia.name)
            form.localidad.disabled = false
            s.target.remove()
        }
        selectProvincia.onfocus = () => {
            selectProvincia.onblur = (s) => {
                s.target.remove()
            }
        }
        e.target.parentNode.appendChild(selectProvincia)
        validateForm(form.provincia.name).then(()=> {
            if (errores[form.provincia.name]) {
                let errorhtml = `<small id="${form.provincia.name}" class="errors">${errores[form.provincia.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    } catch (error) {
        let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
        e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
    }
}


form.localidad.onchange = async (e) => {
    try {
        if (document.querySelector(`small#${e.target.name}`)) {
            document.querySelector(`small#${e.target.name}`).remove()
        }
        if(document.querySelector('select[name="idLocalidad"]')) {
            document.querySelector('select[name="idLocalidad"]').remove()
        }
        const {provincias} = await fetchProvincia(form.provincia.value)
        const id = provincias[0]?.id

        const {localidades} = await fetchLocalidad(id,form.localidad.value)

        const selectLocalidad = document.createElement('select')
        selectLocalidad.name = "idLocalidad"
        selectLocalidad.multiple = true
        selectLocalidad.style.backgroundColor = '#B6E5DB'
        localidades.forEach((loc) => {
            const option = document.createElement('option')
            option.value = loc.id
            option.innerText = loc.nombre
            selectLocalidad.appendChild(option)
        })
        selectLocalidad.onchange = (s) => {
            let nombreLocalidad = localidades.find(({id})=> id == s.target.value).nombre
            form.localidad.value = nombreLocalidad
            validateForm(form.localidad.name)
            s.target.remove()
        }
        e.target.parentNode.appendChild(selectLocalidad)
        validateForm(form.localidad.name).then(()=> {
            if (errores[form.localidad.name]) {
                let errorhtml = `<small id="${form.localidad.name}" class="errors">${errores[form.localidad.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    } catch (error) {
        let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
        e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
    }
}


async function fetchLocalidad(provincia,nombre) {
    try {
        //prop provincia es un numero de id
        //prop nombre es el nombre de la localidad
        const response = fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&nombre=${nombre}`)
        const data = (await response).json()
        return data
    } catch (error) {
        
    }
}

async function fetchProvincia(nombre) {
    try {
        //prop nombre es el nombre de la provincia
        const response = fetch(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${nombre}`)
        const data = (await response).json()
        return data
    } catch (error) {
        
    }
}

form.onsubmit = (f) => {
    f.preventDefault()
    let erroresValidados = Object.keys(errores)
    if (erroresValidados.length != 0) {
        erroresValidados.forEach(key => {
            let errorhtml = `<small id="${key}" class="errors">${errores[key]}</small>`
            form[key].parentNode.appendChild(errorhtml)
        })
        console.log(errores)
        alert('corregir los errores del formulario')
    } else {
        console.log(errores)
        form.submit()
    }
}