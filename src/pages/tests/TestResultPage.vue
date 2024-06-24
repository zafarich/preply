<script setup>
import { useTestStore } from 'src/stores/test'
import ResultBlockTest from './components/ResultBlockTest.vue'
import ResultBySubjectTest from './components/ResultBySubjectTest.vue'
import { TEST_TYPES } from 'src/utils/constants'
import ResultByVariantTest from './components/ResultByVariantTest.vue'
import ResultBySelections from './components/ResultBySelections.vue'

const testStore = useTestStore()
</script>

<template>
    <div class="q-pa-sm">
        <ResultBlockTest v-if="testStore.test_type === TEST_TYPES.BLOCK" />
        <ResultBySubjectTest
            v-else-if="testStore.test_type === TEST_TYPES.BY_SUBJECTS"
        />
        <ResultByVariantTest
            v-else-if="testStore.test_type == TEST_TYPES.VARIANT"
        />
        <ResultBySelections
            v-else-if="testStore.test_type == TEST_TYPES.BY_SELECTIONS"
        />
    </div>
</template>

<style lang="scss" src="src/assets/scss/TestResultPage.scss"></style>
