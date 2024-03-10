let provincias = document.querySelector('select[name="provincia"]');
let previous;
let submitButton = document.querySelector('input[type="submit"]')

fetch("")




provincias.addEventListener('change', function() {
    previous? previous.style = "display:none;" : null;
    let prov = provincias.selectedOptions[0].innerText
    let selected = 'label#'+prov.split(" ").join("")
    previous = document.querySelector(selected)
    previous.style = "display:block;"
})

let password = document.querySelector('input[name="password"]')
let repassword = document.querySelector('input[name="repassword"]')
let showError = document.querySelector('p[class="error-contraseña"]')

password.addEventListener('change', function() {
    if (password.value != repassword.value) {
        repassword.style = "border:solid-2px-red;"
        showError.style = "display:block"
    } else {
        repassword.style = "border:solid-2px-green;"
        showError.style = "display:none"
    }
})
repassword.addEventListener('change', function() {
    if (password.value != repassword.value) {
        repassword.style = "border: solid 2px red;"
        showError.style = "display:block"
    } else {
        repassword.style = "border: solid 2px green;"
        showError.style = "display:none"
    }
})

function mostrarIconoCheck(input) {
    const iconoCheck = document.getElementById('iconoCheck');
    const archivo = input.files[0];
    console.log(archivo);
    
    if (archivo) {
        iconoCheck.style.display = 'block';
    } else {
        iconoCheck.style.display = 'none';
    }
}

// let formRegistro = document.querySelector('form');

// formRegistro.addEventListener('submit', function() {
//     document.querySelector('input#repassword').remove()
// })