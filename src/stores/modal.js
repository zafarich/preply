import { defineStore } from 'pinia'
import { ref } from 'vue-demi'

export const useModalStore = defineStore('modal', () => {
    const variantNotifyStartModal = ref(false)
    const endTestModal = ref(false)
    const notifyTestModal = ref(false)
    const startModal = ref(false)
    const backToModal = ref(false)
    const paymentModal = ref(false)
    const userEditModal = ref(false)
    const subscriptionModal = ref(false)
    const startBySelectionModal = ref(false)
    const buySubscriptionModal = ref(false)
    const solveInfoModal = ref(false)

    function changeBuySubscriptionModal(value) {
        buySubscriptionModal.value = value
    }

    return {
        variantNotifyStartModal,
        endTestModal,
        userEditModal,
        startModal,
        backToModal,
        notifyTestModal,
        paymentModal,
        subscriptionModal,
        startBySelectionModal,
        buySubscriptionModal,
        changeBuySubscriptionModal,
        solveInfoModal,
    }
})
