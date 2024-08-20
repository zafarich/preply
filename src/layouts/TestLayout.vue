<script setup>
import { storeToRefs } from 'pinia'
import BuySubscriptionModal from 'src/components/modals/BuySubscriptionModal.vue'

const explosions = ref(2) // Количество взрывов
const particles = ref(50) // Количество частиц в каждом взрыве
</script>
<template>
    <div class="test-layout app-container">
        <router-view />
    </div>

    <BuySubscriptionModal />
</template>
