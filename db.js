const HOST = "http://127.0.0.1:3000/"
export async function request(params) {
    const url = new URL(HOST  + params + '?')
    const response = await fetch(url.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}