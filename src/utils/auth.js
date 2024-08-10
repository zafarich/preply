const KEY = 'token'

export function getTokenFromCache() {
    return localStorage.getItem(KEY)
}

export function setTokenToCache(token) {
    return localStorage.setItem(KEY, token)
}

export function removeTokenFromCache() {
    return localStorage.removeItem(KEY)
}

export async function hashUserId(userId, length = 8) {
    // Преобразуем ID пользователя в строку и затем в байты (Uint8Array)
    const encoder = new TextEncoder()
    const data = encoder.encode(String(userId))

    // Хэшируем данные с использованием SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)

    // Преобразуем хэш в строку base64
    const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

    // Возвращаем строку длиной от 5 до 10 символов
    return base64Hash.slice(0, length)
}
