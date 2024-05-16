<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import { useBillingStore } from 'src/stores/billing'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'

const modalStore = useModalStore()
const { subscriptionModal } = storeToRefs(modalStore)

const billingStore = useBillingStore()
const userStore = useUserStore()

const tariff = ref('')
const seletedCard = ref(userStore.userCards[0]?.id)

const card = ref('')

onMounted(async () => {
    await billingStore.getTariffs()
})

const addSubscribe = async () => {
    const res = await billingStore.createSubscription({
        tariff: tariff.value,
        card: seletedCard.value,
    })
    // console.log('res', res)
    await billingStore.paySubscription(res.id)
    subscriptionModal.value = false
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
                    <BaseSelect
                        v-model="tariff"
                        emit-value
                        map-options
                        outlined
                        placeholder="Tarif tanlang"
                        :options="billingStore.tariffs"
                        option-label="name"
                        option-value="id"
                    />
                </div>

                <q-card
                    flat
                    bordered
                    v-for="(card, index) in userStore.userCards"
                    :key="index"
                    class="mb-4 p !w-auto"
                >
                    <q-radio dense v-model="seletedCard" :val="card.id" />
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            {{ card.card_number }}
                        </div>
                    </div>
                    <div>
                        {{ card.expire }}
                    </div>
                </q-card>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        Yo'q
                    </button>
                    <button
                        @click="addSubscribe"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        Qo'shish
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
