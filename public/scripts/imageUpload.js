// Wait until the file input is changed
const imageInput = document.getElementById("imageinput")
imageInput.onchange = function() {
    for (let i = 0; i < this.files.length; i++) { //por cada archivo subido, hacer todo lo que sigue -->
        const containerImage = document.getElementById("imageRender");
        //img tag
        const img = document.createElement("img")
        img.type = "image"
        img.src = URL.createObjectURL(imageInput.files[i])
        
        //img info
        const imageInfo = document.createElement('span');
        imageInfo.id = imageInput.files[i].name;
        imageInfo.innerHTML = `<small>${imageInput.files[i].name}, ${(imageInput.files[i].size/1024).toFixed(2)}KB</small>`;
        
        //agrego button para borrar imagen subida
        const deleteButton = document.createElement('button');
        deleteButton.id = "deleteImage";
        deleteButton.className = "deleteImage";
        deleteButton.innerHTML = "Borrar";
        deleteButton.addEventListener('click',(e) => {
            e.preventDefault();
            updateFileList(imageInput,i)
            deleteButton.parentNode.remove()
        })
        //inserto los tags al HTML
        containerImage.appendChild(imageInfo);
        imageInfo.appendChild(img);
        imageInfo.appendChild(deleteButton);
    }; //fin de la presente iteracion, continuar con el siguiente archivo, si es que hay mas.
};

let updateFileList = function (fileField, index) {
    let fileBuffer = Array.from(fileField.files);
    console.log('updatelist function:',fileBuffer)
    fileBuffer.splice(index, 1);

    /** Code from: https://stackoverflow.com/a/47172409/8145428 */
    const dT = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
      new DataTransfer(); // specs compliant (as of March 2018 only Chrome)

    for (let file of fileBuffer) { dT.items.add(file); }
    fileField.files = dT.files;
}


