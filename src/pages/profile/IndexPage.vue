<template>
    <div class="profile-top">
        <div class="profile-left">
            <div class="info-card my-4">
                <div
                    class="flex justify-between gap-2 items-center pb-2 border-b border-gray-2"
                >
                    <div class="font-semibold text-base">
                        {{ $t('user_data') }}
                    </div>

                    <div>
                        <q-btn
                            outline
                            color="negative"
                            size="xs"
                            class="mr-2 h-8"
                            @click="() => (logoutModal = true)"
                        >
                            <div class="cursor-pointer">
                                <img src="/icons/logout.png" class="w-5 h-5" />
                            </div>
                        </q-btn>
                        <q-btn color="primary" size="xs" outline class="h-8">
                            <q-icon
                                name="eva-edit"
                                class="py-1"
                                color="primary"
                                size="xs"
                                @click="() => (userEditModal = true)"
                            />
                        </q-btn>
                    </div>
                </div>
                <div class="flex justify-start no-wrap gap-6 pt-4">
                    <div class="relative">
                        <div class="avatar">
                            <img
                                v-if="userStore.userData.image"
                                :src="`${userStore.userData.image}`"
                                alt="Image"
                                class="object-cover w-full h-full"
                            />
                            <img
                                v-else
                                src="icons/user-icon.svg"
                                alt=""
                                class="w-[200px]"
                            />
                        </div>
                    </div>
                    <div class="info-wrap w-full">
                        <div class="info-item">
                            <div class="key">{{ $t('name') }}</div>
                            <div class="value">
                                {{ userStore.userData.first_name }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="key">
                                {{ $t('surname') }}
                            </div>
                            <div class="value">
                                {{ userStore.userData.last_name }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="key">{{ $t('subscription') }}</div>
                            <div class="value">
                                <q-badge
                                    v-if="userStore.userData.is_premium"
                                    color="warning"
                                    no-caps
                                    size="sm"
                                    @click="showPremiumPeriodModal"
                                >
                                    <q-icon
                                        name="eva-checkmark"
                                        color="white"
                                    />
                                </q-badge>
                                <q-badge v-else color="red" no-caps size="sm">
                                    <q-icon name="eva-close" color="white" />
                                </q-badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <q-tabs
                active-color="primary"
                class="base-tab mb-3"
                v-model="tabs"
                no-caps
                outlined
            >
                <q-tab name="my_cards" exact replace :label="$t('my_cards')" />
                <q-tab
                    name="my_subscriptions"
                    exact
                    replace
                    :label="$t('my_subscriptions')"
                />
                <q-tab
                    name="my_results"
                    exact
                    replace
                    :label="$t('my_results')"
                />
            </q-tabs>

            <MyCards v-if="tabs === 'my_cards'" />
            <MySubscriptions v-else-if="tabs === 'my_subscriptions'" />
            <MyResults
                v-else-if="tabs === 'my_results'"
                :results="testStore.myResults.results"
                :count="testStore.myResults.count"
            />
            <PaymentHistory v-else-if="tabs === 'payment_history'" />
        </div>
    </div>
    <PaymentModal />
    <AddSubscriptionModal />
    <UserEditModal @on-change="onChange" v-bind="userStore.userData" />
    <LogoutModal />
</template>
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
import MyResults from './components/MyResults.vue'
import PaymentHistory from './components/PaymentHistory.vue'
import UserEditModal from 'src/components/modals/UserEditModal.vue'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import LogoutModal from './components/LogoutModal.vue'

const modalStore = useModalStore()
const mainStore = useMainStore()
const { periodPremiumModal, userEditModal, logoutModal } =
    storeToRefs(modalStore)

const showPremiumPeriodModal = () => {
    periodPremiumModal.value = true
}

const billingStore = useBillingStore()
const userStore = useUserStore()
const testStore = useTestStore()
const baseUrl = import.meta.env.VITE_BASE_URL

const tabs = ref('my_cards')
const fileInputRef = ref('')
const image = ref('')

onMounted(async () => {
    mainStore.changeSiteLoader(true)

    await Promise.allSettled([
        testStore.GET_MY_RESULTS(),
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
<style lang="scss" src="src/assets/scss/Profile.scss"></style>
