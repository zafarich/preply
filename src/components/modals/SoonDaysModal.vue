<template>
    <BaseModal
        :model-value="soonDaysModal"
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
            <div class="text-center mx-auto">
                <img src="/images/hourglass.png" class="mx-auto mb-2" />
                <div class="font-bold">{{ $t('soon_days') }}...</div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

const modalStore = useModalStore()

const { soonDaysModal } = storeToRefs(modalStore)

const close = () => {
    soonDaysModal.value = false
}
</script>

<style>
/* Your component styles here */
</style>
