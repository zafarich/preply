<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import 'swiper/css'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

import { useTestStore } from 'src/stores/test'
import ResultBlockTest from './components/ResultBlockTest.vue'
import ResultBySubjectTest from './components/ResultBySubjectTest.vue'
import { TEST_TYPES } from 'src/utils/constants'

const testStore = useTestStore()
</script>

<template>
    <div class="q-pa-sm">
        <ResultBlockTest v-if="testStore.test_type === TEST_TYPES.BLOCK" />
        <ResultBySubjectTest
            v-else-if="testStore.test_type === TEST_TYPES.BY_SUBJECTS"
        />
    </div>
</template>

<style lang="scss" src="src/assets/scss/TestResultPage.scss"></style>
