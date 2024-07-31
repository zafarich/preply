<template>
    <BaseModal
        :model-value="periodPremiumModal"
        @close="close"
        class="warning-modal"
    >
        <div>
            <div class="row items-center q-pb-none">
                <div class="title-modal"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>
            <div class="flex justify-center mb-3">
                <img src="/icons/premium.png" alt="" class="h-10 w-10" />
            </div>
            <div class="font-semibold text-lg mb-2 text-center">
                Sizning obunangiz tugash sanasi:
            </div>
            <div class="font-medium text-gray text-center">
                {{ userStore.userData.premium_expiration_date }}
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useUserStore } from 'src/stores/user'

const modalStore = useModalStore()
const userStore = useUserStore()

const { periodPremiumModal } = storeToRefs(modalStore)

const close = () => {
    periodPremiumModal.value = false
}
</script>
