const deleteImage = document.querySelectorAll('#deleteImageHold')

deleteImage.forEach(button => {
    button.addEventListener('click',(e) => {
        e.preventDefault();
        button.parentNode.remove()
    })
});