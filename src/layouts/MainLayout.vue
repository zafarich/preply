<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BottomMenu from 'src/components/common/BottomMenu.vue'
import TheHeader from 'src/components/common/TheHeader.vue'

import { useTestStore } from 'src/stores/test'
import GlobalLoading from 'src/components/GlobalLoading.vue'

const router = useRouter()
const route = useRouter()
const testStore = useTestStore()

onMounted(() => {
    if (testStore.EXAM_TYPE?.length && route.name !== 'tests.solving') {
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
        <GlobalLoading />
    </div>
</template>
