let provincias = document.querySelector('select[name="provincia"]');
let previous;

provincias.addEventListener('change', function() {
    previous? previous.style = "display:none;" : null;
    let prov = provincias.selectedOptions[0].innerText
    let selected = 'label#'+prov.split(" ").join("")
    previous = document.querySelector(selected)
    previous.style = "display:block;"
})

let password = document.querySelector('input[name="password"]')
let repassword = document.querySelector('input[name="repassword"]')
<<<<<<< HEAD
let formRegistro = document.querySelector('form');
=======
let showError = document.querySelector('p[class="error-contraseña"]')

>>>>>>> 03fc6de97ea077f4ae7ba1a3f0ebb8f986f03dde

formRegistro.addEventListener('submit', function() {
    document.querySelector('input#repassword').remove()
})
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