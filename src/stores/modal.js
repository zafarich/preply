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
    const periodPremiumModal = ref(false)
    const logoutModal = ref(false)
    const tariffInfoModal = ref(false)
    const fireWorksModal = ref(false)
    const privacyModal = ref(false)
    const soonDaysModal = ref(false)
    const yhqTestStartModal = ref(false)

    function changeYHQModal(value) {
        yhqTestStartModal.value = value
    }

    function changeBuySubscriptionModal(value) {
        buySubscriptionModal.value = value
    }

    function changeLogoutModal(value) {
        logoutModal.value = value
    }

    function changeTariffInfoModal(value) {
        tariffInfoModal.value = value
    }

    function changeFireWorksModal(value) {
        fireWorksModal.value = value
    }

    function changePrivacyModal(value) {
        privacyModal.value = value
    }

    function changeSoonDaysModal(value) {
        soonDaysModal.value = value
    }

    return {
        soonDaysModal,
        tariffInfoModal,
        privacyModal,
        changePrivacyModal,
        variantNotifyStartModal,
        changeSoonDaysModal,
        periodPremiumModal,
        endTestModal,
        userEditModal,
        startModal,
        backToModal,
        notifyTestModal,
        paymentModal,
        subscriptionModal,
        startBySelectionModal,
        yhqTestStartModal,
        buySubscriptionModal,
        fireWorksModal,
        solveInfoModal,
        logoutModal,
        changeBuySubscriptionModal,
        changeYHQModal,
        changeLogoutModal,
        changeTariffInfoModal,
        changeFireWorksModal,
    }
})
