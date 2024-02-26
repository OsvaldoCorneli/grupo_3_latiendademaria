const form = document.querySelector('form#payment')
const host = window.location.host

new Chart("paymentChart", {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            borderColor: "red",
            fill: false
        }],
    },
    options: {
    legend: {display: false}
    }
});
new Chart("userChart", {
    type: "doughnut",
    data: {
        labels: [],
        datasets: [{
        backgroundColor: [
                "rgba(0,0,255,1.0)",
                "rgba(0,0,255,0.8)",
                "rgba(0,0,255,0.6)"
            ],
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: "Top 3 Usuarios con mas volumen"
        }
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fData = new FormData(form)
    let desde = fData.get('desde')
    let hasta = fData.get('hasta')
    let estado = fData.get('estado')
    const main = document.querySelector('div#container')
    if (document.querySelector('#paymentChart')) {
        let chart = document.querySelector('#paymentChart').parentNode
        chart.remove()
    }
    const chart = `<div> \n
            <h3>Grafico Pagos</h3>\n
            <canvas id="paymentChart" style="width:100%;max-width:700px"></canvas>\n
        </div>`
    main.insertAdjacentHTML("afterbegin", chart)

    const ultimosPagos = document.querySelector('.lastsales')
    
    desde = desde? desde : new Date(2023,10,1,0,0,0).toISOString().split('T')[0];
    hasta = hasta? hasta : new Date(2023,11,31,0,0,0).toISOString().split('T')[0];
    form.desde.value = desde
    form.hasta.value = hasta
    fetch(`http://${host}/api/payment?desde=${desde}&hasta=${hasta}&estado=${estado}`)
        .then((response) => response.json())
        .then(({grafico, data, topUser}) => {
            if (data.length == 0) throw alert('No Hay Registros para la consulta')
            new Chart("paymentChart", {
                type: "line",
                data: {
                    labels: grafico.map(({fecha}) => {return fecha}),
                    datasets: [{
                        data: grafico.map(({total}) => {return total}),
                        borderColor: "red",
                        fill: false
                    }]
                },
                options: {
                legend: {display: false}
                }
            });
            new Chart("userChart", {
                type: "doughnut",
                data: {
                    labels: topUser.map(u => {return u.nombre}),
                    datasets: [{
                    backgroundColor: [
                            "green",
                            "red",
                            "blue"
                        ],
                        data: topUser.map(u => {return u.totalSales})
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Top 3 Usuarios con mas volumen"
                    }
                }
            });
            let rows = ""
            data.sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at))
            data.forEach(({id, total, status, created_at, updated_at}) => {
                const fecha = new Date(created_at)
                rows += `<tr>\n
                    <td><input type="submit" value=${id} name="detalle" class="button"/></td>\n
                    <td class="number">${total}</td><td><i class="${status}">${status}</i></td>\n
                    <td>${fecha.toLocaleString()}</td>\n
                </tr>`
            })
            document.querySelector('#emptyRow').parentNode.parentNode.remove()
            const tablaVacia = `<table>\n
            <caption>Ultimos Pagos</caption>\n
            <tbody>\n
                <tr><th>Detalle</th><th>Total</th><th>Estado</th><th>Fecha</th></tr>\n
                <tr id="emptyRow"></tr>\n
            </tbody>\n
            </table>`
            ultimosPagos.insertAdjacentHTML('afterbegin', tablaVacia)
            document.querySelector('#emptyRow').insertAdjacentHTML('beforebegin', rows)
            let detalleInput = document.querySelectorAll('input[type="submit"]')
            detalleInput.forEach(input => {
                input.addEventListener('click', (event) => {
                    event.preventDefault()
                    detallePayment(event.target.value)
                })
            })
        })
    .catch(error => {
        console.log(error);
    })
})

function detallePayment(id) {
    fetch(`http://${host}/api/payment/${id}`)
    .then((response) => response.json())
    .then(({id,total,status,created_at,user,products}) => {
        const fecha = new Date(created_at)
        const container = document.createElement('div')
        container.classList.add('detail')
        let detalle = `<div> \n
            <button class="delete">X</button>\n
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

        const closeButton = document.querySelector('button.delete')
        closeButton.addEventListener('click', () => {
            closeButton.parentNode.parentNode.remove()
        })
        window.onkeyup = (e) => {
            if (e.key == "Escape") {
                closeButton.click()
            }
        }
    })
}