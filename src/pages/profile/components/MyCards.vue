<template>
    <div class="info-card">
        <div class="flex justify-between items-center mb-4">
            <div class="font-semibold text-base items-center">
                Mening kartalarim
            </div>
            <!-- <div class="font-semibold text-base money-text">20 000 so'm</div> -->
            <q-btn no-caps color="primary" @click="() => (paymentModal = true)"
                >Karta qo'shish</q-btn
            >
        </div>

        <div
            v-if="userStore.userCards.length > 0"
            class="grid 768:grid-cols-3 640:grid-cols-2 gap-4"
        >
            <q-card
                flat
                bordered
                v-for="(card, index) in userStore.userCards"
                :key="index"
                class="mb-4 p-4"
            >
                <div class="flex justify-between items-center mb-8">
                    <div>
                        {{ card.card_number }}
                    </div>
                    <div class="cursor-pointer" @click="handleDelete(card.id)">
                        <img src="/images/icons/trash.svg" class="h-5" />
                    </div>
                </div>
                <div>
                    {{ card.expire }}
                </div>
            </q-card>
        </div>

        <h1 v-else class="text-center font-semibold text-base text-gray-400">
            Sizda hozircha hech qanday karta mavjud emas
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
</script>
