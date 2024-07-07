<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()
const router = useRouter()

const { buySubscriptionModal } = storeToRefs(modalStore)

const close = () => {
    buySubscriptionModal.value = false
}

const goToPurchase = () => {
    router.push({ name: 'profile' })
}
</script>

<template>
    <BaseModal
        :model-value="buySubscriptionModal"
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
            <div class="text-center mb-3">
                <q-icon name="eva-alert-circle-outline" color="red" size="xl" />
            </div>
            <div class="font-semibold text-lg mb-2 text-center">
                Sizda obuna mavjud emas. Iltimos obuna sotib oling
            </div>
            <button
                class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary mt-5"
                @click="goToPurchase"
            >
                {{ $t('purchase') }}
            </button>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
