<template>
    <div>
        <div class="text-bold mt-6 mb-4 text-xl">{{ $t('tests') }}</div>
        <div>
            <div class="grid grid-cols-2 gap-3 mb-8">
                <q-btn
                    class="flex-grow"
                    @click="changeTestType(TEST_TYPES.BY_SUBJECTS)"
                    :label="$t('by_science')"
                    :outline="GET_TEST_TYPE !== TEST_TYPES.BY_SUBJECTS"
                    color="primary"
                />
                <q-btn
                    class="flex-grow"
                    @click="changeTestType(TEST_TYPES.BLOCK)"
                    :label="$t('by_block')"
                    :outline="GET_TEST_TYPE !== TEST_TYPES.BLOCK"
                    color="primary"
                />
                <q-btn
                    class="flex-grow"
                    @click="changeTestType(TEST_TYPES.VARIANT)"
                    :label="$t('by_variant')"
                    :outline="GET_TEST_TYPE !== TEST_TYPES.VARIANT"
                    color="primary"
                />
                <q-btn
                    class="flex-grow"
                    @click="changeTestType(TEST_TYPES.BY_SELECTIONS)"
                    label="Mavzulashtirilgan"
                    :outline="GET_TEST_TYPE !== TEST_TYPES.BY_SELECTIONS"
                    color="primary"
                />
            </div>

            <ScienceList
                v-if="GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS"
                :subjects="referencesStore.main_subjects"
            />
            <BlockTestStart v-else-if="GET_TEST_TYPE === TEST_TYPES.BLOCK" />

            <TestsList
                v-else-if="GET_TEST_TYPE === TEST_TYPES.BY_SELECTIONS"
                :subjects="selections.results"
            />
            <VariantTestStart
                v-else-if="GET_TEST_TYPE === TEST_TYPES.VARIANT"
                :subjects="referencesStore.subjects"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import TestsList from 'src/components/TestsList.vue'
import ScienceList from 'src/components/ScienceList.vue'
import BlockTestStart from 'src/components/BlockTestStart.vue'
import VariantTestStart from 'src/components/VariantTestStart.vue'
import { TEST_TYPES } from 'src/utils/constants'

const router = useRouter()
const route = useRoute()

import { useReferencesStore } from 'src/stores/references'
import { useTestStore } from 'src/stores/test'
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'

const referencesStore = useReferencesStore()
const testStore = useTestStore()
const mainStore = useMainStore()

const { GET_TEST_TYPE } = storeToRefs(testStore)
const selections = ref([])

onMounted(() => {
    fetchData()
})

async function fetchData() {
    mainStore.changeSiteLoader(true)

    const subjectPromise = referencesStore.getSubjects({ page: 1 })
    const mainSubjectPromise = referencesStore.getSubjects({
        is_main_for_block: true,
    })
    const selectionsPromise = referencesStore.getSelection({ is_showing: true })

    const results = await Promise.allSettled([
        selectionsPromise,
        subjectPromise,
        mainSubjectPromise,
    ])

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            switch (index) {
                case 0:
                    selections.value = result.value
                    break
                case 1:
                    break
            }
        } else {
            console.error(`Promise ${index} was rejected:`, result.reason)
        }
    })

    mainStore.changeSiteLoader(false)
}

function changeTestType(value) {
    testStore.SET_TEST_TYPE(value)
}
</script>
