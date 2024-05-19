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
    let token = getTokenFromCache()
    console.log('token', token)

    if (!token || token == 'undefined' || token == undefined) {
        setTokenToCache(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2Mjg4Nzk0LCJpYXQiOjE3MTYxMTU5OTQsImp0aSI6Ijc0MDhlYWFmMTUxZDQ1ZDc4OTAyY2Q5MWRhZWZjMmFlIiwidXNlcl9pZCI6MSwidXNlcl9kYXRhIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiS2hhc2FuIiwibGFzdF9uYW1lIjoiTXVzYWV2MzMzMyIsInRlbGVncmFtX3VzZXJuYW1lIjpudWxsLCJmdWxsX25hbWUiOm51bGwsImxhbmd1YWdlIjoidXoiLCJwaG9uZSI6IjEiLCJpc19wcmVtaXVtIjpmYWxzZSwiaXNfZnJlZV9hdHRlbXB0c19sZWZ0Ijp0cnVlLCJjYXJkcyI6W3siaWQiOjE3LCJjYXJkX251bWJlciI6Ijg2MDA0OSoqKioqKjY0NzgiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6dHJ1ZSwicmVjdXJyZW50Ijp0cnVlLCJ1c2VyIjoxLCJjcmVhdGVkIjoiMjAyNC0wNS0xNVQyMzo0MToxMi4yNTA0MDkrMDU6MDAifSx7ImlkIjoyNiwiY2FyZF9udW1iZXIiOiI4NjAwMDYqKioqKio2MzExIiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOmZhbHNlLCJyZWN1cnJlbnQiOmZhbHNlLCJ1c2VyIjoxLCJjcmVhdGVkIjoiMjAyNC0wNS0xN1QxNDo1NjoyMC44OTg5NTMrMDU6MDAifV0sInJlZ2lvbiI6IlFvcmFxYWxwb2cnaXN0b24ifX0.QRBjqrTYarSy5UYj8sVnskdfgnv0dMpIHvrRvcQafRQ',
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
