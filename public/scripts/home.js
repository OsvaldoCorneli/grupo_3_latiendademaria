const body = document.querySelector("body")
const ruta = window.location.href
const split = ruta.split("/")
const welcome = split[split.length - 1]
let nombre = welcome.split("=")[1]

if(nombre.includes("%")){
    nombre = nombre.split("%")[0]
}

if(nombre != undefined){
    const mensaje = document.createElement("span")
    mensaje.classList.add("welcome")
    mensaje.innerHTML = `
    <div id="mensajewelcome">
    <h2> ¡Bienvenido ${nombre}! <h2> 
    <h4>Muchas gracias por elegirnos</h4>
    </div>
    `
    body.appendChild(mensaje)

    mensaje.addEventListener("click", ()=>{


    body.removeChild(mensaje)
    
    const newRuta = ruta.split("?")[0]
    
    window.history.replaceState({}, document.title, newRuta);
    
    
    })

}    
