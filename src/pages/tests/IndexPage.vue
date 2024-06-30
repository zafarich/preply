<script setup>
import { onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

import ScienceList from 'src/components/ScienceList.vue'
import BlockTestStart from 'src/components/BlockTestStart.vue'
import VariantTest from 'src/components/VariantTest.vue'
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

onMounted(() => {
    fetchData()
})

async function fetchData() {
    mainStore.changeSiteLoader(true)

    await Promise.allSettled([
        referencesStore.getSubjects({
            is_main_for_block: true,
        }),
        referencesStore.getSubjects({ page: 1 }),
    ])

    mainStore.changeSiteLoader(false)
}

function changeTestType(value) {
    testStore.SET_TEST_TYPE(value)
}
</script>
<template>
    <div>
        <div class="text-bold mt-6 mb-4 text-xl">{{ $t('tests') }}</div>
        <div>
            <q-tabs
                active-color="primary"
                class="base-tab mb-6"
                v-model="GET_TEST_TYPE"
                no-caps
                outlined
            >
                <q-tab
                    @click="changeTestType(TEST_TYPES.BY_SUBJECTS)"
                    :label="$t('by_science')"
                    :name="TEST_TYPES.BY_SUBJECTS"
                />
                <q-tab
                    @click="changeTestType(TEST_TYPES.BLOCK)"
                    :label="$t('by_block')"
                    :name="TEST_TYPES.BLOCK"
                />
                <q-tab
                    @click="changeTestType(TEST_TYPES.VARIANT)"
                    :label="$t('by_variant')"
                    :name="TEST_TYPES.VARIANT"
                />
            </q-tabs>

            <ScienceList
                v-if="GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS"
                :subjects="referencesStore.main_subjects"
            />
            <BlockTestStart v-else-if="GET_TEST_TYPE === TEST_TYPES.BLOCK" />
            <VariantTest
                v-else-if="GET_TEST_TYPE === TEST_TYPES.VARIANT"
                :subjects="referencesStore.subjects"
            />
        </div>
    </div>
</template>
