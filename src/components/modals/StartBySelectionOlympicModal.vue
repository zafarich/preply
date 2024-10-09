<template>
    <BaseModal
        :model-value="startByOlympicModal"
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

                <q-btn @click="startTest" class="w-full" color="primary">
                    <img src="/icons/play.png" class="h-5 w-5 mr-1" />
                    {{ $t('start') }}
                </q-btn>
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
const { startByOlympicModal } = storeToRefs(modalStore)
const emit = defineEmits(['startTest'])

const is_agree = ref(false)

const close = () => {
    startByOlympicModal.value = false
}

const startTest = () => {
    emit('startTest')
}
</script>

<style lang="scss"></style>
