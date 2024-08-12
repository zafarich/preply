<template>
    <div class="main-layout">
        <TopNav />
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
import { onMounted } from 'vue'
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
import { TARIFFS } from 'src/utils/constants'
import { useReferencesStore } from 'src/stores/references'
import LogoutModal from 'src/components/modals/LogoutModal.vue'
import TopNav from 'src/components/common/TopNav.vue'

const router = useRouter()
const route = useRoute()
const testStore = useTestStore()
const mainStore = useMainStore()
const referenceStore = useReferencesStore()

const isShowFooter = computed(() => {
    return route.name == 'home'
})

onMounted(() => {
    // console.log('GET_TESTSPTYPE', typeof testStore.GET_TEST_TYPE)

    referenceStore.getUserStats()
    if (!!testStore.GET_TESTS && route.name !== 'test-solve') {
        router.push({
            name: 'test-solve',
        })
    }
})
</script>
