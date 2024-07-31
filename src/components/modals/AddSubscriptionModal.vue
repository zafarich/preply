<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import { useBillingStore } from 'src/stores/billing'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'

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
            tariff: tariff.value,
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
                <div class="mb-4" v-for="(item, index) in billingStore.tariffs">
                    <div class="flex justify-start gap-2">
                        <q-radio dense v-model="tariff" :val="item.id" />
                        <div>
                            {{ item.name }}
                        </div>
                    </div>

                    <!-- <BaseSelect
                        v-model="tariff"
                        emit-value
                        map-options
                        outlined
                        :placeholder="$t('select_rate')"
                        :options="billingStore.tariffs"
                        option-label="name"
                        option-value="id"
                    /> -->
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
