window.addEventListener("load", ()=>{
const botones = document.querySelectorAll(".submenu a li")
const payment = document.querySelector(".payments")
const favorite = document.querySelector(".favoritos")
const deletedCount = document.querySelector(".delete-acount")
const changePass = document.querySelector(".change-pass")
botones.forEach(element => {
    element.addEventListener("click", ()=>{
        switch(element.textContent){
            case "Mis compras":
                payment.style.display = "flex"
                favorite.style.display = "none"
                deletedCount.style.display = "none"
                changePass.style.display = "none"
            break
            case "Mis favoritos":
                favorite.style.display = "flex"
                payment.style.display = "none"
                deletedCount.style.display = "none"
                changePass.style.display = "none"
            break   
            case "Eliminar Cuenta":
                deletedCount.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                changePass.style.display = "none"
            break
            case "Cambiar contraseña":
                changePass.style.display = "flex"
                deletedCount.style.display = "none"
                payment.style.display = "none"
                favorite.style.display = "none"
            break
            default:
            break
            }

    })
    
    
    })
})