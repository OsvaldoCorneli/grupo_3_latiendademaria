const host = window.location.host
window.onload = () => {
    const id = document.querySelector("input[name='id']")
    const FavoriteIcon = document.querySelector('#heart')
    FavoriteIcon.addEventListener('click', async (e) => {
        const data = await fetchData(`/api/user/favorites`, {product: id.value})
        if (data.success) {
            FavoriteIcon.firstChild.nextSibling.classList.toggle('unheart')
        }
    })
}

async function fetchData(endpoint, body) {
    try {
        const response = await fetch(`http://${host}${endpoint}`,{
            method: body? 'POST' : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body) : null
        });
        const data = await response.json();
        return data
    } catch (error) {
        alert(error.message)
    }
};


function redireccionarAlogin(){
    const response = confirm("Debe iniciar sesion para agregar el producto al carrito")
    if(response){
       window.location.href = "/users/login"
    } 
}

function addCart(id) {
const colorInput = document.querySelector(".color input:checked");
const cantidadInput = document.querySelector("#cantidad");

if (!colorInput || !cantidadInput) {
console.error('No se encontraron elementos de entrada de color o cantidad');
return;
}
const color = colorInput.value;
const cantidad = cantidadInput.value;

fetch(`/users/cart/${id}`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: id,
        cantidad: cantidad,
        color: color
    })
})
.then(response => {
    if (response.status === 500) {
        throw new Error(`Error al agregar el producto: ${response.status}`);
    }else{
   return response.json()
}})
.then(respuesta => {

    if(respuesta.success){
      if(confirm(`${respuesta.message}, ¿Le gustaría ir al carrito?`)){
          window.location.href = "/cart"
      }

    }
    else{
        alert(respuesta.message)
    }
})
.catch(error => {
    console.error('Error al agregar el producto:', error);
});
}