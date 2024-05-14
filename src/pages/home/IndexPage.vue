<script setup>
import { onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import Banner from './sections/Banner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import LeadersList from './sections/LeadersList.vue'
const { t } = useI18n()

import { useReferencesStore } from 'src/stores/references'

const referencesStore = useReferencesStore()

const testTypes = ref([])
const subjects = ref([])
const banners = ref([])

onMounted(() => {
    fetchData()
})

async function fetchData() {
    testTypes.value = await referencesStore.getTestTypes()
    subjects.value = await referencesStore.getSubjects({
        page: 1,
        is_main_for_block: true,
    })
    banners.value = await referencesStore.getBanners()
}
</script>
<template>
    <div>
        <div class="mb-8">
            <!-- <Banner :banners="banners" /> -->
        </div>
        <div class="mb-8">
            <TestTypes :test-types="testTypes" />
        </div>
        <div class="mb-8">
            <PopularScience :subjects="subjects" />
        </div>

        <div class="mb-8">
            <div class="font-semibold text-xl mb-6">
                Xalqaro sertifikat testlari
            </div>
            <TestsList />
        </div>
        <div class="">
            <LeadersList />
        </div>
    </div>
</template>

<style lang="scss" src="src/assets/scss/Home.scss"></style>
