<script setup>
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'

const testStore = useTestStore()

const router = useRouter()

const props = defineProps({
    testTypes: {
        type: Array,
        default: () => [],
    },
})

function selectTest(value) {
    testStore.SET_TEST_TYPE(value)
    router.push({ name: 'tests' })
}
</script>
<template>
    <div class="grid 768:grid-cols-3 gap-4">
        <div
            v-for="testType in testTypes"
            :key="testType.id"
            @click="selectTest(testType.unique_name)"
            class="test-type-item"
        >
            <img src="/icons/education-cap.png" class="h-7" />
            <div class="title-test-type">{{ testType.title }}</div>
        </div>
    </div>
</template>

<style lang="scss">
.test-type-item {
    border-radius: 10px;
    border: 1px solid $gray-6;
    padding: 12px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title-test-type {
        font-size: 16px;
        font-weight: 500;
    }
}
</style>
