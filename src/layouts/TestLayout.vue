<script setup>
import BottomMenu from 'src/components/common/BottomMenu.vue'

import BuySubscriptionModal from 'src/components/modals/BuySubscriptionModal.vue'
</script>
<template>
    <div class="test-layout app-container">
        <router-view />

        <!-- <BottomMenu /> -->
    </div>

    <BuySubscriptionModal />
</template>
