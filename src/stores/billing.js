import * as api from 'src/api/billing'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBillingStore = defineStore('billing', () => {
    const tariffs = ref([])

    async function addBillingCard(data) {
        const res = await api.addBillingCard(data)
        return res
    }

    async function getBillingCardVerifyCode(id) {
        const res = await api.getBillingCardVerifyCode(id)
        return res.result
    }

    async function sendBillingCardVerifyCode(id, data) {
        const res = await api.sendBillingCardVerifyCode(id, data)
    }

    async function getTariffs() {
        const res = await api.getTariffs()
        tariffs.value = res.results
    }

    async function getSubscriptions() {
        const res = await api.getSubscriptions()
        console.log('res', res)
    }

    async function createSubscription(payload) {
        const res = await api.createSubscription(payload)
        console.log('subsres', res)
        return res
    }

    async function paySubscription(id) {
        const res = await api.paySubscription(id)
        console.log('res', res)
        return res
    }

    async function deleteCard(id) {
        await api.deleteCard(id)
    }

    return {
        tariffs,
        addBillingCard,
        getBillingCardVerifyCode,
        sendBillingCardVerifyCode,
        getTariffs,
        createSubscription,
        deleteCard,
        paySubscription,
        getSubscriptions,
    }
})
