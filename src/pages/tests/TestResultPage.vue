<template>
    <div class="relative">
        <TestResultBlock v-if="testStore.test_type == TEST_TYPES.BLOCK" />
        <TestResultCommon v-else />
        <div
            class="fixed bottom-14 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToTop"
            id="scrollIcon"
            v-if="showIcon"
        >
            <img src="/images/icons/to-top-icon.svg" class="w-4 h-4" />
        </div>
    </div>
</template>

<script setup>
import { useTestStore } from 'src/stores/test'
import TestResultCommon from './components/TestResultCommon.vue'
import TestResultBlock from './components/TestResultBlock.vue'
import { TEST_TYPES } from 'src/utils/constants'
import { onMounted, ref } from 'vue'

const testStore = useTestStore()
const showIcon = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollIcon = document.getElementById('scrollIcon')
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > 500) {
            showIcon.value = true
        } else {
            showIcon.value = false
        }
        // }
    })
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
</script>

<style lang="scss" src="src/assets/scss/TestResultPage.scss"></style>
