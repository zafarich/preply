<template>
    <BaseModal
        :model-value="paymentModal"
        @close="close"
        class="warning-modal"
        id="payment-modal"
    >
        <q-form @submit="submitButton">
            <div class="row items-center q-pb-none">
                <div class="title-modal"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>
            <div v-if="currentStep === 1">
                <div class="flex justify-center items-center mb-4">
                    <span class="border rounded-lg mr-2">
                        <img src="images/icons/humo.svg" />
                    </span>
                    <span class="border rounded-lg">
                        <img src="images/icons/uzcard.svg" />
                    </span>
                </div>

                <q-input
                    :label="$t('card_number')"
                    v-model="data.card_number"
                    mask="#### #### #### ####"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 19) ||
                            $t('enter_the_correct_format'),
                    ]"
                />

                <q-input
                    v-model="data.expire"
                    :label="$t('card_expire_in')"
                    mask="##/##"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 5) ||
                            $t('enter_the_correct_format'),
                    ]"
                />
                <q-checkbox
                    v-model="data.recurrent"
                    :label="$t('remember')"
                    size="sm"
                />
            </div>
            <div v-else-if="currentStep === 2">
                <q-input
                    v-model="sms_code"
                    :label="$t('sms_code')"
                    mask="######"
                    :dense="false"
                    :rules="[
                        (val) =>
                            (val && val.length === 6) ||
                            $t('error_confirmation_code'),
                    ]"
                />
            </div>

            <div class="mt-6">
                <q-btn
                    :loading="loading"
                    type="submit"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    {{ $t('add') }}
                </q-btn>
            </div>
        </q-form>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useBillingStore } from 'src/stores/billing'

import { ref } from 'vue'
import BaseInput from 'src/components/UI/BaseInput.vue'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'

const modalStore = useModalStore()
const { paymentModal } = storeToRefs(modalStore)

const data = ref({
    card_number: '',
    expire: '',
    recurrent: false,
})

const $q = useQuasar()

let sms_code = ref('')

const card_id = ref('')
const verifyData = ref({
    sent: false,
    phone: '',
    wait: 60000,
})
const loading = ref(false)

const currentStep = ref(1)
const billingStore = useBillingStore()
const userStore = useUserStore()

const addCard = async () => {
    const cardData = await billingStore.addBillingCard(data.value)

    if (cardData.id) {
        card_id.value = cardData.id
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
    loading.value = true
    try {
        if (currentStep.value == 1) {
            await addCard()
        } else {
            await verifyCard()
            userStore.getMe()
        }
    } catch (error) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            position: 'top',
            icon: 'warning',
            message: error.response.data.error.message,
        })
    }

    loading.value = false
}

const close = () => {
    paymentModal.value = false
    currentStep.value = 1
}
</script>
