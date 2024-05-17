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

    return {
        variantNotifyStartModal,
        endTestModal,
        userEditModal,
        startModal,
        backToModal,
        notifyTestModal,
        paymentModal,
        subscriptionModal,
    }
})
