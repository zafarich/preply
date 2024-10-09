<template>
    <div class="grid grid-cols-3 gap-4">
        <div
            v-for="subject in subjects"
            :key="subject.title"
            class="tests-item"
            @click="openModal(subject.unique_name)"
        >
            <div>
                <BaseImg width="70px" height="70px" :src="subject.image" />
            </div>
        </div>
    </div>
    <StartBySelectionOlympicModal @start-test="startTest" />
</template>

<script setup>
import { TEST_TYPES } from 'src/utils/constants'
import BaseImg from 'src/components/UI/BaseImg.vue'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import StartBySelectionOlympicModal from './modals/StartBySelectionOlympicModal.vue'

const router = useRouter()

const modalStore = useModalStore()
const mainStore = useMainStore()
const testStore = useTestStore()
const userStore = useUserStore()

const { startByOlympicModal, soonDaysModal } = storeToRefs(modalStore)

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
})

const selectedTest = ref(null)

const openModal = (unique_name) => {
    if (unique_name == 'ielts') {
        selectedTest.value = unique_name
        startByOlympicModal.value = true
    } else {
        soonDaysModal.value = true
    }
}

const startTest = async () => {
    mainStore.changeSiteLoader(true)
    console.log('selectedTest.value', selectedTest.value)
    const response = await testStore.START_TEST(TEST_TYPES.BY_SELECTIONS, {
        selection: selectedTest.value,
    })

    if (!response.error) {
        router.push({
            name: 'test-solve',
        })
    }
    startByOlympicModal.value = false

    mainStore.changeSiteLoader(false)
}
</script>
<style lang="scss">
.tests-item {
    border-radius: 16px;
    border: 1px solid $gray-6;
    padding: 16px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title-test {
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
