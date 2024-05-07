<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

const emit = defineEmits(['confirmBack'])

const modalStore = useModalStore()
const { notifyTestModal } = storeToRefs(modalStore)

const confirmBack = () => {
    emit('confirmBack')
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
                        Ogohlantirish
                    </div>
                    <div class="font-medium mb-2 text-center">
                        Testni yakunlashni tavsiya qilamiz. Oraqaga qaytishni
                        tasdiqlashingiz bilan ushbu test bekor qilinadi
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        Bekor qilish
                    </button>
                    <button
                        @click="confirmBack"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        Tasdiqlash
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
