const host = window.location.host
window.onload = () => {
    const anchors = Array.from(document.querySelectorAll('a#page'));
    let currentPage = document.querySelector('.currentPage');

    anchors.forEach((a) => {
        a.addEventListener('click', (async (event) => {
        try {
            currentPage.className = ''
            currentPage = a.parentElement
            currentPage.className = 'currentPage'
            const page = +event.target.innerText
            document.querySelector('b#currentPage').innerText = page
            const perPage = 5
            const response = await fetchData(`/api/payment/user?page=${page}&perPage=${perPage}`)
            const {data} = response
            const articles = Array.from(document.querySelectorAll('article.rows'))
            articles.forEach((element, i) => {
                let [t0, referencia, t1, Total, t2, estado, t3, creacion, t4, actualizado] = element.childNodes
                if (data.length <= i) {
                    let newButton = referencia.cloneNode(true)
                    referencia.parentNode.replaceChild(newButton, referencia)
                    element.style.display = 'none'
                } else {
                    const {id, status, total, created_at,updated_at} = data[i]
                    element.style.display = 'flex'
                    referencia.innerText = id;
                    let newButton = referencia.cloneNode(true) 
                    referencia.parentNode.replaceChild(newButton, referencia)
                    newButton.addEventListener('click', async (e)=> {
                        e.preventDefault();
                        detallePayment(+id)
                    }, true);
                    Total.innerText = total;
                    estado.innerText = status;
                    estado.className = status;
                    creacion.innerHTML = `${created_at.split('T')[0]} <small>${created_at.split('T')[1].slice(0,5)}</small>`;
                    actualizado.innerHTML = `${updated_at.split('T')[0]} <small>${updated_at.split('T')[1].slice(0,5)}</small>`;
                }
            })
        } catch (error) {
            alert(error.message)
        }
        }))
    })
};

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

async function detallePayment(paymentId) {
    try {
        const response = await fetchData(`/api/payment/${paymentId}`)
        const {id,total,status,created_at,user,products} = response
        const fecha = new Date(created_at)
        const container = document.createElement('div')
        container.classList.add('detail')
        let detalle = `<div> \n
            <button id="close" class="delete">X</button>\n
            <span> \n
                <b>Referencia</b><p>${id}</p> \n
            </span>\n
            <span>\n
                <b>Fecha</b><p>${fecha.toLocaleString()}</p>\n
            </span>\n
            <span>\n
                <b>Total:</b><p class="number">${total}</p>\n
            </span>\n
            <span>\n
                <b>Estado de pago:</b><i class="${status}">${status}</i>\n
            </span>\n
            <span>\n
                <b>Usuario:</b>(${user.id})${user.apellido}, ${user.nombre}</i>\n
            </span>\n
            <table>\n
                <tbody>\n
                    <tr><th>Producto</th><th>Color</th><th>Cant</th><th>Precio</th><th>Subtotal</th></tr>`
            products.forEach(({ product, color, cantidad, precio }) => {
                detalle += `<tr>\n
                        <td><img class="product" src="${product.images[0].pathName}" alt="img"/>(${product.id})${product.name}</td>\n
                        <td><i style="background-color:${color.name};color:${color.name};border-radius:50%; border:0.1px-solid-black;">oo</i></td>\n
                        <td>${cantidad}</td>\n
                        <td class="number">${precio}</td>\n
                        <td><b class="number">${(cantidad*precio).toFixed(2)}</b></td>\n
                    </tr>`})
            detalle += `</tbody> \n
            </table>\n
        </div>`;
        container.insertAdjacentHTML('afterbegin', detalle)
        
        document.body.appendChild(container)

        const closeButton = document.querySelector('button#close')
        closeButton.addEventListener('click', () => {
            closeButton.parentNode.parentNode.remove()
        })
        window.onkeyup = (e) => {
            if (e.key == "Escape") {
                closeButton.click()
            }
        }
    } catch (error) {
        alert(error.message)
    }
};

let buttonDetail = Array.from(document.querySelectorAll('button#detail'));
buttonDetail.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        detallePayment(+e.target.innerText)
    });
});

const btnFormCategory = document.querySelector('button#category')
btnFormCategory.addEventListener('click', (e) => {
    e.preventDefault();
    btnFormCategory.disabled = true
    const container = document.createElement('div')
    //container.classList.add('detail', 'category')
    let formulario = `<button id="closeCategory" class="delete">X</button>
        <b>Nueva Categoria</b>
        <form id="newCategory" method="POST" action="/api/categories">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required/>
            <button id="postCategory" class="button">Crear</button>
        </form>`;
    container.insertAdjacentHTML('afterbegin', formulario)
    btnFormCategory.parentNode.appendChild(container)
    const form = document.querySelector('form#newCategory')
    form.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();
            const body = {
                name: form.name.value
            }
            const data = await fetchData(`/api/categories`, body)
            if (data) {
                alert('Categoria creada')
                const closeButton = document.querySelector('button#closeCategory')
                closeButton.click()
            }
        } catch (error) {
            alert(error.message)
        }
    })
    const closeButton = document.querySelector('button#closeCategory')
    closeButton.addEventListener('click', () => {
        closeButton.parentNode.remove();
        btnFormCategory.disabled = false
    })
    window.onkeyup = (e) => {
        if (e.key == "Escape") {
            closeButton.click()
        }
    }
})


