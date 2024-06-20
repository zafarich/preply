<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Banner from './sections/Banner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import { removeTokenFromCache, setTokenToCache } from 'src/utils/auth'
import VueJwtDecode from 'vue-jwt-decode'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

import { useReferencesStore } from 'src/stores/references'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const { t } = useI18n()
const userStore = useUserStore()
const mainStore = useMainStore()
const referencesStore = useReferencesStore()

const testTypes = ref([])
const subjects = ref([])
const banners = ref([])

const $q = useQuasar()

onMounted(async () => {
    fetchData()
})

async function fetchData() {
    $q.loading.show({
        spinnerSize: 40,
        backgroundColor: 'black',
    })
    testTypes.value = await referencesStore.getTestTypes()
    subjects.value = await referencesStore.getSubjects({
        page: 1,
        is_main_for_block: true,
    })
    banners.value = await referencesStore.getBanners()
    await referencesStore.getSelection()
    $q.loading.hide()
}
</script>
<template>
    <div>
        <div class="mb-8">
            <Banner :banners="banners" />
        </div>
        <div class="mb-8">
            <TestTypes :test-types="testTypes" />
        </div>
        <div class="mb-8">
            <PopularScience :subjects="subjects" />
        </div>

        <div class="mb-8">
            <div class="font-semibold text-xl mb-6">
                {{ $t('international_certificates') }}
            </div>
            <TestsList :subjects="referencesStore.selections" />
        </div>
    </div>
</template>

<style lang="scss" src="src/assets/scss/Home.scss"></style>
