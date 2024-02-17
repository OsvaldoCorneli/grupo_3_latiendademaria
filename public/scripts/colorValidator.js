let agregarColor = document.getElementById('agregar');

agregarColor.addEventListener('click', function () {
    let inputCount = document.querySelectorAll('input[type="color"]').length;
    let input = `<div>\n
        <input class="c${inputCount? inputCount : 0}" type="color" name="color" id="color" required/>\n
        <span id="c${inputCount? inputCount : 0}"></span>\n
        <input type="number" name="stock" required value="1"/>
    </div>`;

    const container = document.getElementsByClassName('container-colorinputs')[0];
    if (inputCount < 3) {
        container.insertAdjacentHTML("afterbegin", input);
        input = document.querySelector(`input[class="c${inputCount? inputCount : 0}"]`)
        input.addEventListener("change", () => {
            let spanColor = document.querySelector(`span#${input.className}`);
            var match = ntc.name(input.value);
            spanColor.innerHTML = match[1];
            spanColor.style = `color:${match[0]}`;
            input.value = match[0];
        });
    };
});

let ColorsError = document.querySelectorAll('input[type="color"]');

ColorsError.forEach((c) => {
    c.addEventListener("change", () => {
        let spanColor = document.querySelector(`span#${c.className}`);
        var match = ntc.name(c.value);
        spanColor.innerHTML = match[1];
        spanColor.style = `color:${match[0]}`;
        c.value = match[0];
    });
});


