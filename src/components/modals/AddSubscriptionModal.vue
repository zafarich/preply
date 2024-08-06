<template>
    <BaseModal
        :model-value="subscriptionModal"
        @close="close"
        class="warning-modal"
        id="add-subs-modal"
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
                <div class="font-bold text-md mb-4">
                    {{ $t('Tarifni tanlang') }}:
                </div>
                <div
                    class="mb-4"
                    v-for="(item, index) in billingStore.tariffs"
                    :key="index"
                >
                    <div class="flex justify-start flex-nowrap gap-2">
                        <q-radio dense v-model="tariff" :val="item" />
                        <div class="flex justify-between items-center w-full">
                            <div>
                                {{ item.name }}
                            </div>
                            <div>{{ getSum(item) }} {{ $t('sum') }}</div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="tariff"
                    class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                >
                    <svg
                        class="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                        />
                    </svg>
                    <div v-if="tariff.unique_name === 'premium'">
                        {{ $t('premium_info') }}
                    </div>
                    <div v-else-if="(tariff.unique_name = 'prime')">
                        {{ $t('prime_info') }}
                    </div>
                </div>

                <div
                    class="font-bold text-md mt-6 mb-4"
                    v-if="tariff && tariff.unique_name == 'prime'"
                >
                    <q-input
                        v-model="quantity"
                        type="number"
                        :min="1"
                        :label="$t('prime_test_count')"
                        outlined
                        class="no-spin-buttons"
                    />
                </div>

                <div class="font-bold text-md mt-6 mb-4">
                    {{ $t('select_card') }}:
                </div>
                <q-card
                    v-for="(card, index) in userStore.userVerifyCards"
                    :key="index"
                    class="mb-4 p !w-auto !rounded-lg cursor-pointer relative !py-2 !pl-6"
                    @click="() => (seletedCard = card.id)"
                    flat
                    bordered
                >
                    <q-radio
                        dense
                        v-model="seletedCard"
                        :val="card.id"
                        class="absolute left-2 top-2.5"
                    />
                    <div class="flex justify-between items-center mb-2 ml-3">
                        <div>
                            {{ card.card_number }}
                        </div>
                    </div>
                    <div class="ml-3">
                        {{ card.expire }}
                    </div>
                </q-card>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        {{ $t('no') }}
                    </button>

                    <q-btn
                        :loading="loading"
                        @click="addSubscribe"
                        :disabled="!tariff || !seletedCard"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        {{ $t('add') }}
                    </q-btn>
                </div>
            </div>
        </div>
    </BaseModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import { useBillingStore } from 'src/stores/billing'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
import { priceFormat } from 'src/utils/helpers'

const modalStore = useModalStore()
const { subscriptionModal } = storeToRefs(modalStore)

const billingStore = useBillingStore()
const userStore = useUserStore()

const $q = useQuasar()

const tariff = ref('')
const quantity = ref(1)
const seletedCard = ref('')
const loading = ref(false)

const addSubscribe = async () => {
    loading.value = true
    try {
        const exportData = {
            tariff: tariff.value.id,
            card: seletedCard.value,
        }

        if (tariff.value.unique_name == 'prime') {
            console.log('hi')
            exportData.quantity = quantity.value
        }

        console.log("'tarif'", tariff.value)

        const res = await billingStore.createSubscription(exportData)
        await billingStore.paySubscription(res.id)
        await billingStore.getSubscriptions({ page_size: 1000 })
        subscriptionModal.value = false
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
    subscriptionModal.value = false
}

const getSum = (item) => {
    return priceFormat(Math.ceil(item.price / 100))
}
</script>

<style>
.no-spin-buttons input::-webkit-outer-spin-button,
.no-spin-buttons input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spin-buttons input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
}
</style>
