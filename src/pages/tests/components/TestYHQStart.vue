<template>
    <q-btn @click="openModal" class="full-width" no-caps color="warning">
        <img src="/icons/play.png" class="h-5 w-5 mr-1" />{{
            $t('start')
        }}</q-btn
    >

    <StartTestModal @startTest="startTest" />
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import StartTestModal from 'src/components/modals/StartTestModal.vue'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import { TEST_TYPES } from 'src/utils/constants'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()
const mainStore = useMainStore()
const testStore = useTestStore()
const router = useRouter()

const { startModal } = storeToRefs(modalStore)
const openModal = () => {
    startModal.value = true
}

const startTest = async () => {
    mainStore.changeSiteLoader(true)

    const response = await testStore.START_TEST(TEST_TYPES.BY_YHQ)

    if (response && !response.error) {
        router.push({
            name: 'test-solve',
        })
    }

    nextTick(() => {
        startModal.value = false
    })
    mainStore.changeSiteLoader(false)
}
</script>

<style>
/* Your component styles here */
</style>
