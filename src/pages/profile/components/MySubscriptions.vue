<template>
    <div class="pt-5">
        <div class="flex justify-between items-center mb-4">
            <div class="font-semibold text-base items-center">
                {{ $t('my_subscriptions') }}
            </div>
            <q-btn
                v-if="userStore.userVerifyCards.length > 0"
                no-caps
                color="primary"
                @click="() => (subscriptionModal = true)"
            >
                {{ $t('purchase') }}</q-btn
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
                class="subs-card"
            >
                <div
                    class="flex justify-between items-center font-semibold mb-4"
                >
                    <div>{{ $t('subscription') }}:</div>
                    <q-badge color="warning py-1">
                        {{ subscription.tariff.name }}
                    </q-badge>
                </div>
                <div
                    class="flex justify-between items-center font-semibold mb-4"
                >
                    <div>{{ $t('price') }}:</div>
                    <div>
                        {{
                            priceFormat(
                                Math.ceil(subscription.tariff.price / 100),
                            )
                        }}
                        {{ $t('sum') }}
                    </div>
                </div>
                <div class="flex justify-between items-center font-semibold">
                    <span>{{ $t('end_date') }}: </span
                    ><span>{{ formatDate(subscription.expire_date) }}</span>
                </div>
            </q-card>
        </div>
        <div
            v-else-if="userStore.userVerifyCards.length === 0"
            class="text-center font-semibold text-base text-gray-400 mt-10"
        >
            <div>
                {{ $t('you_have_not_card_add_first') }}
            </div>
            <q-btn no-caps color="primary" @click="goToCardsTab" class="mt-10">
                {{ $t('go_to_add_card') }}
            </q-btn>
        </div>

        <h1
            v-else
            class="text-center font-semibold text-base text-gray-400 mt-10"
        >
            {{ $t('you_have_not_subscription') }}
        </h1>
    </div>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useBillingStore } from 'src/stores/billing'
import { useUserStore } from 'src/stores/user'
import { formatDate } from 'src/utils/helpers'
import { priceFormat } from 'src/utils/helpers'
import { useMainStore } from 'src/stores/main'

const modalStore = useModalStore()
const userStore = useUserStore()
const billingStore = useBillingStore()
const mainStore = useMainStore()

const { subscriptionModal } = storeToRefs(modalStore)
const { profileTab } = storeToRefs(mainStore)

function goToCardsTab() {
    profileTab.value = 'my_cards'
}
</script>

<style lang="scss">
.subs-card {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 18px;
    box-shadow: 0px 1px 4px 0px rgba(79, 68, 54, 0.05);
}
</style>
