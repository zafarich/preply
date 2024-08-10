<template>
    <BaseModal
        :model-value="tariffInfoModal"
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
                {{ testType }}
            </div>
            <div class="font-medium text-gray text-center">
                {{ description }}
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

defineProps({
    testType: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        // require: true,
        default: 'dfdd',
    },
})

const modalStore = useModalStore()

const { tariffInfoModal } = storeToRefs(modalStore)

const close = () => {
    tariffInfoModal.value = false
}
</script>
