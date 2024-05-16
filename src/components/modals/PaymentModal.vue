div
<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useBillingStore } from 'src/stores/billing'

import { ref } from 'vue'
import BaseInput from 'src/components/UI/BaseInput.vue'
import { useUserStore } from 'src/stores/user'

const modalStore = useModalStore()
const { paymentModal } = storeToRefs(modalStore)

const data = ref({
    card_number: '8600 0691 9540 6311',
    expire: '03/99',
    recurrent: false,
})
let sms_code = ref('666666')

const card_id = ref('')
const verifyData = ref({
    sent: false,
    phone: '',
    wait: 60000,
})

const currentStep = ref(1)
const billingStore = useBillingStore()
const userStore = useUserStore()

const addCard = async () => {
    const cardData = await billingStore.addBillingCard(data.value)
    if (cardData.id) {
        card_id.value = cardData.id
        console.log('cardData', cardData)
        verifyData.value = await billingStore.getBillingCardVerifyCode(
            cardData.id,
        )
        if (verifyData.value) currentStep.value = 2
    }
}

const verifyCard = async () => {
    const data = await billingStore.sendBillingCardVerifyCode(card_id.value, {
        code: sms_code.value,
    })
    paymentModal.value = false
    currentStep.value = 1
}

const submitButton = async () => {
    if (currentStep.value == 1) {
        await addCard()
    } else {
        await verifyCard()
        userStore.getMe()
    }
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
        <q-form @submit="submitButton">
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
                    v-model="data.card_number"
                    mask="#### #### #### ####"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 19) ||
                            `To'g'ri formatda kiriting`,
                    ]"
                />

                <q-input
                    v-model="data.expire"
                    label="OO/YY"
                    mask="##/##"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 5) ||
                            `To'g'ri formatda kiriting`,
                    ]"
                />
                <q-checkbox
                    v-model="data.recurrent"
                    label="Eslab qol"
                    size="sm"
                />
            </div>
            <div v-else-if="currentStep === 2">
                <q-input
                    v-model="sms_code"
                    label="SMS kod"
                    mask="######"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 6) ||
                            `Xato tasdiqlash ko'di`,
                    ]"
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
                    <!-- @click="submitButton" -->
                    <button
                        type="submit"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        Qo'shish
                    </button>
                </div>
            </div>
        </q-form>
    </BaseModal>
</template>
