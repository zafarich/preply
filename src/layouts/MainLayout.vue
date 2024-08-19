<template>
    <div class="main-layout">
        <div id="fireworks-container"></div>
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
import { useReferencesStore } from 'src/stores/references'
import LogoutModal from 'src/components/modals/LogoutModal.vue'
import { animateFireWorks } from 'src/utils/fireworks'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()
const testStore = useTestStore()
const mainStore = useMainStore()

const { showFireWorks } = storeToRefs(mainStore)

const isShowFooter = computed(() => {
    return route.name == 'home'
})

onMounted(() => {
    if (showFireWorks.value) {
        const container = document.getElementById('fireworks-container')
        animateFireWorks(container)
    }

    if (!!testStore.GET_TESTS && route.name !== 'test-solve') {
        router.push({
            name: 'test-solve',
        })
    }
})

watch(
    () => showFireWorks.value,
    () => {
        if (showFireWorks.value) {
            const container = document.getElementById('fireworks-container')
            animateFireWorks(container)
        }
    },
)
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
