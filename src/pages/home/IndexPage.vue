<template>
    <div>
        <div class="mb-8" v-if="topBanners">
            <TopBanner :banners="topBanners" />
        </div>
        <div class="mb-12" v-if="testTypes">
            <TitleTestType
                :label="$t('premium_tests')"
                :test-type="TARIFFS.PREMIUM.code"
            />
            <TestTypes :test-types="getPremiumTests" />
        </div>
        <div class="mb-8" v-if="middleBanners">
            <MiddleBanner :banners="middleBanners" />
        </div>
        <div class="mb-4" v-if="testTypes">
            <TitleTestType
                :label="$t('prime_tests')"
                :test-type="TARIFFS.PRIME.code"
            />
        </div>
        <div class="mb-10" v-if="subjects">
            <PopularScience :subjects="subjects" />
        </div>

        <!-- TODO: YPX tests -->
        <div
            class="mb-8 flex justify-between items-center border border-[#e9eaec] p-6 rounded-2xl cursor-pointer"
            v-if="getYHQTests && getYHQTests.id"
            @click="openModal"
        >
            <div class="font-medium text-lg">{{ getYHQTests.title }}</div>
            <div>
                <img :src="getYHQTests.image" class="h-8 w-8" />
            </div>
        </div>

        <div class="mb-8" v-if="languageSelections">
            <div class="text-md font-semibold mb-6">
                {{ $t('international_certificates') }}
            </div>
            <TestsList :subjects="languageSelections" />
        </div>

        <div class="mb-8" v-if="languageSelections">
            <div class="text-md font-semibold mb-6">
                {{ $t('world_olympic_tests') }}
            </div>
            <TestsList :subjects="olympicTest" />
        </div>
    </div>
    <StartYpxTestModal @startTest="startYHQTest" />
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import StartYpxTestModal from './components/StartYpxTestModal.vue'
import { useI18n } from 'vue-i18n'
import TopBanner from './sections/TopBanner.vue'
import MiddleBanner from './sections/MiddleBanner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

import { useReferencesStore } from 'src/stores/references'
import { useQuasar } from 'quasar'
import { TARIFFS } from 'src/utils/constants'
import { useBillingStore } from 'src/stores/billing'
import TitleTestType from './components/TitleTestType.vue'
import { TEST_TYPES } from 'src/utils/constants'
import { storeToRefs } from 'pinia'
import { useModalStore } from 'src/stores/modal'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const referencesStore = useReferencesStore()
const mainStore = useMainStore()
const billingStore = useBillingStore()
const modalStore = useModalStore()
const testStore = useTestStore()
const router = useRouter()

const testTypes = ref([])
const subjects = ref([])
const topBanners = ref([])
const middleBanners = ref([])
const languageSelections = ref([])
const olympicTest = ref([])

const { yhqTestStartModal } = storeToRefs(modalStore)

const $q = useQuasar()

onMounted(async () => {
    fetchData()
})

const getPremiumTests = computed(() => {
    return testTypes.value.filter(
        (item) => item.tariff_unique_name == TARIFFS.PREMIUM.code,
    )
})

const getYHQTests = computed(() => {
    return testTypes.value.find((item) => item.unique_name === 'yhq_tests')
})

const getPrimeTests = computed(() => {
    return testTypes.value.filter(
        (item) => item.tariff_unique_name == TARIFFS.PRIME.code,
    )
})

const openModal = () => {
    yhqTestStartModal.value = true
}

const startYHQTest = async () => {
    mainStore.changeSiteLoader(true)

    const response = await testStore.START_TEST(TEST_TYPES.BY_YHQ)

    if (response && !response.error) {
        router.push({
            name: 'test-solve',
        })
    }

    yhqTestStartModal.value = false
    mainStore.changeSiteLoader(false)
}

async function fetchData() {
    mainStore.changeSiteLoader(true)
    await billingStore.getTariffTypes()

    const testTypesPromise = referencesStore.getTestTypes()
    const subjectsPromise = referencesStore.getSubjects({
        // page: 1,
        // // is_main_for_block: true,
        // is_premium: false,
        // page: 1,
        // page_size: 100,
    })
    const topBannersPromise = referencesStore.getBanners({
        place: 'home_page_top',
    })
    const middleBannersPromise = referencesStore.getBanners({
        place: 'home_page_middle',
    })

    const selectionPromise = referencesStore.getSelection({
        for_english: true,
        // is_premium: false,
    })
    const olympicTestPromise = referencesStore.getSelection({
        olympic: true,
        is_showing: true,
    })

    const results = await Promise.allSettled([
        testTypesPromise,
        subjectsPromise,
        topBannersPromise,
        selectionPromise,
        olympicTestPromise,
        middleBannersPromise,
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
                    topBanners.value = result.value
                    break
                case 3:
                    languageSelections.value = result.value
                    break
                case 4:
                    olympicTest.value = result.value
                    break
                case 5:
                    middleBanners.value = result.value
                    break
                case 6:
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
