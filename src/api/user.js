import { api } from 'src/boot/axios'

const url = '/api/v1/users/'

export async function getLeaders(params) {
    const { data } = await api(url + 'leaders/', { params })
    return data
}

export async function getMe() {
    const { data } = await api(url + 'me/')
    return data
}

export async function me() {
    const { data } = await api(url)
    return data
}
export async function sendFileToUserTelegram(params) {
    const { data } = await api(url + 'send_file_to_user_telegram/', { params })
    return data
}

export async function login(payload) {
    const { data } = await api.post(url + 'login', payload, {
        pass: true,
    })
    return data
}

export async function register(payload) {
    const { data } = await api.post(url + 'register', payload, {
        pass: true,
    })
    return data
}

export async function updateUser(id, data) {
    await api.patch(url + `${id}/`, data, {
        pass: true,
    })
}

export async function refreshAccessToken(payload) {
    const { data } = await api.post(url + 'refresh-token/', payload, {
        pass: true,
    })
    return data
}
