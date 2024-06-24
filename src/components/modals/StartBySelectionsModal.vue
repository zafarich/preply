<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

const modalStore = useModalStore()
const { startBySelectionModal } = storeToRefs(modalStore)
const emit = defineEmits(['startTest'])

const close = () => {
    startBySelectionModal.value = false
}

const startTest = () => {
    emit('startTest')
}
</script>

<template>
    <BaseModal
        :model-value="startBySelectionModal"
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
                        {{ $t('attention') }}
                    </div>
                    <div class="font-medium mb-2 text-center">
                        {{ $t('warning_test_test') }}
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        {{ $t('cancel') }}
                    </button>
                    <button
                        @click="startTest"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        {{ $t('start') }}
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
