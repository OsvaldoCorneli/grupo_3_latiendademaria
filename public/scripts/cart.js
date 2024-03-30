
const cartascart = document.querySelectorAll(".cartascart")


cartascart.forEach((e) => {
    const sumar = document.querySelector(`#${e.id} #sumar`)
    const restar = document.querySelector(`#${e.id} #restar`)
    const subTotal = document.querySelector(`#${e.id} #subtotalproduct`) 
    const count = document.querySelector(`#${e.id} #cantidad`).value
    const totalCompleto = document.querySelector("#subtotalfinal")
    const stock = document.querySelector(`#${e.id} #tdcolors`)
    const stockValue = document.querySelector(`#${e.id} #tdcolors`).textContent.split(" ")[1]
    
    if(parseInt(count) == 1){
        restar.disabled = true
    }

    if(parseInt(count) == parseInt(stockValue)){
        sumar.disabled = true
        stock.style.color = "red"
    }

    sumar.addEventListener("click", () => {
        const cantidad = document.querySelector(`#${e.id} #cantidad`).value
        const precioindividual = parseFloat(document.querySelector(`#${e.id} #precio`).textContent)
        let subTotalSuma = parseFloat(subTotal.textContent) + precioindividual 
        subTotal.textContent = subTotalSuma.toFixed(2)
        
        if(cantidad > 1){
            restar.disabled = false
        }

        
        const cantidadfinal = parseInt(document.querySelector(`#cantidadTotal`).textContent)
        const sumacantidad = cantidadfinal + 1
        document.querySelector(`#cantidadTotal`).textContent = sumacantidad
        

        const precioFinal = parseFloat(document.querySelector("#precioSubTotal").textContent)
        const sumaPrecioFinal = precioFinal + precioindividual
        document.querySelector("#precioSubTotal").textContent = sumaPrecioFinal.toFixed(2)
        totalCompleto.textContent = sumaPrecioFinal.toFixed(2)

        if(cantidad == stockValue){
            sumar.disabled = true;
            stock.style.color = "red"
        }
        
    })

    restar.addEventListener("click", (element) => {
        const cantidad = document.querySelector(`#${e.id} #cantidad`).value
        const precioindividual = parseFloat(document.querySelector(`#${e.id} #precio`).textContent)
        let subTotalresta = parseFloat(subTotal.textContent) - precioindividual 
        subTotal.textContent = subTotalresta.toFixed(2) 
        
        if(parseInt(cantidad) == 1){
            restar.disabled = true
        }

        const cantidadfinal = parseInt(document.querySelector(`#cantidadTotal`).textContent)
        const sumacantidad = cantidadfinal - 1
        document.querySelector(`#cantidadTotal`).textContent = sumacantidad

        const precioFinal = parseFloat(document.querySelector("#precioSubTotal").textContent)
        const restaPrecioFinal = precioFinal - precioindividual
        document.querySelector("#precioSubTotal").textContent = restaPrecioFinal.toFixed(2)
        totalCompleto.textContent = restaPrecioFinal.toFixed(2)

        console.log(parseInt(cantidad) < parseInt(stockValue))
        console.log(cantidad, "cantidad")
        console.log("stock", stockValue)
        if(parseInt(cantidad) < parseInt(stockValue)){
            sumar.disabled = false;
            stock.style.color = "black"
        }else{}

    })


    
})


function eliminarProducto(id, color) {
    const totals = document.querySelector("#precioSubTotal").textContent
    console.log("totals", totals)
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`/users/cart/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                color: color
            })
        })
        .then(response => {

            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.status}`);
            }
            console.log("Response", response.status)
            if(response.status === 201){
                console.log("ingresa 201")
               const productRow = document.getElementById(`product-${id}-${color}`);
               const subTotal = document.querySelector(`#product-${id}-${color} #subtotalproduct`).textContent
               const cantidad = document.querySelector(`#product-${id}-${color} #cantidad`).value
               const total = document.querySelector("#precioSubTotal")
               const cantidadTotal = document.querySelector("#cantidadTotal")
               const totalesCompleto = document.querySelector("#subtotalfinal")
            
               if (productRow) {
                   productRow.remove();
                   const newTotal = parseFloat(total.textContent) - parseFloat(subTotal);
                   total.textContent = newTotal.toFixed(2);
                   totalesCompleto.textContent = newTotal.toFixed(2);
                   cantidadTotal.textContent -= cantidad;
                   
               }
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
}