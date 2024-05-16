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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTY1OTIwLCJpYXQiOjE3MTU3OTMxMjAsImp0aSI6IjQzYTJmZTFkODIzMjRhMmE5NGI3MmRmZTY5MWZmOTcxIiwidXNlcl9pZCI6MywidXNlcl9kYXRhIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIiwidGVsZWdyYW1fdXNlcm5hbWUiOm51bGwsImZ1bGxfbmFtZSI6bnVsbCwibGFuZ3VhZ2UiOiJydSIsInBob25lIjoiMiIsImlzX3ByZW1pdW0iOmZhbHNlLCJpc19mcmVlX2F0dGVtcHRzX2xlZnQiOnRydWUsImNhcmRzIjpbeyJpZCI6MSwiY2FyZF9udW1iZXIiOiI4NjAwNDkqKioqKio2NDc4IiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOmZhbHNlLCJyZWN1cnJlbnQiOmZhbHNlLCJ1c2VyIjozLCJjcmVhdGVkIjoiMjAyNC0wNS0xNVQxODoxMzoyMC41OTg4MDkrMDU6MDAifSx7ImlkIjoyLCJjYXJkX251bWJlciI6Ijg2MDA0OSoqKioqKjY0NzgiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6ZmFsc2UsInJlY3VycmVudCI6ZmFsc2UsInVzZXIiOjMsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDE4OjE1OjI2Ljg0NzYzMyswNTowMCJ9LHsiaWQiOjMsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5IjpmYWxzZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MywiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMTg6MTU6NDAuOTEyMDM4KzA1OjAwIn0seyJpZCI6NCwiY2FyZF9udW1iZXIiOiI4NjAwNDkqKioqKio2NDc4IiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOmZhbHNlLCJyZWN1cnJlbnQiOmZhbHNlLCJ1c2VyIjozLCJjcmVhdGVkIjoiMjAyNC0wNS0xNVQxODoyMjoxMi45ODg1OTQrMDU6MDAifSx7ImlkIjo1LCJjYXJkX251bWJlciI6Ijg2MDA0OSoqKioqKjY0NzgiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6ZmFsc2UsInJlY3VycmVudCI6ZmFsc2UsInVzZXIiOjMsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDE4OjIyOjE4LjIzNTA1OCswNTowMCJ9LHsiaWQiOjYsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5IjpmYWxzZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MywiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMTk6NDk6NTQuNDk4MzYwKzA1OjAwIn0seyJpZCI6NywiY2FyZF9udW1iZXIiOiI4NjAwNDkqKioqKio2NDc4IiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOmZhbHNlLCJyZWN1cnJlbnQiOmZhbHNlLCJ1c2VyIjozLCJjcmVhdGVkIjoiMjAyNC0wNS0xNVQxOTo0OTo1OS43NTYxOTUrMDU6MDAifSx7ImlkIjo4LCJjYXJkX251bWJlciI6Ijg2MDA0OSoqKioqKjY0NzgiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6ZmFsc2UsInJlY3VycmVudCI6ZmFsc2UsInVzZXIiOjMsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDE5OjUxOjA3LjU3MDQyMyswNTowMCJ9LHsiaWQiOjksImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5IjpmYWxzZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MywiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMTk6NTE6NDQuMjM4OTM3KzA1OjAwIn0seyJpZCI6MTAsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5IjpmYWxzZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MywiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMTk6NTI6NDguMTkwMDkwKzA1OjAwIn0seyJpZCI6MTEsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5Ijp0cnVlLCJyZWN1cnJlbnQiOmZhbHNlLCJ1c2VyIjozLCJjcmVhdGVkIjoiMjAyNC0wNS0xNVQxOTo1MzowNy44MTI4NDgrMDU6MDAifSx7ImlkIjoxMiwiY2FyZF9udW1iZXIiOiI4NjAwNDkqKioqKio2NDc4IiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOnRydWUsInJlY3VycmVudCI6ZmFsc2UsInVzZXIiOjMsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDE5OjU3OjI1LjkwMDA4MSswNTowMCJ9LHsiaWQiOjEzLCJjYXJkX251bWJlciI6Ijg2MDA0OSoqKioqKjY0NzgiLCJleHBpcmUiOiIwMy85OSIsInZlcmlmeSI6dHJ1ZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MywiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMTk6NTg6MjcuNTY5NDYzKzA1OjAwIn1dfX0.-6T93JNwDTNfXSVj22uS8WkHZkIn-5aSyfZBUo9BKjU',
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
