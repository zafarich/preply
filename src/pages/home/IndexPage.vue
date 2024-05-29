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

const { t } = useI18n()
const userStore = useUserStore()
const mainStore = useMainStore()
const referencesStore = useReferencesStore()

const testTypes = ref([])
const subjects = ref([])
const banners = ref([])

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    // if (!route.query.access_token) {
    //     await router.push({
    //         name: 'home',
    //         query: {
    //             access_token:
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MDc2NTEyLCJpYXQiOjE3MTY5MDM3MTIsImp0aSI6ImZiN2QxZDJlYzZlYzRjYTlhZDRmNDA4MjAzODRhOGQ1IiwidXNlcl9pZCI6MSwidXNlcl9kYXRhIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiS2hhZiIsImxhc3RfbmFtZSI6Ik11c2FldjMzMzMiLCJ0ZWxlZ3JhbV91c2VybmFtZSI6bnVsbCwiZnVsbF9uYW1lIjoiSGFzYW4gTXVzYWV2IiwibGFuZ3VhZ2UiOiJrciIsInBob25lIjoiMSIsImlzX3ByZW1pdW0iOmZhbHNlLCJpc19mcmVlX2F0dGVtcHRzX2xlZnQiOnRydWUsImNhcmRzIjpbeyJpZCI6MTcsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5Ijp0cnVlLCJyZWN1cnJlbnQiOnRydWUsInVzZXIiOjEsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDIzOjQxOjEyLjI1MDQwOSswNTowMCJ9LHsiaWQiOjI2LCJjYXJkX251bWJlciI6Ijg2MDAwNioqKioqKjYzMTEiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6ZmFsc2UsInJlY3VycmVudCI6ZmFsc2UsInVzZXIiOjEsImNyZWF0ZWQiOiIyMDI0LTA1LTE3VDE0OjU2OjIwLjg5ODk1MyswNTowMCJ9XSwicmVnaW9uIjoiUWFyYXFhbHBhcXN0YW4ifX0.kdwgtlzJ4XlB3sHtLQ9qUJ6-jsS9_UcuVhzigtmGnh8',
    //         },
    //     })
    // }
    // if (route.query.access_token) {
    //     let token = route.query.access_token

    //     setTokenToCache(token)
    //     if (token) {
    //         let decoded = VueJwtDecode.decode(token)
    //         console.log('decoded.user', decoded.user_data)
    //         userStore.updateUserData({ ...decoded.user_data })
    //         mainStore.setLanguage(decoded.user_data.language)
    //     }
    // }
    fetchData()
})

async function fetchData() {
    testTypes.value = await referencesStore.getTestTypes()
    subjects.value = await referencesStore.getSubjects({
        page: 1,
        is_main_for_block: true,
    })
    banners.value = await referencesStore.getBanners()
    await referencesStore.getSelection()
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
