const BASE_URL = 'http://localhost:1338/api/v1/page-config'

async function handleResponse(res) {
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.message || 'Có lỗi xảy ra')
    }
    return json
}

export async function createPageConfig(data) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    return handleResponse(res)
}

export async function getAllPageConfigs() {
    const res = await fetch(BASE_URL, {
        credentials: 'include'
    })

    const json = await handleResponse(res)
    return json.data // ⬅️ Trả về mảng configs trực tiếp
}
