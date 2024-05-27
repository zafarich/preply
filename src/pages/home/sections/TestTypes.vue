<script setup>
import TestTypeList from 'src/components/TestTypeList.vue'

const props = defineProps({
    testTypes: {
        type: Array,
        default: () => [],
    },
})
</script>
<template>
    <div class="popular-subjects">
        <div class="flex mb-6 justify-between items-center">
            <div class="font-semibold text-xl">{{ $t('test_types') }}</div>
        </div>

        <TestTypeList :test-types="testTypes" />
    </div>
</template>

<style lang="scss"></style>
