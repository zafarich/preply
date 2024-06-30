<script setup>
import { storeToRefs } from 'pinia'
import PaymentModal from 'src/components/modals/PaymentModal.vue'
import AddSubscriptionModal from 'src/components/modals/AddSubscriptionModal.vue'
import { useBillingStore } from 'src/stores/billing'
import { useModalStore } from 'src/stores/modal'
import { ref } from 'vue'
import { onMounted } from 'vue'
import MyCards from './components/MyCards.vue'
import MySubscriptions from './components/MySubscriptions.vue'
import PaymentHistory from './components/PaymentHistory.vue'
import UserEditModal from 'src/components/modals/UserEditModal.vue'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

const modalStore = useModalStore()
const mainStore = useMainStore()
const { paymentModal, userEditModal } = storeToRefs(modalStore)
const billingStore = useBillingStore()
const userStore = useUserStore()

const tabs = ref('my_cards')

onMounted(async () => {
    mainStore.changeSiteLoader(true)

    await Promise.allSettled([
        billingStore.getTariffs(),
        userStore.getMe(),
        billingStore.getSubscriptions({ page: 1, page_size: 1000 }),
    ])

    mainStore.changeSiteLoader(false)
})

const onChange = async (data) => {
    await userStore.updateUser(data)
}
</script>
<template>
    <div>
        <div class="profile-top">
            <div class="profile-left">
                <div class="">
                    <div class="flex justify-center mt-4 mb-4">
                        <div class="avatar">
                            <img src="icons/user-icon.svg" alt="" />
                        </div>
                    </div>

                    <div class="info-card mb-4">
                        <div class="flex justify-between mb-4">
                            <div class="font-semibold text-base">
                                {{ $t('user_data') }}
                            </div>
                            <q-btn
                                color="primary"
                                dense
                                no-caps
                                @click="() => (userEditModal = true)"
                                :label="$t('change')"
                            />
                        </div>
                        <div class="info-wrap mb-2">
                            <div class="info-item">
                                <div class="key">{{ $t('name') }}</div>
                                <div class="value">
                                    {{ userStore.userData.first_name }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="key">{{ $t('surname') }}</div>
                                <div class="value">
                                    {{ userStore.userData.last_name }}
                                </div>
                            </div>

                            <div class="info-item">
                                <div class="key">{{ $t('place') }}</div>
                                <div class="value">
                                    {{ userStore.userData.region }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <q-tabs
                        active-color="primary"
                        class="base-tab mb-6"
                        v-model="tabs"
                        no-caps
                        outlined
                    >
                        <q-tab
                            name="my_cards"
                            exact
                            replace
                            :label="$t('my_cards')"
                        />
                        <q-tab
                            name="my_subscriptions"
                            exact
                            replacew
                            :label="$t('my_subscriptions')"
                        />
                        <q-tab
                            name="payment_history"
                            exact
                            replacew
                            :label="$t('payment_history')"
                        />
                    </q-tabs>

                    <MyCards v-if="tabs === 'my_cards'" />
                    <MySubscriptions v-else-if="tabs === 'my_subscriptions'" />
                    <PaymentHistory v-else-if="tabs === 'payment_history'" />
                </div>
            </div>
        </div>
    </div>
    <PaymentModal />
    <AddSubscriptionModal />
    <UserEditModal @on-change="onChange" v-bind="userStore.userData" />
</template>

<style lang="scss" src="src/assets/scss/Profile.scss"></style>
