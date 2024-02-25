const host = window.location.host
window.onload = () => {
    let productSection = document.querySelector("section.cards")
    let articles = Array.from(document.querySelectorAll("article"))
    articles.forEach((element,i) => {
        let [t0,titulo,t1,anchorImagen,t2,precio,t3,colores,t4 ] = element.childNodes;
        
    })
};

async function fetchData(endpoint, body) {
    try {
        const response = await fetch(`http://${host}${endpoint}`,{
            method: body? 'POST' : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body) : null
        });
        const data = await response.json();
        return data
    } catch (error) {
        alert(error.message)
    }
};