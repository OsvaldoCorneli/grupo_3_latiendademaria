window.addEventListener("load", async function(){

    let usuarios = await fetch("http://localhost:3001/api/users?key=allUsers")
    .then(response => response.json())
    .then(data => data)
    const day = currentDay()
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let provincias = document.querySelector('input[name="provincia"]');
    let localidad = document.querySelector(`input[name="localidad"]`);
    let submitButton = document.querySelector('input[type="submit"]')
    let email = document.querySelector("#email")
    let userName = document.querySelector("#userName")
    let nombre = document.querySelector("#nombre")
    let apellido = document.querySelector("#apellido")
    let inputImagen = document.querySelector("#imageinput")
    let streetnumber = document.querySelector("#streetnumber")
    const iconoCheck = document.getElementById('iconoCheck');
    const fechaNacimiento = document.getElementById('fechaNacimiento')
    let password = document.querySelector('#password')
    let repassword = document.querySelector('#repassword')
    let codigoPostal = document.querySelector("#codigoPostal")

    const errorNombre = document.querySelector("#errorNombre")
    const errorApellido = document.querySelector("#errorApellido")
    const errorEmail = document.querySelector("#errorEmail")
    const errorUserName = document.querySelector("#errorUserName")
    const errorPassword = document.querySelector("#errorPassword")
    const errorRepetirPassword = document.querySelector("#errorRepetirPassword")
    const errorImagen = document.querySelector("#errorImagen")
    const errorFechaNacimiento = document.querySelector("#errorFechaNacimiento")
    const errorCodigoPostal = document.querySelector("#errorCodigoPostal")
    const errorStreetNumber = document.querySelector("#errorNumero")
    const requiredinput = document.querySelectorAll(".requiredinput")
    const formulario = document.querySelector("form#formulario")
    const errorProvincia = this.document.querySelector("#errorProvincia")
    let errorLocalidad = document.querySelector("#errorLocalidad")
    
    const mensaje = 'Este campo debe estar completo'

    submitButton.addEventListener("click", function(e){
        let errors = {}

        e.preventDefault()

        if(nombre.value.length < 1){
            errors.nombre = mensaje
        }
        if(apellido.value.length < 1){
            errors.apellido = mensaje
        }
        if(fechaNacimiento.value.length < 1){
            errors.fechaNacimiento = mensaje
        }
        if(inputImagen.value.length < 1){
            errors.inputImagen = mensaje
        }
        if(email.value.length < 1){
            errors.email = mensaje
        }
        if(userName.value.length < 1){
            errors.userName = mensaje
        }
        if(password.value.length < 1){
            errors.password = mensaje
        }
        if(repassword.value.length < 1){
            errors.repassword = mensaje
        }
        if(provincias.value.length == 0 || provincias.style.border == '2px solid red'){
           errors.provincia = mensaje
        }
        if (localidad.value.length == 0 || localidad.style.border == '2px solid red'){
           
           errors.localidad = mensaje
        }

        
        if(Object.keys(errors).length > 0){
         
            for(objeto in errors){

           switch(objeto) {
            case "nombre":
                nombre.style.border = '2px solid red'
                errorNombre.textContent = errors[objeto]
                errorNombre.style.display = 'block'
                break
            case "apellido":
                apellido.style.border = '2px solid red'
                errorApellido.textContent = errors[objeto]
                errorApellido.style.display = 'block'
                break
            case "fechaNacimiento":
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = errors[objeto]
                errorFechaNacimiento.style.display = 'block'
                break
            case "inputImagen":
                errorImagen.textContent = "Debe seleccionar una imagen de perfil"
                errorImagen.style.display = 'block'
                break
            case "email":
                email.style.border = '2px solid red'
                errorEmail.textContent = errors[objeto]
                errorEmail.style.display = 'block'
                break
            case "userName":
                userName.style.border = '2px solid red'
                errorUserName.textContent = errors[objeto]
                errorUserName.style.display = 'block'
                break
            case "password":
                password.style.border = '2px solid red'
                errorPassword.textContent = errors[objeto]
                errorPassword.style.display = "block"
            break
            case "repassword":
                repassword.style.border = '2px solid red'
                errorRepetirPassword.textContent = errors[objeto]
                errorRepetirPassword.style.display = "block"
            break
            case "provincia":
                provincias.style.border = '2px solid red'
                errorProvincia.textContent = errors[objeto]
                errorProvincia.style.display = "block"
            break
            case "localidad":
                localidad.style.border = '2px solid red'
                errorLocalidad.textContent = errors[objeto]
                errorLocalidad.style.display = "block" 
            break

            default:
            break

                    }     
                }
            }
        else {
            // if(validacionCompleta()){
                const promises = [
                    new Promise(resolve => resolve(validateForm(localidad.name))),
                    new Promise(resolve => resolve(validateForm(provincias.name)))
                ]
                Promise.all(promises).then(() => {
                    if (Object.keys(errores).length > 0) {
                        alert(`corregir los errores del formulario en ${Object.keys(errores).join(', ')}`)
                    } else {
                        formulario.submit()
                    }
                })
            }
        //}

    })
    
    nombre.addEventListener("input", function(e){
         
        if(e.target.value === ""){
         nombre.style.border = '2px solid red'
         errorNombre.textContent = mensaje
         errorNombre.style.display = 'block'
        }
        else if(e.target.value.length === 1){
         nombre.style.border = '2px solid red'
         errorNombre.textContent = "El nombre debe tener al menos 2 caracteres"
         errorNombre.style.display = 'block'

        }else{
            nombre.style.border = '2px solid green'
            errorNombre.style.display = 'none'
        }
    })
     
     apellido.addEventListener("input", function(e){
         
        if(e.target.value === ""){
            apellido.style.border = '2px solid red'
         errorApellido.textContent = mensaje
         errorApellido.style.display = 'block'
        }
        else if(e.target.value.length === 1){
            apellido.style.border = '2px solid red'
         errorApellido.textContent = "El nombre debe tener al menos 2 caracteres"
         errorApellido.style.display = 'block'

        }else{
            apellido.style.border = '2px solid green'
            errorApellido.style.display = 'none'

        }
 
 
    })

    email.addEventListener("input", function(e){
        
        if(e.target.value === ""){
            email.style.border = '2px solid red'
            errorEmail.textContent = mensaje
            errorEmail.style.display = 'block'
            
        }
        else if(!regex.test(e.target.value)){
            email.style.border = '2px solid red'
            errorEmail.textContent = "Debe ingresar un Email valido"
            errorEmail.style.display = 'block'
        }
        else if(usuarios.some(element => element.email === e.target.value)){
            email.style.border = '2px solid red'
            errorEmail.textContent = "Este email ya esta registrado"
            errorEmail.style.display = 'block'
        }
        else{
            email.style.border = '2px solid green'
            errorEmail.style.display = 'none'
        }
    })

    userName.addEventListener("input", function(e){
        
        if(e.target.value === ""){
            userName.style.border = '2px solid red'
            errorUserName.textContent = mensaje
            errorUserName.style.display = 'block'
        }

        else if(e.target.value.length < 6){
            userName.style.border = '2px solid red'
            errorUserName.textContent = "El nombre de usuario debe tener al menos 6 caracteres"
            errorUserName.style.display = 'block'
        }

        else if(usuarios.some(element => element.userName === e.target.value)){
            userName.style.border = '2px solid red'
            errorUserName.textContent = "El nombre de usuario ya está en uso"
            errorUserName.style.display = 'block'
        }

        else{
            userName.style.border = '2px solid green'
            errorUserName.style.display = 'none'
        }
    })

    password.addEventListener("input", function(e){
      if(e.target.value === ""){
          password.style.border = '2px solid red'
          errorPassword.textContent = mensaje;
          errorPassword.style.display = "block"

      }
      else if(e.target.value.length < 7){
        password.style.border = '2px solid red'
          errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."
          errorPassword.style.display = "block"

      }
      else if(!regexPassword.test(e.target.value)){
        password.style.border = '2px solid red'
          errorPassword.textContent = "La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial."
          errorPassword.style.display = "block"
      }
      else{
        password.style.border = '2px solid green'
          errorPassword.style.display = "none"
      }

    })

    repassword.addEventListener("input", function(e){

      if(e.target.value === ""){
        this.style.border = '2px solid red'
        errorRepetirPassword.textContent = mensaje
        errorRepetirPassword.style.display = "block"
      }
        else if(password.style.border != '2px solid green'){
         this.style.border = '2px solid red'
         errorRepetirPassword.textContent = "Ingrese una contraseña correcta"
         errorRepetirPassword.style.display = "block"
      }
        else if(password.value != e.target.value){
         this.style.border = '2px solid red'
         errorRepetirPassword.textContent = "Las contraseñas no coinciden"
         errorRepetirPassword.style.display = "block"
      }
       else{
        this.style.border = '2px solid green';
        errorRepetirPassword.style.display = "none";
        }
    })


     inputImagen.addEventListener("change", function (e){
   
     if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"|| e.target.files[0].type === "image/jpg"){
        errorImagen.style.display = "none";
        iconoCheck.style.display = 'block';
     }else{
        errorImagen.textContent = "La imagen tiene que ser formato .jpeg, .png, .jpg"
        errorImagen.style.display = "block"
        iconoCheck.style.display = 'none';
     }

    })
     
     fechaNacimiento.addEventListener("change", function(e){
        if(e.target.value === ""){
            fechaNacimiento.style.border = '2px solid red'
            errorFechaNacimiento.textContent = mensaje;
            errorFechaNacimiento.style.display = 'block'
           
        }
        else if(fechaFutura(day,e.target.value)){
            fechaNacimiento.style.border = '2px solid red'
            errorFechaNacimiento.textContent = 'No puede seleccionar una fecha en el futuro'
            errorFechaNacimiento.style.display = 'block'
        }
        else if(mayorEdad(day,e.target.value)){
            fechaNacimiento.style.border = '2px solid red'
            errorFechaNacimiento.textContent = 'Debes tener o ser mayor de 16 años'
            errorFechaNacimiento.style.display = 'block'
        }
        else if(aniospasado(day, e.target.value)){
            fechaNacimiento.style.border = '2px solid red'
            errorFechaNacimiento.textContent = 'No puede seleccionar un año tan en el pasado'
            errorFechaNacimiento.style.display = 'block'
        }
        else{
            fechaNacimiento.style.border = '2px solid green'
            errorFechaNacimiento.style.display = 'none'
        }

    })


     codigoPostal.addEventListener("input", function (e) {
        if (isNaN(parseInt(e.target.value))) {
            codigoPostal.style.border = '2px solid red';
            errorCodigoPostal.textContent = 'Tiene que ingresar solo números';
            errorCodigoPostal.style.display = 'block';
        } else {
            codigoPostal.value = e.target.value === "" ? 0 : parseInt(e.target.value);
            codigoPostal.style.border = '2px solid green';
            errorCodigoPostal.style.display = 'none';
        }
    });

    streetnumber.addEventListener("input", function (e) {
        if (isNaN(parseInt(e.target.value))) {
            streetnumber.style.border = '2px solid red';
            errorStreetNumber.textContent = 'Tiene que ingresar solo números';
            errorStreetNumber.style.display = 'block';
        } else {
            streetnumber.value = e.target.value === "" ? 0 : parseInt(e.target.value);
            streetnumber.style.border = '2px solid green';
            errorStreetNumber.style.display = 'none';
        }
    });
    
    
    function currentDay(){

      const date = new Date()
      const year = date.getFullYear();
      let mes = date.getMonth() + 1; 
      let dia = date.getDate();
      
      return `${year}-${mes}-${dia}`

    }

    function fechaFutura(hoy, value){
        let interruptor = 0
        const hoySplit = hoy.split("-") 
        const valueSplit = value.split("-") 
        
        if(parseInt(hoySplit[0]) < parseInt(valueSplit[0])){
            interruptor = 1
            
        } 
        else if(parseInt(hoySplit[1]) < parseInt(valueSplit[1]) && parseInt(hoySplit[0]) === parseInt(valueSplit[0])){
            interruptor = 1
            }
        else if(parseInt(hoySplit[1]) === parseInt(valueSplit[1]) && parseInt(hoySplit[2]) < parseInt(valueSplit[2]) && parseInt(hoySplit[0]) <= parseInt(valueSplit[0])){
            interruptor = 1
        }

        if(interruptor === 0){
            return false
           }
        else{ 
            return true
        }
            
    }

    function mayorEdad(hoy, value){
        let interruptor = 0;
        const hoySplit = hoy.split("-") //[ "2024", "3", "11" ]
        const valueSplit = value.split("-") //[ "2024", "12", "10" ]

        if(parseInt(hoySplit[0]) - parseInt(valueSplit[0]) < 16){
            interruptor = 1
            
        }
        else if(parseInt(hoySplit[0]) - parseInt(valueSplit[0]) == 16 && parseInt(hoySplit[1]) < parseInt(valueSplit[1]) ){
            interruptor = 1
            
        }
        else if(parseInt(hoySplit[1]) === parseInt(valueSplit[1]) && parseInt(hoySplit[2]) < parseInt(valueSplit[2])){
            interruptor = 1
            
        }
        
        if(interruptor === 0){
            return false
           }
        else{ 
            return true
        }
                
    }

    function aniospasado(hoy, value){
        let interruptor = 0
        const hoySplit = hoy.split("-") 
        const valueSplit = value.split("-") 
        
        if((parseInt(hoySplit[0]) - parseInt(valueSplit[0])) > 110){
            interruptor = 1
        } 
        if(interruptor === 0){
            return false
           }
        else{ 
            return true
        }
            
    }

    function validacionCompleta(){
        
        let validaciones = true

        requiredinput.forEach(element => {

            let elemento = element.id 
              elemento = document.querySelector(`#${elemento}`)
            console.log(elemento)
            if(!elemento.checkValidity()){
                validaciones = false
            }
        })
          if(validaciones && (codigoPostal.style.border != '2px solid red' && streetnumber.style.border != '2px solid red')){
            return true
          }
          else{
            return false
        }  
    }
    


    const form = document.querySelector('form#formulario')

    if (!form.localidad.value) form.localidad.disabled = true
    if (form.provincia.value) form.localidad.disabled = false
    
    let errores = {}
    async function validateForm(input) {
        try {
            const {provincia, localidad} = document.querySelector('form#formulario')
            if (document.querySelector(`small#${input}`)) {
                document.querySelector(`small#${input}`).remove()
                document.querySelector(`input[name=${input}]`).style.border = 'none'
                delete errores[input]
            }
            switch(input) {
                case 'provincia':
                    if (provincia.value.length == 0) {
                        errorProvincia.innerText = 'Debe ingresar una provincia'
                        errorProvincia.style.display = "block"
                        break}
                    const {provincias} = await fetchProvincia(provincia.value)
                    if (provincias[0].nombre !== provincia.value) {
                        errorProvincia.innerText = 'La provincia ingresada no existe'
                        errorProvincia.style.display = "block"
                    }else{
                        errorProvincia.style.display = "none"
                        provincia.style.border = "green"
                    }
                    break
                case 'localidad':
                    if (errores.provincia) break
                    if (localidad.value.length == 0) {
                        errorLocalidad.innerText = 'Debe ingresar una localidad'
                        localidad.style.border = '2px solid red'
                        errorLocalidad.style.display = "block"
                        break
                    }
                    const {localidades} = await fetchLocalidad(provincia.value, localidad.value)
                    if (!localidades.some(({nombre})=> nombre == localidad.value)){ 
                        errorLocalidad.innerText = 'Seleccionar una localidad valida'
                        localidad.style.border = '2px solid red'
                        errorLocalidad.style.display = "block"
                    }
                    else{
                        errorLocalidad.style.display = "none";
                        localidad.style.border = "green"
                    }
                    break
                default:
                    break
            }
        } catch (error) {
            alert(error.message)
        }
    }
    
    form.provincia.oninput = async (e) => {
        if (e.target.value.length > 3) {
        try {
            form.localidad.disabled = true
            form.localidad.value = ""
            if (document.querySelector(`small#${e.target.name}`)) {
                document.querySelector(`small#${e.target.name}`).remove()
                e.target.style.border = 'none'
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
                form.localidad.disabled = false
                form.provincia.focus()
                form.provincia.blur()
                s.target.remove()
            }
            e.target.parentNode.appendChild(selectProvincia)
            selectProvincia.focus()
            selectProvincia.onblur = (s) => {
                s.target.remove()
            }
        } catch (error) {
            let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
            e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
        }
    }
    }
    
    form.provincia.onblur = (e) => {
        validateForm(form.provincia.name)
        .then(() => {
            if (errores[form.provincia.name]) {
                e.target.style.border = '2px solid red'
                let errorhtml = `<small id="${e.target.name}" class="errors">${errores[e.target.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    }
    
    form.localidad.oninput = async (e) => {
        if (e.target.value.length > 3) {
        try {
            if (document.querySelector(`small#${e.target.name}`)) {
                document.querySelector(`small#${e.target.name}`).remove()
                e.target.style.border = 'none'
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
                form.localidad.focus()
                form.localidad.blur()
                s.target.remove()
            }
            e.target.parentNode.appendChild(selectLocalidad)
            selectLocalidad.focus()
            selectLocalidad.onblur = (s) => {
                s.target.remove()
            }
        } catch (error) {
            let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
            e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
        }
    }
    }
    
    form.localidad.onblur = (e) => {
        validateForm(form.localidad.name).then(()=> {
            if (errores[form.localidad.name]) {
                e.target.style.border = '2px solid red'
                let errorhtml = `<small id="${e.target.name}" class="errors">${errores[e.target.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    }
    
    async function fetchLocalidad(provincia,nombre) {
        try {
            //prop provincia es un numero de id
            //prop nombre es el nombre de la localidad
            const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&nombre=${nombre}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error.message)
        }
    }
    
    async function fetchProvincia(nombre) {
        try {
            //prop nombre es el nombre de la provincia
            const response = await fetch(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${nombre}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

})
