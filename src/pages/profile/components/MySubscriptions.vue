<template>
    <div class="info-card">
        <div class="flex justify-between items-center mb-4">
            <div class="font-semibold text-base items-center">
                Mening Obunalarim
            </div>
            <!-- <div class="font-semibold text-base money-text">20 000 so'm</div> -->
            <q-btn
                v-if="userStore.userVerifyCards.length > 0"
                no-caps
                color="primary"
                @click="() => (subscriptionModal = true)"
                >Sotib olish</q-btn
            >
        </div>

        <div
            v-if="billingStore.subscriptions.length > 0"
            class="grid 768:grid-cols-3 640:grid-cols-2 gap-4"
        >
            <q-card
                flat
                bordered
                v-for="(subscription, index) in billingStore.subscriptions"
                :key="index"
                class="mb-4 p-4"
            >
                <div class="flex justify-between items-center mb-8">
                    <div class="text-lg font-bold">
                        {{ subscription.tariff.name }}
                    </div>
                </div>
                <div>
                    <span class="font-bold">Tugash sanasi: </span
                    ><span>{{ formatDate(subscription.expire_date) }}</span>
                </div>
            </q-card>
        </div>

        <h1 v-else class="text-center font-semibold text-base text-gray-400">
            Sizda hozircha hech qanday obuna mavjud emas
        </h1>
    </div>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useBillingStore } from 'src/stores/billing'
import { onMounted } from 'vue'
import { useUserStore } from 'src/stores/user'
import { formatDate } from 'src/utils/helpers'

const modalStore = useModalStore()
const userStore = useUserStore()
const billingStore = useBillingStore()
const { subscriptionModal } = storeToRefs(modalStore)
</script>
