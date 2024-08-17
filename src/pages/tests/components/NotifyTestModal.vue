<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

const emit = defineEmits(['confirmBack'])

const modalStore = useModalStore()
const { notifyTestModal, endTestModal } = storeToRefs(modalStore)

const confirmBack = () => {
    emit('confirmBack')
    notifyTestModal.value = false
}

const close = () => {
    endTestModal.value = false
    notifyTestModal.value = false
}
</script>
<template>
    <BaseModal
        :model-value="notifyTestModal"
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
            <div>
                <div class="mb-8">
                    <div class="flex justify-center mb-5">
                        <img src="/images/icons/warning_circle.png" alt="" />
                    </div>

                    <div class="font-semibold text-lg mb-2 text-center">
                        {{ $t('warning') }}
                    </div>
                    <div class="font-medium mb-2 text-center">
                        {{ $t('warning_back_notify') }}
                    </div>
                </div>

                <button
                    @click="confirmBack"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    {{ $t('confirming') }}
                </button>
            </div>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
