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
import { useMainStore } from 'src/stores/main'

const router = useRouter()
const testStore = useTestStore()
const modalStore = useModalStore()
const userStore = useUserStore()
const mainStore = useMainStore()

const { startModal } = storeToRefs(modalStore)

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
    type: {
        type: String,
        default: TEST_TYPES.CERTIFICATE,
    },
})

const selectId = ref(null)

const startTest = async (id) => {
    mainStore.changeSiteLoader(true)
    const response = await testStore.START_TEST(props.type, {
        subject_id: selectId.value,
    })

    if (!response.error) {
        router.push({
            name: 'test-solve',
        })
    }

    startModal.value = false
    mainStore.changeSiteLoader(false)
}

const selectSubject = (id) => {
    // soonDaysModal.value = true
    selectId.value = id
    nextTick(() => {
        startModal.value = true
    })
}
</script>
<template>
    <div class="grid grid-cols-2 gap-4">
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
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        // margin-left: 12px;
    }
}
</style>
