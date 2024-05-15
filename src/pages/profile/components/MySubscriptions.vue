<template>
    <div class="info-card">
        <div class="flex justify-between item-center mb-4">
            <div class="font-semibold text-base items-center">
                Mening Obunalarim
            </div>
            <!-- <div class="font-semibold text-base money-text">20 000 so'm</div> -->
            <q-btn
                no-caps
                color="primary"
                @click="() => (subscriptionModal = true)"
                >Sotib olish</q-btn
            >
        </div>

        <h1 class="text-center font-semibold text-base">
            Sizda hozircha hech qanday obuna mavjud emas
        </h1>
    </div>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { subscriptionModal } = storeToRefs(modalStore)
</script>
