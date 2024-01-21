let provincias = document.querySelector('select[name="provincia"]');
let selectedLocalidad = provincias.selectedOptions[0].innerText
let previous = document.querySelector('label#'+selectedLocalidad.split(" ").join(""))

provincias.addEventListener('change', function() {
    previous? previous.style = "display:none;" : null;
    let prov = provincias.selectedOptions[0].innerText
    let selected = 'label#'+prov.split(" ").join("")
    previous = document.querySelector(selected)
    previous.style = "display:block;"
})
