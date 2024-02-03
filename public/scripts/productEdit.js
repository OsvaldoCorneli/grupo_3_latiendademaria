const deleteImage = document.querySelectorAll('#deleteImage')

deleteImage.forEach(button => {
    button.addEventListener('click',(e) => {
        e.preventDefault();
        button.parentNode.remove()
    })
});

const inputImage = document.getElementById("image")

inputImage.addEventListener('change',(e) => {
    console.log(e)
    const reader = new FileReader();
    reader.onload = function() {
        const image = new Image();
        image.onload = function() {
        
    }
})