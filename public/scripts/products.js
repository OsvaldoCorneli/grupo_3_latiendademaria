const host = window.location.host
window.onload = () => {
    let productSection = document.querySelector("section.cards");

    let articles = Array.from(document.querySelectorAll("article"));
    let pageAnchor = document.querySelectorAll('a#page');
    pageAnchor.forEach((anchor) => {
        anchor.addEventListener('click', async (e) => {
            e.preventDefault();
            let page = e.target.innerText;
            let perPage = 12;
            let query = location.search.includes('?')? location.search : '?';
            const data = await fetchData(`/api/products${query}&page=${page}&perPage=${perPage}`);
            console.log(data)
            articles.forEach((element,i) => {
                let [t0,titulo,t1,anchorImagen,t2,precio,t3,colores,t4 ] = element.childNodes;
                if (+i >= data.length) {
                    element.style.display = 'none'
                } else {
                    let {categories, colors, created_at, id, images, line, name, price, updated_at} = data[i]
                    element.style.display = 'flex'
                    titulo.innerHTML = name;
                    anchorImagen.href = `/products/${id}`
                    anchorImagen.firstChild.src = images[0].pathName
                    precio.innerHTML = price;
                    Array.from(colores).forEach((element,i) => {
                        
                    })
                }
            })
        })
    })
    //const data = await fetchData()

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