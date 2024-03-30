const HOST = "http://127.0.0.1:3000/"
export async function request(query,params) {
    try {
        const url = HOST + query + '?' + params
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        const data = await response.json()  
        console.log(JSON.stringify(data))
        return data
    } catch (e) {
        return null
    }
}