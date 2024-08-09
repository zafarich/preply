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
const seletedCard = ref('')
const loading = ref(false)

const addSubscribe = async () => {
    try {
        loading.value = true
        const res = await billingStore.createSubscription({
            tariff: tariff.value.id,
            card: seletedCard.value,
        })
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
                    class="flex justify-start bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-md"
                >
                    <div>
                        <svg
                            class="fill-current w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
                            />
                        </svg>
                    </div>
                    <div v-if="tariff.unique_name == 'premium'">
                        6 oy muddatga barcha testlarni yechish imkoniyati.
                        (*Prime testlardan tashqari)
                    </div>
                    <div v-if="tariff.unique_name == 'prime'">
                        1 martalik prime (mock va blok) testlarini sotib olish
                        imkoniyati. Yani 1ta obuna 1 marta test yechish
                        imkoniyati.
                    </div>
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

<style>
/* Your component styles here */
</style>
