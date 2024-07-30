<template>
    <div class="pt-5">
        <div class="flex justify-between items-center mb-4">
            <div class="font-semibold text-base items-center">
                {{ $t('my_cards') }}
            </div>
            <!-- <div class="font-semibold text-base money-text">20 000 so'm</div> -->
            <q-btn no-caps color="primary" @click="() => (paymentModal = true)">
                {{ $t('add') }}</q-btn
            >
        </div>
        <div
            v-if="userStore.userVerifyCards.length > 0"
            class="grid 768:grid-cols-3 640:grid-cols-2 gap-4"
        >
            <q-card
                flat
                bordered
                v-for="(card, index) in userStore.userVerifyCards"
                :key="index"
                class="plastic-card"
            >
                <div class="flex justify-between items-center mb-5">
                    <div>
                        <img src="/images/chip.png" class="h-9" />
                    </div>
                    <div class="cursor-pointer" @click="handleDelete(card.id)">
                        <img src="/images/icons/trash.svg" class="h-5" />
                    </div>
                </div>
                <div class="mb-4 flex justify-between items-center">
                    <span class="font-bold">Karta raqami :</span>
                    <span class="tracking-wide">
                        {{ formatCardNumber(card.card_number) }}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold">Amal qilish muddati: </span>
                    <span class="tracking-wide">
                        {{ card.expire }}
                    </span>
                </div>
            </q-card>
        </div>

        <h1 v-else class="text-center font-semibold text-base text-gray-400">
            {{ $t('you_have_not_card') }}
        </h1>
    </div>

    <BaseModal
        :model-value="showDeleteModal"
        @close="closeDeleteModal"
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
                    <div class="font-semibold text-lg mb-2 text-center">
                        Kartani o'chirishni xoxlaysizmi?
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        Yo'q
                    </button>
                    <button
                        @click="confirmDelete"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-red-600"
                    >
                        O'chirish
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import { ref } from 'vue'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useBillingStore } from 'src/stores/billing'

const modalStore = useModalStore()
const userStore = useUserStore()
const billingStore = useBillingStore()
const { paymentModal } = storeToRefs(modalStore)
const showDeleteModal = ref(false)

const deleteCardId = ref('')

const closeDeleteModal = () => {
    showDeleteModal.value = false
}

const handleDelete = (id) => {
    showDeleteModal.value = true
    deleteCardId.value = id
}

const confirmDelete = async () => {
    await billingStore.deleteCard(deleteCardId.value)
    await userStore.getMe()
    showDeleteModal.value = false
}

function formatCardNumber(cardNumber) {
    // Remove all non-digit and non-asterisk characters
    const cleaned = cardNumber.replace(/[^0-9*]/g, '')

    // Format the number into XXXX XXXX XXXX XXXX
    const formatted = cleaned.replace(/(.{4})(?=.)/g, '$1 ')

    return formatted.trim()
}
</script>

<style lang="scss">
.plastic-card {
    // background-color: #808080;
    // background-image: linear-gradient(to right, #727171, #d7d7d7);
    border: none;
    background-color: #e5e7eb;
    border-radius: 20px;
    margin-bottom: 16px;
    padding: 20px;
}
</style>
