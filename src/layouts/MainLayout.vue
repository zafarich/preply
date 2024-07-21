<template>
    <div class="main-layout">
        <TheHeader />
        <div class="app-container">
            <router-view />
        </div>
        <Footer v-if="isShowFooter" />
        <BottomMenu />
        <GlobalLoading />
        <BuySubscriptionModal />
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

const router = useRouter()
const route = useRoute()
const testStore = useTestStore()

const isShowFooter = computed(() => {
    return route.name == 'home'
})

onMounted(() => {
    // console.log('GET_TESTSPTYPE', typeof testStore.GET_TEST_TYPE)
    if (!!testStore.GET_TESTS && route.name !== 'test-solve') {
        router.push({
            name: 'test-solve',
        })
    }
})
</script>
