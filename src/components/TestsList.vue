<script setup>
import { TEST_TYPES } from 'src/utils/constants'
import StartBySelectionsModal from 'src/components/modals/StartBySelectionsModal.vue'
import BaseImg from 'src/components/UI/BaseImg.vue'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'

const router = useRouter()

const modalStore = useModalStore()
const mainStore = useMainStore()
const testStore = useTestStore()
const userStore = useUserStore()

const { startBySelectionModal, buySubscriptionModal } = storeToRefs(modalStore)

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
})

const selectedTest = ref(null)

const openModal = (unique_name) => {
    selectedTest.value = unique_name
    startBySelectionModal.value = true
}

const startTest = async () => {
    if (!userStore.userData.is_free_attempts_left) {
        startBySelectionModal.value = false
        buySubscriptionModal.value = true
        return
    }

    mainStore.changeSiteLoader(true)

    await testStore.START_TEST(TEST_TYPES.BY_SELECTIONS, {
        selection: selectedTest.value,
    })

    startBySelectionModal.value = false

    router.push({
        name: 'test-solve',
    })

    mainStore.changeSiteLoader(false)
}
</script>
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
            <!-- <div>
                {{ subject.title }}
            </div> -->
        </div>
    </div>
    <StartBySelectionsModal @start-test="startTest" />
</template>

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
