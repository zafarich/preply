<template>
    <div>
        <div class="text-bold mt-6 mb-4 text-xl">{{ $t('tests') }}</div>
        <div>
            <div class="grid grid-cols-2 gap-3 mb-8">
                <q-btn
                    v-for="(testType, index) in testTypesList"
                    :key="index"
                    class="flex-grow"
                    @click="changeTestType(testType.key)"
                    :label="$t(testType.name)"
                    :outline="GET_TEST_TYPE !== testType.key"
                    color="primary"
                />
            </div>

            <ScienceList
                v-if="GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS"
                :subjects="referencesStore.main_subjects"
            />
            <BlockTestStart
                v-else-if="GET_TEST_TYPE === TEST_TYPES.BLOCK"
                :main-subjects="referencesStore.main_subjects"
            />

            <SelectionTestStart
                v-else-if="GET_TEST_TYPE === TEST_TYPES.BY_SELECTIONS"
                :subjects="referencesStore.subjects"
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
import SelectionTestStart from 'src/components/SelectionTestStart.vue'
import ScienceList from 'src/components/ScienceList.vue'
import BlockTestStart from 'src/components/BlockTestStart.vue'
import VariantTestStart from 'src/components/VariantTestStart.vue'
import { TEST_TYPES } from 'src/utils/constants'

const router = useRouter()
const route = useRoute()

const testTypesList = ref([
    {
        name: 'by_science',
        key: TEST_TYPES.BY_SUBJECTS,
    },
    {
        name: 'by_block',
        key: TEST_TYPES.BLOCK,
    },
    {
        name: 'by_variant',
        key: TEST_TYPES.VARIANT,
    },
    {
        name: 'by_selections',
        key: TEST_TYPES.BY_SELECTIONS,
    },
])

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
