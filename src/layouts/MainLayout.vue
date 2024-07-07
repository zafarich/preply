<template>
    <div class="main-layout">
        <TheHeader />
        <router-view />
        <BottomMenu />
        <GlobalLoading />
        <BuySubscriptionModal />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BottomMenu from 'src/components/common/BottomMenu.vue'
import TheHeader from 'src/components/common/TheHeader.vue'

import { useTestStore } from 'src/stores/test'
import GlobalLoading from 'src/components/GlobalLoading.vue'
import BuySubscriptionModal from 'src/components/modals/BuySubscriptionModal.vue'

const router = useRouter()
const route = useRouter()
const testStore = useTestStore()

onMounted(() => {
    // console.log('GET_TESTSPTYPE', typeof testStore.GET_TEST_TYPE)
    if (!!testStore.GET_TESTS && route.name !== 'tests.solving') {
        router.push({
            name: 'tests.solving',
        })
    }
})
</script>
