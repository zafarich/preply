<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { ref } from 'vue'
import BaseInput from 'src/components/UI/BaseInput.vue'

const emit = defineEmits(['confirmPayment'])

const modalStore = useModalStore()
const { paymentModal } = storeToRefs(modalStore)

const data = ref({
    card: '',
    expire_in: '',
    is_save: false,
    sms_code: '',
})

const currentStep = ref(1)

const confirmPayment = () => {
    if (currentStep === 2) {
        emit('confirmPayment')
        paymentModal.value = false
    }
    currentStep.value = 2
}

const close = () => {
    paymentModal.value = false
}
</script>

<template>
    <BaseModal
        :model-value="paymentModal"
        @close="close"
        class="warning-modal"
        id="payment-modal"
    >
        <div v-if="currentStep === 1">
            <div class="flex justify-center items-center mb-4">
                <span class="border rounded-lg h-[47px] mr-2">
                    <img src="images/icons/humo.svg" />
                </span>
                <span class="border rounded-lg h-[47px]">
                    <img src="images/icons/uzcard.svg" />
                </span>
            </div>

            <q-input
                label="Karta raqami"
                v-model="data.card"
                mask="#### #### #### ####"
                class="mb-2"
                :dense="false"
            />

            <div class="flex justify-start items-end">
                <q-input
                    v-model="data.expire_in"
                    label="OO/YY"
                    mask="##/##"
                    class="inline-block"
                    :dense="false"
                />
                <div>
                    <q-checkbox
                        v-model="data.is_save"
                        label="Eslab qol"
                        size="sm"
                    />
                </div>
            </div>
        </div>
        <div v-else-if="currentStep === 2">
            <q-input
                v-model="data.sms_code"
                label="SMS kod"
                mask="####"
                :dense="false"
            />
        </div>

        <div class="mt-6">
            <div class="grid grid-cols-2 gap-4">
                <button
                    v-close-popup
                    class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                >
                    Yopish
                </button>
                <button
                    @click="confirmPayment"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    Qo'shish
                </button>
            </div>
        </div>
    </BaseModal>
</template>
