function eliminarProducto(id, color) {
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
            if(response.status === 201){
               const productRow = document.getElementById(`product-${id}-${color}`);
               const subTotal = document.querySelector(`#product-${id}-${color} #subtotalproduct`).innerHTML
               const cantidad = document.querySelector(`#product-${id}-${color} #cantidad`).value
               const total = document.querySelector("#totales b")
               const cantidadTotal = document.querySelector("#cantidadTotal")
           

               if (productRow) {
                   productRow.remove();
                   const newTotal = parseFloat(total.innerHTML) - subTotal;
                   total.innerHTML = newTotal.toFixed(2);
                   cantidadTotal.innerHTML -= cantidad;
                   
               }
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
}
  
  
function restarCantidad(id, color){
   const cantidad = document.querySelector(`#product-${id}-${color} #cantidad`).value

   if(parseInt(cantidad) >= 1){
       
       const precio = document.querySelector(`#product-${id}-${color} #precio`).innerHTML
       let subTotal = document.querySelector(`#product-${id}-${color} #subtotalproduct`)
       const total = document.querySelector("#totales b")
       const cantidadTotal = document.querySelector("#cantidadTotal")
       cantidadTotal.innerHTML = parseInt(cantidadTotal.innerHTML) - 1
       subtotal = parseFloat(precio)*parseInt(cantidad)
       subTotal.innerHTML = subtotal
       const newTotal = parseFloat(total.innerHTML) - parseFloat(precio)
       console.log(newTotal)
       total.innerHTML = newTotal.toFixed(2);

   }
       

}

function sumarCantidad(id, color){
   const cantidad = document.querySelector(`#product-${id}-${color} #cantidad`).value
   if(parseInt(cantidad) >= 1){
       
         
       const precio = document.querySelector(`#product-${id}-${color} #precio`).innerHTML
       let subTotal = document.querySelector(`#product-${id}-${color} #subtotalproduct`)
       const total = document.querySelector("#totales b")
       const cantidadTotal = document.querySelector("#cantidadTotal")
       cantidadTotal.innerHTML = parseInt(cantidadTotal.innerHTML) + 1
       subtotal = parseFloat(precio)*parseInt(cantidad)
       subTotal.innerHTML = subtotal.toFixed(2)
       const newTotal = parseFloat(total.innerHTML) + parseFloat(precio)
       console.log(newTotal)
       total.innerHTML = newTotal.toFixed(2);

   }}
       

  
  
