window.addEventListener("load", async function(){

let usuarios = await fetch("http://localhost:3001/api/users?key=allUsers")
.then(response => response.json())
.then(data => data)
const URL = window.location.href
const idUser = obtenerIdDesdeUrl(URL)
const day = currentDay()



let switchInput = {
nombre: false,
apellido: false,
fechaNacimiento: false,
provincias: false,
localidad: false

};

//ELEMENTOS
let provincias = document.querySelector('select[name="provincia"]');
let selectedLocalidad = provincias.selectedOptions[0].innerText
let previous = document.querySelector('label#'+selectedLocalidad.split(" ").join(""))
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let email = document.querySelector("#email")
let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let inputImagen = document.querySelector("#imagen")
const iconoCheck = document.getElementById('iconoCheck');
const fechaNacimiento = document.querySelector('#fechaNacimiento')
let streetnumber = document.querySelector("#calleNumero")
let codigoPostal = document.querySelector("#codigoPostal")
let localidad;
let valorSeleccionado;
//ERRORES
const errorNombre = document.querySelector("#errorNombre")
const errorApellido = document.querySelector("#errorApellido")
const errorEmail = document.querySelector("#errorEmail")
const errorImagen = document.querySelector("#errorImagen")
const errorFechaNacimiento = document.querySelector("#errorFechaNacimiento")
const errorCodigoPostal = document.querySelector("#errorCodigoPostal")
const errorStreetNumber = document.querySelector("#errorNumero")
const imagenPerfil = document.getElementById("imagen")
let submitButton = document.querySelector('input[type="submit"]')
const formulario = document.querySelector("form")

//ENCONTRAR USUARIO
let usuarioFind = findUser(usuarios, idUser);
for( elemento in usuarioFind){
    if(usuarioFind[elemento] == null){
        usuarioFind[elemento] = "";
    }
}
// SI TIENE IMAGEN
if(imagenPerfil && (imagenPerfil.value != undefined || imagenPerfil != "")){
    iconoCheck.style.display = "block"
}


if(provincias.value.length > 0){
    localidad = document.querySelector(`#${provincias.value}`)
}

if( selectedLocalidad != "- seleccionar -"){
    console.log("ingreso no hay provincias")
    localidad = document.querySelector(`select[id="${selectedLocalidad}"]`);
    const localidadOption = localidad.selectedOptions[0];
    valorSeleccionado = localidadOption.value;
}

console.log("localidad", localidad)
console.log(selectedLocalidad)

//EVENTOS



submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    
    console.log("selectdLocalidad", selectedLocalidad)
    

  console.log(localidad.value)

 
  
  // Obtiene el valor de la opción seleccionada
  
  console.log("Valor seleccionado:", valorSeleccionado);
  
});


inputImagen.addEventListener("change", function (e){
   
    if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"|| e.target.files[0].type === "image/jpg"){
        iconoCheck.style.display = 'block';
        errorImagen.textContent = "Imagen cambiada";
       errorImagen.style.display = "block"
       errorImagen.style.color = "green"
       errorImagen.style.fontSize = "15px"

    }else{
       errorImagen.textContent = "La imagen tiene que ser formato .jpeg, .png, .jpg"
       errorImagen.style.display = "block"
       iconoCheck.style.display = 'none';
    }
    
});

nombre.addEventListener("input", function(e){
    

    if(e.target.value === ""){
     nombre.style.border = '2px solid red'
     errorNombre.textContent = "Este campo no puede estar vacio"
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

    if(usuarioFind.nombre === e.target.value){
        switchInput.nombre = false;
    }
    else{
        switchInput.nombre = true;
    }
    
    
});

apellido.addEventListener("input", function(e){
    
    
    if(e.target.value === ""){
        apellido.style.border = '2px solid red'
        errorApellido.textContent = "Este campo no puede estar vacio"
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
    
    if(usuarioFind.apellido === e.target.value){
        switchInput.apellido = false;
    } else {
        switchInput.apellido = true;
    }

});

fechaNacimiento.addEventListener("change", function(e){
         if(e.target.value === ""){
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = 'Debe completar este campo'
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
            else{
                fechaNacimiento.style.border = '2px solid green'
                errorFechaNacimiento.style.display = 'none'
            }

            if(usuarioFind.fechaNacimiento === e.target.value){
                switchInput.fechaNacimiento = false
                
            }
            else{
                switchInput.fechaNacimiento = true
            }
    
});

provincias.addEventListener('change', function(e) {
    
    previous? previous.style = "display:none;" : null;
    let prov = provincias.selectedOptions[0].innerText
    let selected = 'label#'+prov.split(" ").join("")
    previous = document.querySelector(selected)
    previous.style = "display:block;"

    //Cambio de localidad
    console.log(selected)
    console.log(prov)
    localidad = document.querySelector(`select[id="${prov}"]`);
    const localidadOption = localidad.selectedOptions[0];
    console.log("localidadOption", localidadOption)
    valorSeleccionado = localidadOption.value;
    console.log(valorSeleccionado, "valor")

    console.log(localidad, "ss")

    if(usuarioFind.provincia == e.target.value){
        switchInput.provincias = false
    }
    else{
        switchInput.provincias = true
    }

});


    localidad.addEventListener('change', function(e){
        console.log("cambio", e.target.value)
        console.log(valorSeleccionado)

    })


// if(selectedLocalidad){
// selectedLocalidad.addEventListener("change", function(e){
// console.log("localidad", usuarioFind.localidad)
// console.log(e.target.value)


// })
// }
    
codigoPostal.addEventListener("input", function (e) {
    switchInput = true;
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
    switchInput = true;
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

email.addEventListener("input", function(e){
    switchInput = true;    
    if(e.target.value === ""){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Este campo no puede estar vacio"
        errorEmail.style.display = 'block'
        
    }
    else if(!regex.test(e.target.value)){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Debe ingresar un Email valido"
        errorEmail.style.display = 'block'
    }
    else if(usuarios.some(element => element.email === e.target.value && element.id !== idUser)){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Este email ya esta registrado"
        errorEmail.style.display = 'block'
    }
    else{
        email.style.border = '2px solid green'
        errorEmail.style.display = 'none'
    }
});

document.getElementById("backButton").addEventListener("click", function(e) {
    e.preventDefault()
    window.history.back();
});


//FUNCIONES

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

    function obtenerIdDesdeUrl(url) {
    const regex = /\/users\/(\d+)\/update/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      return parseInt(match[1], 10);
    } else {
      return null;
    }
}

  function findUser(objet, id){
        if(Object.keys(objet).length > 0){
            let userEncontrado = objet.filter(element => element.id == id)
            return userEncontrado[0]
        }else{
            return false
        }

}


})