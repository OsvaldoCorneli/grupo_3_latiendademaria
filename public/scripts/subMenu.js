window.addEventListener("load", ()=>{
const botones = document.querySelectorAll(".submenu a li")
const payment = document.querySelector(".payments")
const favorite = document.querySelector(".favoritos")
const deletedCount = document.querySelector(".delete-acount")
const changePass = document.querySelector(".change-pass")
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let changepassword = {
    currentPass: false,
    newPass: false,
    newRePass: false
}

let inputsNotEmpty = {
    currentPass: false,
    newPass: false,
    newRePass: false
}


const inputChangePass = document.querySelectorAll("#contenedor-pass input")
const botonChange = document.querySelector("#contenedor-pass a")
botonChange.addEventListener("click", (e)=>{    

    for(let errors in inputsNotEmpty){
        if(!inputsNotEmpty[errors]){
            const error = document.querySelector(`#error-${errors}`)
            error.style.display = "block"
            error.textContent = "Debe llenar este campo"
        }
    }


})


inputChangePass.forEach((element)=>{

    element.addEventListener("input",(e)=>{
        switch(element.name){
            case "currentPass":
                const errorCurrent = document.querySelector(`#error-${element.name}`)
                if(e.target.value == ""){
                    errorCurrent.style.display = "block"
                    errorCurrent.textContent = "Debe llenar este campo"
                    changepassword.currentPass = false
                    inputsNotEmpty.currentPass = false;
                }else{
                    errorCurrent.style.display = "none"
                    changepassword.currentPass = true
                    inputsNotEmpty.currentPass = true;
                }
            break
            case "newPass":
                const errorNewPass = document.querySelector(`#error-${element.name}`)
                    if(e.target.value == ""){
                        errorNewPass.style.display = "block"
                        errorNewPass.textContent = "Debe llenar este campo"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = false;
                    }
                    else if(e.target.value.length < 7){
                        errorNewPass.textContent = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."
                        errorNewPass.style.display = "block"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = true;
                      }
                      else if(!regexPassword.test(e.target.value)){
                        errorNewPass.textContent = "La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial."
                        errorNewPass.style.display = "block"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = true;
                      }
                      else{
                        errorNewPass.style.display = "none"
                        changepassword.newPass = true
                        inputsNotEmpty.newPass = true;
                      }
    
            break
            case "newRePass":
                let password = document.querySelector('#newPass')
                let errorpassword = document.querySelector("#error-newPass")
                const errorNewRePass = document.querySelector(`#error-${element.name}`)
                if(e.target.value === ""){
                    errorNewRePass.textContent = "Debe llenar este campo"
                    errorNewRePass.style.display = "block"
                    changepassword.newRePass = false
                    inputsNotEmpty.newRePass = false;
                    
                }
            else if(errorpassword.style.display != "none"){
                    
                errorNewRePass.textContent = "Ingrese una contraseña correcta"
                errorNewRePass.style.display = "block"
                changepassword.newRePass = false
                inputsNotEmpty.newRePass = true;
                    
                }
                else if(password.value != e.target.value){
                    
                    errorNewRePass.textContent = "Las contraseñas no coinciden"
                    errorNewRePass.style.display = "block"
                    changepassword.newRePass = false
                    inputsNotEmpty.newRePass = true;
                }
                else{
                    
                    errorNewRePass.style.display = "none";
                    changepassword.newRePass = true
                    inputsNotEmpty.newRePass = true;
                }                
            break
            default:
            break
        }
    })



})

botones.forEach(element => {
    element.addEventListener("click", ()=>{
        switch(element.textContent){
            case "Mis compras":
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                payment.style.display = "flex"
                favorite.style.display = "none"
                if(deletedCount){
                const inputDelete = document.querySelector("#inputPassword") 
                const errorDelete = document.querySelector("#error-deleteacount")
                errorDelete.style = "none"
                inputDelete.value = ""
                deletedCount.style.display = "none"
                }
               
            break
            case "Mis favoritos":
                favorite.style.display = "flex"
                payment.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                if(deletedCount){
                    const inputDelete = document.querySelector("#inputPassword") 
                    const errorDelete = document.querySelector("#error-deleteacount")
                    errorDelete.style = "none"
                    inputDelete.value = ""
                    deletedCount.style.display = "none"
                    }
                
            break   
            case "Eliminar Cuenta":
                deletedCount.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
               
            break
            case "Cambiar contraseña":
                changePass.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                if(deletedCount){
                    const inputDelete = document.querySelector("#inputPassword") 
                    const errorDelete = document.querySelector("#error-deleteacount")
                    errorDelete.style = "none"
                    inputDelete.value = ""
                    deletedCount.style.display = "none"
                    }
                
            break
            case "Mis productos":
                payment.style.display = "flex"
                favorite.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                
            break
            default:
            break
            }

    })
    
    
    })
})

