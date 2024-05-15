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

    async function createSubscription(payload) {
        const res = await api.createSubscription(payload)
        return res
    }

    return {
        addBillingCard,
        getBillingCardVerifyCode,
        sendBillingCardVerifyCode,
        getTariffs,
        createSubscription,
        tariffs,
    }
})
