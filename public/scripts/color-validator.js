let agregarColor = document.getElementById('agregar')

agregarColor.addEventListener('click', function () {
    let inputCount = document.querySelectorAll('input[type="color"]').length
    let input = '<div><input class="c2" type="color" name="color" id="color"/><span id="c2"></span></div>';
    const container = document.getElementsByClassName('container-colorinputs')[0];
    if (inputCount < 3) {
        container.insertAdjacentHTML("afterbegin", input);  
    }
})


