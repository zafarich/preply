<script setup>
import { onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import Banner from './sections/Banner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import LeadersList from './sections/LeadersList.vue'
import { getTokenFromCache, setTokenToCache } from 'src/utils/auth'
import VueJwtDecode from 'vue-jwt-decode'
import { useUserStore } from 'src/stores/user'
import { useMainStore } from 'src/stores/main'

import { useReferencesStore } from 'src/stores/references'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const userStore = useUserStore()
const mainStore = useMainStore()
const referencesStore = useReferencesStore()

const testTypes = ref([])
const subjects = ref([])
const banners = ref([])

const route = useRoute()

onMounted(() => {
    // console.log('router', route.query)

    let token = getTokenFromCache()
    console.log('token', token)

    if (!token || token == 'undefined' || token == undefined) {
        // setTokenToCache(route.query?.access_token)
        setTokenToCache(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTU5MTE5LCJpYXQiOjE3MTU3ODYzMTksImp0aSI6ImU1NWM1YWYyZjA3ZjRiNDk4YzEyNGIyOGIyM2QyOTA1IiwidXNlcl9pZCI6MywidXNlcl9kYXRhIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIiwidGVsZWdyYW1fdXNlcm5hbWUiOm51bGwsImZ1bGxfbmFtZSI6bnVsbCwibGFuZ3VhZ2UiOiJydSIsInBob25lIjoiMiIsImlzX3ByZW1pdW0iOmZhbHNlLCJpc19mcmVlX2F0dGVtcHRzX2xlZnQiOnRydWV9fQ.1FM6LNRGCUOPO9-7AUv0m419us2iPINJY0aKSScZc4U',
        )

        token = getTokenFromCache()

        let decoded = VueJwtDecode.decode(token)
        userStore.updateUserData({ ...decoded.user_data })
        mainStore.setLanguage(decoded.user_data.language)
    }
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
