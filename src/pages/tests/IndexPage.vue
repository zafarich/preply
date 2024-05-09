<script setup>
import { computed, onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

import ScienceList from 'src/components/ScienceList.vue'
import BlockTestStart from 'src/components/BlockTestStart.vue'
import VariantTest from 'src/components/VariantTest.vue'
import { TEST_TYPES } from 'src/utils/constants'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

import { useReferencesStore } from 'src/stores/references'
const referencesStore = useReferencesStore()

const test_type = ref(TEST_TYPES.BLOCK)

onMounted(() => {
    if (route.query?.test_type === TEST_TYPES.VARIANT) {
        test_type.value = TEST_TYPES.VARIANT
        router.push({ query: { test_type: TEST_TYPES.VARIANT } })
    } else if (route.query?.test_type === TEST_TYPES.BLOCK) {
        test_type.value = TEST_TYPES.BLOCK
        router.push({ query: { test_type: TEST_TYPES.BLOCK } })
    } else {
        test_type.value = TEST_TYPES.BY_SUBJECTS
        router.push({ query: { test_type: TEST_TYPES.BY_SUBJECTS } })
    }

    fetchData()
})

async function fetchData() {
    await Promise.allSettled([
        referencesStore.getSubjects({
            is_main_for_block: true,
        }),
        referencesStore.getSubjects({ page: 1 }),
    ])
}
</script>
<template>
    <div>
        <div class="text-bold mt-6 mb-4 text-xl">Testlar</div>
        <div>
            <q-tabs
                active-color="primary"
                class="base-tab mb-6"
                v-model="test_type"
                no-caps
                outlined
            >
                <q-route-tab
                    :to="{ query: { test_type: TEST_TYPES.BY_SUBJECTS } }"
                    :name="TEST_TYPES.BY_SUBJECTS"
                    exact
                    replace
                    label="Fan bo'yicha"
                />
                <q-route-tab
                    :to="{ query: { test_type: TEST_TYPES.BLOCK } }"
                    :name="TEST_TYPES.BLOCK"
                    exact
                    replacew
                    label="Blok test"
                />
                <q-route-tab
                    :to="{ query: { test_type: TEST_TYPES.VARIANT } }"
                    :name="TEST_TYPES.VARIANT"
                    exact
                    replacew
                    label="Variant test"
                />
            </q-tabs>

            <div>
                <ScienceList
                    v-if="test_type === TEST_TYPES.BY_SUBJECTS"
                    :subjects="referencesStore.main_subjects"
                />
                <BlockTestStart v-else-if="test_type === TEST_TYPES.BLOCK" />
                <VariantTest
                    v-else-if="test_type === TEST_TYPES.VARIANT"
                    :subjects="referencesStore.subjects"
                />
            </div>
        </div>
    </div>
</template>

<style></style>
