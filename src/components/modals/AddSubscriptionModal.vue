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
                <div class="font-bold text-lg mb-4">
                    {{ $t('Tarifni tanlang') }}:
                </div>
                <q-card
                    class="mb-4 !w-auto !rounded-lg cursor-pointer relative !py-2 !pl-6"
                    v-for="(item, index) in billingStore.tariffTypes"
                    :key="index"
                    @click="() => (tariff = item)"
                >
                    <div class="flex justify-start flex-nowrap gap-2">
                        <q-radio dense v-model="tariff" :val="item" />
                        <div class="flex justify-between items-center w-full">
                            <div>
                                {{ item.name }}
                                <q-badge :label="item.quantity" />
                            </div>
                            <div>{{ getSum(item) }} {{ $t('sum') }}</div>
                        </div>
                    </div>
                </q-card>

                <div
                    v-if="tariff"
                    class="flex justify-start flex-col bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-md"
                >
                    <div v-if="tariff.unique_name == TARIFFS.PREMIUM.code">
                        {{ $t(TARIFFS.PREMIUM.info) }}
                    </div>
                    <div v-if="tariff.unique_name == TARIFFS.PRIME.code">
                        {{ $t(TARIFFS.PRIME.info) }}
                    </div>
                </div>

                <div class="font-bold text-lg mt-6 mb-4">
                    {{ $t('select_card') }}:
                </div>
                <q-card
                    v-for="(card, index) in userStore.userVerifyCards"
                    :key="index"
                    class="mb-4 !w-auto !rounded-lg cursor-pointer relative !py-2 !pl-6"
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
import { TARIFFS, TEST_TYPES } from 'src/utils/constants'
import { useMainStore } from 'src/stores/main'

const modalStore = useModalStore()
const { subscriptionModal } = storeToRefs(modalStore)

const billingStore = useBillingStore()
const userStore = useUserStore()
const mainStore = useMainStore()

const $q = useQuasar()

const tariff = ref('')
const seletedCard = ref('')
const loading = ref(false)

const addSubscribe = async () => {
    try {
        loading.value = true

        const exportData = {
            tariff_type: tariff.value.tariff_id,
            card: seletedCard.value,
        }

        console.log('exportDasta', exportData)

        const res = await billingStore.createSubscription(exportData)
        await billingStore.paySubscription(res.id)
        await billingStore.getSubscriptions({ page_size: 1000 })
        subscriptionModal.value = false

        mainStore.changeFireWorks(true)
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
<style lang="scss">
#add-subs-modal {
    .q-dialog__inner--minimized {
        padding: 10px;
    }
}
</style>
