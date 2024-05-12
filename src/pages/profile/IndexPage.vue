<script setup>
import { storeToRefs } from 'pinia'
import PaymentModal from 'src/components/modals/PaymentModal.vue'
import { useModalStore } from 'src/stores/modal'

const modalStore = useModalStore()
const { paymentModal } = storeToRefs(modalStore)
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
                                flat
                                dense
                                no-caps
                                label="O'zgartirish"
                            />
                        </div>
                        <div class="info-wrap mb-2">
                            <div class="info-item">
                                <div class="key">Ism</div>
                                <div class="value">Zafarich</div>
                            </div>
                            <div class="info-item">
                                <div class="key">ID</div>
                                <div class="value">1001</div>
                            </div>
                            <div class="info-item">
                                <div class="key">Hudud</div>
                                <div class="value">Toshkent shahar</div>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <div class="flex justify-between mb-4">
                            <div class="font-semibold text-base">Balans</div>
                            <div class="font-semibold text-base money-text">
                                20 000 so'm
                            </div>
                        </div>

                        <q-btn
                            no-caps
                            color="primary"
                            class="full-width"
                            @click="() => (paymentModal = true)"
                            >Balansni to'ldirish</q-btn
                        >
                    </div>
                </div>
            </div>
            <div class="profile-left"></div>
        </div>
    </div>
    <PaymentModal @confirmPayment="() => {}" />
</template>

<style lang="scss" src="src/assets/scss/Profile.scss"></style>
