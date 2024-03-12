function eliminarUsuario(id) {
    
    if (confirm("¿Está seguro/a de que desea eliminar su usuario?")) {
        const password = document.querySelector("#inputPassword").value;
        
        if (password) { 
            fetch(`/users/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                }),
            })
            .then(response => {
                if(response.status == 500){
                    throw new Error(response)
                }
                else{
                    return response.json()
                }
            }).then(respuesta =>{
                
                if(respuesta.success){
                    const enlaceCerrarSesion = document.getElementById('cerrarsesion');
                    if (enlaceCerrarSesion) {
                        enlaceCerrarSesion.click();
                        alert(respuesta.message);
                    }
                    
                }
                else if(respuesta.message == "La contraseña es incorrecta"){
                    alert(respuesta.message);
                } else {
                    alert(respuesta.message);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error.message);
            });
        } else {
            console.error('Contraseña no proporcionada');
        }
    }
}
