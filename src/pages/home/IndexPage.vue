<template>
    <div>
        <div id="fireworks-container"></div>
        <div class="mb-8" v-if="banners">
            <Banner :banners="banners" />
        </div>
        <div class="mb-12" v-if="testTypes">
            <TestTypes
                :test-types="getPremiumTests"
                :label="$t('premium_tests')"
                :test-type="TARIFFS.PREMIUM.code"
            />
        </div>
        <div class="mb-4" v-if="testTypes">
            <TestTypes
                :test-types="getPrimeTests"
                :label="$t('prime_tests')"
                :test-type="TARIFFS.PREMIUM.code"
            />
        </div>
        <div class="mb-8" v-if="subjects">
            <PopularScience :subjects="subjects" />
        </div>

        <div class="mb-8" v-if="languageSelections.results">
            <div class="text-md font-semibold mb-6">
                {{ $t('international_certificates') }}
            </div>
            <TestsList :subjects="languageSelections.results" />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Banner from './sections/Banner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

import { useReferencesStore } from 'src/stores/references'
import { useQuasar } from 'quasar'
import { TARIFFS } from 'src/utils/constants'
import { useBillingStore } from 'src/stores/billing'

const { t } = useI18n()
const userStore = useUserStore()
const referencesStore = useReferencesStore()
const mainStore = useMainStore()
const billingStore = useBillingStore()

const testTypes = ref([])
const subjects = ref([])
const banners = ref([])
const languageSelections = ref([])

const $q = useQuasar()

onMounted(async () => {
    fetchData()
})

const getPremiumTests = computed(() => {
    return testTypes.value.filter(
        (item) => item.tariff_unique_name == TARIFFS.PREMIUM.code,
    )
})

const getPrimeTests = computed(() => {
    return testTypes.value.filter(
        (item) => item.tariff_unique_name == TARIFFS.PRIME.code,
    )
})

async function fetchData() {
    mainStore.changeSiteLoader(true)
    billingStore.getTariffTypes()

    const testTypesPromise = referencesStore.getTestTypes()
    const subjectsPromise = referencesStore.getSubjects({
        // page: 1,
        // // is_main_for_block: true,
        // is_premium: false,
        page: 1,
        page_size: 100,
    })
    const bannersPromise = referencesStore.getBanners()
    const selectionPromise = referencesStore.getSelection({
        for_english: true,
        is_premium: false,
    })

    const results = await Promise.allSettled([
        testTypesPromise,
        subjectsPromise,
        bannersPromise,
        selectionPromise,
    ])

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            switch (index) {
                case 0:
                    testTypes.value = result.value
                    break
                case 1:
                    subjects.value = result.value
                    break
                case 2:
                    banners.value = result.value
                    break
                case 3:
                    languageSelections.value = result.value
                case 4:
                    break
            }
        } else {
            console.error(`Promise ${index} was rejected:`, result.reason)
        }
    })

    mainStore.changeSiteLoader(false)
}
</script>
<style lang="scss" src="src/assets/scss/Home.scss"></style>
