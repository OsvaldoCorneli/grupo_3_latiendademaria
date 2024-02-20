const sectionPagos = document.querySelector('section.common-profile')

let historialPagos = []

function fetchPagos (userData) {
    fetch('http://localhost:3001/payment?user='+userData.id)
        .then(response => response.json())
        .then(data => {
            historialPagos = data;
            console.log(historialPagos)
        })
        .catch(error => alert('hubo un error al procesar la informacion'))
}