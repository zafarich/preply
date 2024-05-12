import { defineStore } from 'pinia'
import { ref } from 'vue-demi'

export const useModalStore = defineStore('modal', () => {
    const variantNotifyStartModal = ref(false)
    const endTestModal = ref(false)
    const notifyTestModal = ref(false)
    const startModal = ref(false)
    const backToModal = ref(false)
    const paymentModal = ref(false)

    return {
        variantNotifyStartModal,
        endTestModal,
        startModal,
        backToModal,
        notifyTestModal,
        paymentModal,
    }
})
