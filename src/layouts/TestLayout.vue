<script setup>
import { storeToRefs } from 'pinia'
import BuySubscriptionModal from 'src/components/modals/BuySubscriptionModal.vue'
</script>
<template>
    <div class="test-layout app-container">
        <router-view />
    </div>

    <BuySubscriptionModal />
</template>
