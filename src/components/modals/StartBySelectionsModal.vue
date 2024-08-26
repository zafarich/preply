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

                <!-- <q-toggle
                    v-model="is_agree"
                    label="Offerta shartlarini qabul qilaman"
                    class="mb-2"
                /> -->

                <!-- :disabled="!is_agree" -->
                <button
                    @click="startTest"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    {{ $t('start') }}
                </button>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { ref } from 'vue'

const modalStore = useModalStore()
const { startBySelectionModal } = storeToRefs(modalStore)
const emit = defineEmits(['startTest'])

const is_agree = ref(false)

const close = () => {
    startBySelectionModal.value = false
}

const startTest = () => {
    emit('startTest')
}
</script>

<style lang="scss"></style>
