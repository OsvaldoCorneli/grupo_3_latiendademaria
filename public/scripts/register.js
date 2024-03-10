window.addEventListener("load", async function(){
    let usuarios = await fetch("http://localhost:3001/api/users")
    .then(response => response.json())
    .then(data => data)
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let provincias = document.querySelector('select[name="provincia"]');
    let previous;
    let submitButton = document.querySelector('input[type="submit"]')
    let email = document.querySelector("#email")
    let userName = document.querySelector("#userName")
    let nombre = document.querySelector("#nombre")
    let apellido = document.querySelector("#apellido")

    provincias.addEventListener('change', function() {
        previous? previous.style = "display:none;" : null;
        let prov = provincias.selectedOptions[0].innerText
        let selected = 'label#'+prov.split(" ").join("")
        previous = document.querySelector(selected)
        previous.style = "display:block;"
    })
    
    let password = document.querySelector('input[name="password"]')
    let repassword = document.querySelector('input[name="repassword"]')
    let showError = document.querySelector('p[class="error-contraseña"]')
    const errorNombre = document.querySelector("#errorNombre")
    const errorApellido = document.querySelector("#errorApellido")
    const errorEmail = document.querySelector("#errorEmail")


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
 
 
     })
     
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
 
 
     })




    email.addEventListener("input", function(e){
        
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


    
    function mostrarIconoCheck(input) {
        const iconoCheck = document.getElementById('iconoCheck');
        const archivo = input.files[0];
        console.log(archivo);
        
        if (archivo) {
            iconoCheck.style.display = 'block';
        } else {
            iconoCheck.style.display = 'none';
        }
    }
    
    




    // let formRegistro = document.querySelector('form');
    
    // formRegistro.addEventListener('submit', function() {
    //     document.querySelector('input#repassword').remove()
    // })


})
