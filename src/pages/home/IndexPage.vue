<script setup>
import { onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import Banner from './sections/Banner.vue'
import TestTypes from './sections/TestTypes.vue'
import PopularScience from './sections/PopularScience.vue'
import TestsList from 'src/components/TestsList.vue'
import LeadersList from './sections/LeadersList.vue'
import {
    getTokenFromCache,
    removeTokenFromCache,
    setTokenToCache,
} from 'src/utils/auth'
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

onMounted(() => {
    removeTokenFromCache()

    // let token = getTokenFromCache()
    if (!route.query.access_token) {
        router.push({
            name: 'home',
            query: {
                access_token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NTcxNzM0LCJpYXQiOjE3MTYzOTg5MzQsImp0aSI6IjY5YjhlNmJiMzU1ZTQyOGU5YWNhYzM2N2I4MjE2YzM0IiwidXNlcl9pZCI6MSwidXNlcl9kYXRhIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiS2hhZiIsImxhc3RfbmFtZSI6Ik11c2FldjMzMzMiLCJ0ZWxlZ3JhbV91c2VybmFtZSI6bnVsbCwiZnVsbF9uYW1lIjpudWxsLCJsYW5ndWFnZSI6InV6IiwicGhvbmUiOiIxIiwiaXNfcHJlbWl1bSI6ZmFsc2UsImlzX2ZyZWVfYXR0ZW1wdHNfbGVmdCI6dHJ1ZSwiY2FyZHMiOlt7ImlkIjoxNywiY2FyZF9udW1iZXIiOiI4NjAwNDkqKioqKio2NDc4IiwiZXhwaXJlIjoiMDMvOTkiLCJ2ZXJpZnkiOnRydWUsInJlY3VycmVudCI6dHJ1ZSwidXNlciI6MSwiY3JlYXRlZCI6IjIwMjQtMDUtMTVUMjM6NDE6MTIuMjUwNDA5KzA1OjAwIn0seyJpZCI6MjYsImNhcmRfbnVtYmVyIjoiODYwMDA2KioqKioqNjMxMSIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5IjpmYWxzZSwicmVjdXJyZW50IjpmYWxzZSwidXNlciI6MSwiY3JlYXRlZCI6IjIwMjQtMDUtMTdUMTQ6NTY6MjAuODk4OTUzKzA1OjAwIn1dLCJyZWdpb24iOiJRb3JhcWFscG9nJ2lzdG9uIn19.EPFXOWAUGrcv5AB4vMdOZnxYHyyNEF4a_cAXOsMGtWg',
            },
        })
    }

    let token = route.query.access_token

    setTokenToCache(token)
    let decoded = VueJwtDecode.decode(token)
    userStore.updateUserData({ ...decoded.user_data })
    mainStore.setLanguage(decoded.user_data.language)

    fetchData()
})

async function fetchData() {
    testTypes.value = await referencesStore.getTestTypes()
    subjects.value = await referencesStore.getSubjects({
        page: 1,
        is_main_for_block: true,
    })
    banners.value = await referencesStore.getBanners()
    await userStore.getLeaders()
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
