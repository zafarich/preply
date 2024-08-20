<template>
    <div class="profile-top">
        <div class="profile-left">
            <div class="grid grid-cols-2 gap-3 mb-8 mt-4">
                <q-btn
                    v-for="(tabItem, index) in MyProfileList"
                    :key="index"
                    class="flex-grow"
                    @click="changeProfileTab(tabItem.key)"
                    :label="$t(tabItem.name)"
                    :outline="tabs !== tabItem.key"
                    color="primary"
                />
            </div>

            <MyData v-if="tabs === 'my_data'" :filePassword="filePassword" />
            <MyCards v-else-if="tabs === 'my_cards'" />
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
</template>
<script setup>
import PaymentModal from 'src/components/modals/PaymentModal.vue'
import AddSubscriptionModal from 'src/components/modals/AddSubscriptionModal.vue'
import { useBillingStore } from 'src/stores/billing'
import { ref } from 'vue'
import { onMounted } from 'vue'
import MyData from './components/MyData.vue'
import MyCards from './components/MyCards.vue'
import MySubscriptions from './components/MySubscriptions.vue'
import MyResults from './components/MyResults.vue'
import PaymentHistory from './components/PaymentHistory.vue'
import UserEditModal from 'src/components/modals/UserEditModal.vue'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import { hashUserId } from 'src/utils/auth'
import { storeToRefs } from 'pinia'

const MyProfileList = ref([
    {
        name: 'user_data',
        key: 'my_data',
    },
    {
        name: 'my_cards',
        key: 'my_cards',
    },
    {
        name: 'my_subscriptions',
        key: 'my_subscriptions',
    },
    {
        name: 'my_results',
        key: 'my_results',
    },
])

const mainStore = useMainStore()
const billingStore = useBillingStore()
const userStore = useUserStore()
const testStore = useTestStore()

const { profileTab: tabs } = storeToRefs(mainStore)

const filePassword = ref('')

onMounted(async () => {
    mainStore.changeSiteLoader(true)

    await Promise.allSettled([
        testStore.GET_MY_RESULTS(),
        billingStore.getTariffs(),
        userStore.getMe(),
        billingStore.getSubscriptions({ page: 1, page_size: 1000 }),
    ])
    filePassword.value = await hashUserId(userStore.userData.id)
    mainStore.changeSiteLoader(false)
})

const onChange = async (data) => {
    await userStore.updateUser(data)
}

function changeProfileTab(item) {
    tabs.value = item
}
</script>
<style lang="scss" src="src/assets/scss/Profile.scss"></style>
