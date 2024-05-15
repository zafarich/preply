import { api } from 'src/boot/axios'

const url = '/api/v1/billing/'

export async function addBillingCard(payload) {
    const { data } = await api.post(url + 'card/', payload)
    return data
}

export async function removeBillingCard(id) {
    const { data } = await api.delete(url + `${id}/`)
}
