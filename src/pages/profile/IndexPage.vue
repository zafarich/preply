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

const modalStore = useModalStore()
const { paymentModal, userEditModal } = storeToRefs(modalStore)
const billingStore = useBillingStore()
const userStore = useUserStore()

const tabs = ref('my_cards')

onMounted(() => {
    billingStore.getTariffs()
    userStore.getMe()
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
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_r1Z91AaWpSXXoHKASTdGIwqU43_-O8niWO9Cw8uYTJnfksBq6YPjM4SaxMMzNlSza0&usqp=CAU"
                                alt=""
                            />
                        </div>
                    </div>

                    <div class="info-card mb-4">
                        <div class="flex justify-between mb-4">
                            <div class="font-semibold text-base">
                                Ma'lumotlar
                            </div>
                            <q-btn
                                color="primary"
                                dense
                                no-caps
                                @click="() => (userEditModal = true)"
                                label="O'zgartirish"
                            />
                        </div>
                        <div class="info-wrap mb-2">
                            <div class="info-item">
                                <div class="key">Ism</div>
                                <div class="value">
                                    {{ userStore.userData.first_name }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="key">Familya</div>
                                <div class="value">
                                    {{ userStore.userData.last_name }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="key">ID</div>
                                <div class="value">
                                    {{ userStore.userData.id }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="key">Hudud</div>
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
                            label=" Kartalarim"
                        />
                        <q-tab
                            name="my_subscriptions"
                            exact
                            replacew
                            label=" Obunalarim"
                        />
                        <q-tab
                            name="payment_history"
                            exact
                            replacew
                            label="To'lovlar tarixi"
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
