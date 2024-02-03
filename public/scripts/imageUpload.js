// Wait until the file input is changed
const imageInput = document.getElementById("imageinput")
imageInput.onchange = function() {
    //console.log(imageInput)
    const reader = new FileReader();
    reader.onload = function() {
        const image = new Image();
        image.onload = function() {
            //Create canvas which will the image to be modified
            const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
            
            // Set canvas size to image size
            const width = Math.round((image.width/image.height)*100);
            const height = Math.round((image.height/image.width)*100);
            console.log(width)
            console.log(height)
            image.width = width
            image.height = height
            canvas.width = width;
            canvas.height = height;
            //console.log(image)
            ctx.drawImage(image, 0, 0);
            
            // Add circle
            // ctx.beginPath();
            // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            // ctx.fill();
            
            // Display the canvas for visualizing purposes
            const containerImage = document.getElementById("imageRender")
            containerImage.appendChild(canvas);
            
            //Set the motified image to be content when the form is submited.
            document.getElementById("modified_image").value = canvas.toDataURL("image/jpg");    
        }
        image.src = reader.result;
        console.log(image)
    };
    reader.readAsDataURL(this.files[0]);
};