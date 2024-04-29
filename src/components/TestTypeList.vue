<script setup>
const props = defineProps({
    testTypes: {
        type: Array,
        default: () => [],
    },
})
</script>
<template>
    <div class="grid 768:grid-cols-3 gap-4">
        <router-link
            v-for="testType in testTypes"
            :key="testType.id"
            :to="{ name: 'variant', params: { id: testType.id } }"
            class="test-type-item"
        >
            <div class="title-test-type">{{ testType.title }}</div>
        </router-link>
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
