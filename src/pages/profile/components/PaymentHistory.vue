<template>
    <div class="info-card">
        <h1 class="text-center font-semibold text-base text-gray-400">
            Sizda hozircha hech qanday karta mavjud emasP
        </h1>
    </div>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { paymentModal } = storeToRefs(modalStore)
</script>
