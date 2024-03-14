// const { name } = require("ejs");

// const { format } = require("mysql2");

window.addEventListener("load", async function(){

    let usuarios = await fetch("http://localhost:3001/api/users?key=allUsers")
    .then(response => response.json())
    .then(data => data)
    const day = currentDay()
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let provincias = document.querySelector('select[name="provincia"]');
    let previous;
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
    const formulario = document.querySelector("#formulario")
    const mensaje = 'Este campo debe estar completo'



    provincias.addEventListener('change', function() {
        previous? previous.style = "display:none;" : null;
        let prov = provincias.selectedOptions[0].innerText
        let selected = 'label#'+prov.split(" ").join("")
        previous = document.querySelector(selected)
        previous.style = "display:block;"
    })

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

                     }     
                 }
              }
        else{
               
               if(validacionCompleta()){
                formulario.submit()
               }
               
        }

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
        console.log("ingresa")
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



    // let formRegistro = document.querySelector('form');
    
    // formRegistro.addEventListener('submit', function() {
    //     document.querySelector('input#repassword').remove()
    // })


})
