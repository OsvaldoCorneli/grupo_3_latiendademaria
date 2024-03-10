window.addEventListener("load", function(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const boton = document.querySelector("#loginboton")
    console.log(password)
    const errorPassword = document.querySelector("#mensajePassword")
    const errorEmail = document.querySelector("#mensajeEmail")

    email.addEventListener("input", function(e){
        const valid = document.querySelector(".validacionusername")
        if(e.target.value === ""){
            console.log(errorEmail)
            email.style.border = '2px solid red'
            errorEmail.textContent = "Este campo no puede estar vacio"
            errorEmail.style.display = "block"
            
        }
        else if(!regex.test(e.target.value)){
            email.style.border = '2px solid red'
            errorEmail.textContent = "Debe ingresar un Email valido"
            errorEmail.style.display = "block"
        }
        else{
            email.style.border = '2px solid green'
            errorEmail.style.display = "none"
        }
    })

    password.addEventListener("input", function(e){
      if(e.target.value === ""){
        password.style.border = '2px solid red';
        errorPassword.textContent = 'La contraseña no debe estar vacia'
        errorPassword.style.display = "block"
      }
      else{
        password.style.border = '2px solid green';
        errorPassword.style.display = "none"
      }


    })

boton.addEventListener("click", function(e){
  if(password.style.border == '2px solid red' || email.style.border == '2px solid red' ){
       e.preventDefault()
  }


})


})