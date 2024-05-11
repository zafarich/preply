<script setup>
import { ref, onMounted, watch, nextTick } from 'vue-demi'
import { useI18n } from 'vue-i18n'

import BaseSelect from 'src/components/UI/BaseSelect.vue'
import StartTestModal from 'src/components/modals/StartTestModal.vue'
import { useReferencesStore } from 'src/stores/references'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'
import { TEST_TYPES } from 'src/utils/constants'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()

const { startModal } = storeToRefs(modalStore)

const router = useRouter()
const { t } = useI18n()
const data = ref({
    s1: '',
    s2: '',
})

const referenceStore = useReferencesStore()
const testStore = useTestStore()

onMounted(async () => {
    await referenceStore.getSubjects({ is_main_for_block: true })
})

watch(
    () => data.value.s1,
    async (newValue) => {
        data.value.s2 = ''
        if (newValue) {
            await referenceStore.getSubjects({ parent_subjects: newValue })
        }
    },
)

const openModal = () => {
    if (data.value.s1 && data.value.s2) {
        startModal.value = true
    }
}

const startTest = async () => {
    testStore.changeTestField({
        type: 'block',
    })

    await testStore.startBlockTest({
        subjects: [data.value.s1, data.value.s2],
    })

    router.push({
        name: 'tests.solving',
        query: {
            test_type: TEST_TYPES.BLOCK,
            s1: data.value.s1,
            s2: data.value.s2,
        },
    })

    nextTick(() => {
        startModal.value = false
    })
}
</script>
<template>
    <div>
        <div class="block-module mb-6">
            <div class="text-lg mb-4">Asosiy fanlarni tanlang</div>
            <div>
                <div class="mb-6">
                    <BaseSelect
                        v-model="data.s1"
                        emit-value
                        map-options
                        outlined
                        placeholder="Birinchi fan"
                        :options="referenceStore.main_subjects"
                        option-label="title"
                        option-value="id"
                    />
                </div>
                <div>
                    <!-- {{ data.s2 }} -->
                    <BaseSelect
                        v-model="data.s2"
                        emit-value
                        map-options
                        outlined
                        :disabled="!!data.s1"
                        placeholder="Ikkinchi fan"
                        :options="referenceStore.sub_main_subjects"
                        option-label="title"
                        option-value="id"
                    />
                </div>
            </div>
        </div>

        <q-btn
            @click="openModal"
            color="primary"
            class="full-width button-md"
            no-caps
            :disable="data.s1 && data.s2"
            >Boshlash</q-btn
        >

        <StartTestModal @startTest="startTest" />
    </div>
</template>

<style lang="scss">
.block-module {
    border-radius: 6px;
    border: 1px solid $gray-5;
    padding: 24px 16px;
}
</style>
