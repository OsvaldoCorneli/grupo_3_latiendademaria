window.addEventListener("load", ()=>{
const botones = document.querySelectorAll(".submenu a li")
const payment = document.querySelector(".payments")
const favorite = document.querySelector(".favoritos")
const deletedCount = document.querySelector(".delete-acount")

botones.forEach(element => {
    element.addEventListener("click", ()=>{
        switch(element.textContent){
            case "Mis compras":
                payment.style.display = "flex"
                favorite.style.display = "none"
                deletedCount.style.display = "none"
            break
            case "Mis favoritos":
                favorite.style.display = "flex"
                payment.style.display = "none"
                deletedCount.style.display = "none"
            break   
            case "Eliminar Cuenta":
                deletedCount.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
            break
            case "Cambiar contraseña":
                console.log("5")
            break
            default:
            break
            }

    })
    
    
    })
})