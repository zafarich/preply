import { api } from 'src/boot/axios'

const url = '/api/v1/billing/'

export async function addBillingCard(payload) {
    const { data } = await api.post(url + 'card/', payload)
    return data
}

export async function removeBillingCard(id) {
    await api.delete(url + `${id}/`)
}

export async function getBillingCardVerifyCode(id) {
    const { data } = await api.get(url + `card/${id}/get_verify_code/`)
    return data
}

export async function sendBillingCardVerifyCode(id, payload) {
    const { data } = await api.post(url + `card/${id}/verify_code/`, payload)
    return data
}

export async function deleteCard(id) {
    await api.delete(url + `card/${id}/`)
}

export async function getSubscriptions(params) {
    const { data } = await api.get(url + `subscriptions/`, params)
    return data
}

export async function createSubscription(payload) {
    const { data } = await api.post(url + 'subscriptions/', payload)
    return data
}

export async function paySubscription(id) {
    const { data } = await api.get(
        url + `subscriptions/${id}/subscription_pay/`,
    )
    return data
}

export async function getTariffs() {
    const { data } = await api.get(url + `tariffs/`)
    return data
}

export async function getTariffTypes() {
    const { data } = await api.get(url + `tariff-types/`)
    return data
}
