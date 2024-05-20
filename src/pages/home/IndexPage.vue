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

// console.log('token1', token)
// http://localhost:8080/?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MzUxODkzLCJpYXQiOjE3MTYxNzkwOTMsImp0aSI6ImJkYzI3ZTg1Y2ZiZjRmNzhiZmI5M2RkMTc3ZTNiNmJiIiwidXNlcl9pZCI6NCwidXNlcl9kYXRhIjp7ImlkIjo0LCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIiwidGVsZWdyYW1fdXNlcm5hbWUiOiJpa2hhc2FubXVzYWV2IiwiZnVsbF9uYW1lIjoiaGFzYW4iLCJsYW5ndWFnZSI6InV6IiwicGhvbmUiOiIrOTk4OTAwMzExMTk5IiwiaXNfcHJlbWl1bSI6ZmFsc2UsImlzX2ZyZWVfYXR0ZW1wdHNfbGVmdCI6dHJ1ZSwiY2FyZHMiOltdLCJyZWdpb24iOiJRb3JhcWFscG9nJ2lzdG9uIn19.t9l0wHFUBd731j7vTAeav56Rrv9e6xOEitiJV35J9Rg&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNzA0MzA5MywiaWF0IjoxNzE2MTc5MDkzLCJqdGkiOiJjNWEyYzkxMTQ5YjA0YTA3Yjg4Y2FmY2EyMGE2ZmFjOSIsInVzZXJfaWQiOjQsInVzZXJfZGF0YSI6eyJpZCI6NCwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsInRlbGVncmFtX3VzZXJuYW1lIjoiaWtoYXNhbm11c2FldiIsImZ1bGxfbmFtZSI6Imhhc2FuIiwibGFuZ3VhZ2UiOiJ1eiIsInBob25lIjoiKzk5ODkwMDMxMTE5OSIsImlzX3ByZW1pdW0iOmZhbHNlLCJpc19mcmVlX2F0dGVtcHRzX2xlZnQiOnRydWUsImNhcmRzIjpbXSwicmVnaW9uIjoiUW9yYXFhbHBvZydpc3RvbiJ9fQ.FvTl5PV_hPRcsb2tG4dGcVVB_LOqZ9795tLRuIQ2VVI

onMounted(() => {
    let token = getTokenFromCache('token')
    // console.log('token', token)
    console.log('token1', token)
    console.log('route.query.access_token', route.query.access_token)

    if (!token || token == 'undefined' || token == undefined) {
        token = route.query.access_token

        console.log('token', token)
        setTokenToCache('token', token)
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
