<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BottomMenu from 'src/components/common/BottomMenu.vue'
import TheHeader from 'src/components/common/TheHeader.vue'
import { getTokenFromCache, setTokenToCache } from 'src/utils/auth'
import VueJwtDecode from 'vue-jwt-decode'

import { useTestStore } from 'src/stores/test'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

const router = useRouter()
const route = useRouter()

const testStore = useTestStore()
const userStore = useUserStore()
const mainStore = useMainStore()

onMounted(() => {
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
