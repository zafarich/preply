import * as api from 'src/api/billing'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBillingStore = defineStore('billing', () => {
    const tariffs = ref([])
    const subscriptions = ref([])
    const tariffTypes = ref([])

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

    async function getSubscriptions(params) {
        const res = await api.getSubscriptions(params)
        subscriptions.value = res.results
    }

    async function createSubscription(payload) {
        const res = await api.createSubscription(payload)
        return res
    }

    async function paySubscription(id) {
        const res = await api.paySubscription(id)
        return res
    }

    async function deleteCard(id) {
        await api.deleteCard(id)
    }

    async function getTariffTypes() {
        const response = await api.getTariffTypes()
        tariffTypes.value = response.results
    }

    return {
        tariffs,
        tariffTypes,
        addBillingCard,
        getBillingCardVerifyCode,
        sendBillingCardVerifyCode,
        getTariffs,
        getTariffTypes,
        createSubscription,
        deleteCard,
        paySubscription,
        getSubscriptions,
        subscriptions,
    }
})
