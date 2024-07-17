<script setup>
import { ref, onMounted, nextTick } from 'vue-demi'
import BaseImg from 'src/components/UI/BaseImg.vue'
import { useRouter } from 'vue-router'
import { useTestStore } from 'src/stores/test'
import { TEST_TYPES } from 'src/utils/constants'
import StartTestModal from 'src/components/modals/StartTestModal.vue'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const testStore = useTestStore()
const modalStore = useModalStore()
const userStore = useUserStore()

const { startModal, buySubscriptionModal } = storeToRefs(modalStore)

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
})

const selectId = ref(null)

const startTest = async (id) => {
    if (!userStore.userData.is_free_attempts_left) {
        startModal.value = false
        buySubscriptionModal.value = true
        return
    }

    await testStore.START_TEST(TEST_TYPES.BY_SUBJECTS, {
        subject_id: selectId.value,
    })

    router.push({
        name: 'test-solve',
        query: {
            test_type: TEST_TYPES.BY_SUBJECTS,
        },
    })

    nextTick(() => {
        startModal.value = false
    })
}

const selectSubject = (id) => {
    selectId.value = id
    nextTick(() => {
        startModal.value = true
    })
}
</script>
<template>
    <div class="grid grid-cols-2 gap-4">
        <!-- :to="{ name: 'variant', params: { id: subject.id } }" -->
        <div
            v-for="subject in subjects"
            :key="subject.id"
            @click="selectSubject(subject.id)"
            class="science-item cursor-pointer"
        >
            <div class="flex justify-center mb-1">
                <BaseImg width="56px" :src="subject.image" />
            </div>
            <div class="title-science">{{ subject.title }}</div>
        </div>
    </div>
    <StartTestModal @start-test="startTest" />
</template>

<style lang="scss">
.science-item {
    border-radius: 16px;
    border: 1px solid $gray-6;
    padding: 12px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title-science {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        // margin-left: 12px;
    }
}
</style>
