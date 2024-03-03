const host = window.location.host
window.onload = () => {
    const id = document.querySelector("input[name='id']")
    const FavoriteIcon = document.querySelector('#heart')
    FavoriteIcon.addEventListener('click', async (e) => {
        const data = await fetchData(`/api/user/favorites`, {product: id.value})
        if (data.success) {
            FavoriteIcon.firstChild.nextSibling.classList.toggle('unheart')
        }
    })
}

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