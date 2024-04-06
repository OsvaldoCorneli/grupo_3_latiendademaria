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
                changePass.style.display = "none"
                if(deletedCount){
                deletedCount.style.display = "none"
                }
                console.log("ingresa mis compras")
            break
            case "Mis favoritos":
                favorite.style.display = "flex"
                payment.style.display = "none"
                changePass.style.display = "none"
                if(deletedCount){
                    deletedCount.style.display = "none"
                    }
                console.log("ingresa favoritos")
            break   
            case "Eliminar Cuenta":
                deletedCount.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                changePass.style.display = "none"
                console.log("eliminar cuenta")
            break
            case "Cambiar contraseña":
                changePass.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                if(deletedCount){
                    deletedCount.style.display = "none"
                    }
                console.log("cambiar contraseña")
            break
            case "Mis productos":
                payment.style.display = "flex"
                favorite.style.display = "none"
                changePass.style.display = "none"
                console.log("mis productos")
            break
            default:
            break
            }

    })
    
    
    })
})