const KEY = 'token'
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const TELEGRAM_USER_ID = 'telegram_user_id'

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN)
}

export function setAccessToken(token) {
    return localStorage.setItem(ACCESS_TOKEN, token)
}

export function removeAccessToken() {
    return localStorage.removeItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN)
}

export function setRefreshToken(token) {
    return localStorage.setItem(REFRESH_TOKEN, token)
}

export function removeRefreshToken() {
    return localStorage.removeItem(REFRESH_TOKEN)
}

export function getTelegramUserId() {
    return localStorage.getItem(TELEGRAM_USER_ID)
}

export function setTelegramUserId(token) {
    return localStorage.setItem(TELEGRAM_USER_ID, token)
}

export function removeTelegramUserId() {
    return localStorage.removeItem(TELEGRAM_USER_ID)
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
