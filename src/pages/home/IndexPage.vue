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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MTExMzA4LCJpYXQiOjE3MTU5Mzg1MDgsImp0aSI6ImM5Zjk3NjY3YWVmMjQ4YzVhNjdlYzMzOWZiZjE1MDJlIiwidXNlcl9pZCI6MSwidXNlcl9kYXRhIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiS2hhc2FuIiwibGFzdF9uYW1lIjoiTXVzYWV2IiwidGVsZWdyYW1fdXNlcm5hbWUiOm51bGwsImZ1bGxfbmFtZSI6bnVsbCwibGFuZ3VhZ2UiOiJ1eiIsInBob25lIjoiMSIsImlzX3ByZW1pdW0iOmZhbHNlLCJpc19mcmVlX2F0dGVtcHRzX2xlZnQiOnRydWUsImNhcmRzIjpbeyJpZCI6MTcsImNhcmRfbnVtYmVyIjoiODYwMDQ5KioqKioqNjQ3OCIsImV4cGlyZSI6IjAzLzk5IiwidmVyaWZ5Ijp0cnVlLCJyZWN1cnJlbnQiOnRydWUsInVzZXIiOjEsImNyZWF0ZWQiOiIyMDI0LTA1LTE1VDIzOjQxOjEyLjI1MDQwOSswNTowMCJ9XSwicmVnaW9uIjoiUW9yYXFhbHBvZydpc3RvbiJ9fQ.G_yWl4YqR_K4-hsI2wASZKxr0St5NnZNkyeBv4RkCk0',
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
