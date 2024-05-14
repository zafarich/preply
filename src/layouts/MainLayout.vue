<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BottomMenu from 'src/components/common/BottomMenu.vue'
import TheHeader from 'src/components/common/TheHeader.vue'
import { getTokenFromCache, setTokenToCache } from 'src/utils/auth'

import { useTestStore } from 'src/stores/test'

const router = useRouter()
const route = useRouter()

const testStore = useTestStore()

onMounted(() => {
    const token = getTokenFromCache()
    console.log('token', token)
    if (token) {
        setTokenToCache(route.query?.access_token)
    }

    if (testStore.test.type?.length && route.name !== 'tests.solving') {
        router.push({
            name: 'tests.solving',
            query: { s1: testStore.test?.variant_id },
        })
    }
})
</script>
<template>
    <div class="main-layout">
        <TheHeader />
        <router-view />
        <BottomMenu />
    </div>
</template>
