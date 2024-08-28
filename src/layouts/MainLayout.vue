<template>
    <div class="main-layout">
        <Fireworks />
        <TheHeader />
        <div class="app-container">
            <router-view />
        </div>
        <Footer v-if="isShowFooter" />

        <BottomMenu />
        <GlobalLoading />
        <BuySubscriptionModal />
        <PremiumPeriodModal />
        <TariffInfoModal />
        <LogoutModal />
        <soon-days-modal />
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Footer from 'src/components/Footer.vue'
import BottomMenu from 'src/components/common/BottomMenu.vue'
import TheHeader from 'src/components/common/TheHeader.vue'

import { useTestStore } from 'src/stores/test'
import GlobalLoading from 'src/components/GlobalLoading.vue'
import BuySubscriptionModal from 'src/components/modals/BuySubscriptionModal.vue'
import { computed } from 'vue'
import PremiumPeriodModal from 'src/components/modals/PremiumPeriodModal.vue'
import TariffInfoModal from 'src/components/modals/TariffInfoModal.vue'
import { useMainStore } from 'src/stores/main'
import LogoutModal from 'src/components/modals/LogoutModal.vue'
import SoonDaysModal from 'src/components/modals/SoonDaysModal.vue'
import { storeToRefs } from 'pinia'
import Fireworks from 'src/components/Fireworks.vue'
import { useUserStore } from 'src/stores/user'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const route = useRoute()
const testStore = useTestStore()
const mainStore = useMainStore()
const userStore = useUserStore()

const isShowFooter = computed(() => {
    return route.name == 'home'
})

onMounted(() => {
    if (!!testStore.GET_TESTS && route.name !== 'test-solve') {
        router.push({
            name: 'test-solve',
        })
    }
})
</script>

<style scoped>
#fireworks-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
}
</style>
