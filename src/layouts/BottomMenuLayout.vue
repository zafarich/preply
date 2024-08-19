<script setup>
import BottomMenu from 'src/components/common/BottomMenu.vue'
import { useMainStore } from 'src/stores/main'
import { animateFireWorks } from 'src/utils/fireworks'
import { watch } from 'vue'
import { onMounted } from 'vue'

const mainStore = useMainStore()

const { showFireWorks } = storeToRefs(mainStore)

onMounted(() => {
    if (showFireWorks.value) {
        const container = document.getElementById('fireworks-container-test')
        animateFireWorks(container)
    }
})

watch(
    () => showFireWorks.value,
    () => {
        if (showFireWorks.value) {
            const container = document.getElementById(
                'fireworks-container-test',
            )
            animateFireWorks(container)
        }
    },
)
</script>
<template>
    <div id="fireworks-container-test"></div>
    <div class="bottom-menu-layout">
        <router-view />
        <BottomMenu />
    </div>
</template>
