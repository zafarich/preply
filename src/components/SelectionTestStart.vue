<template>
    <div>
        <div class="block-module mb-6">
            <div class="text-lg mb-4">{{ $t('select_main_subjects') }}</div>
            <div>
                <div class="mb-6">
                    <BaseSelect
                        v-model="selectedSubject"
                        emit-value
                        map-options
                        outlined
                        placeholder="Fan"
                        :options="subjects"
                        option-label="title"
                        :error="firstIsSelect"
                        option-value="id"
                    />
                    <span v-if="firstIsSelect" class="text-red mt-1">
                        {{ $t('must_be_select_first_subject') }}
                    </span>
                </div>
                <div>
                    <BaseSelect
                        v-model="subjectSelection"
                        class="tracking-widest"
                        emit-value
                        map-options
                        outlined
                        :disabled="!!selectedSubject"
                        placeholder="Mavzulashtirilgan test"
                        :options="subjectSelectionsList"
                        option-label="title"
                        option-value="id"
                        @click="checkFirstSelected"
                    />
                </div>
            </div>
        </div>

        <q-btn
            @click="openModal"
            color="primary"
            class="full-width button-md"
            no-caps
            :loading="loading"
            :disable="selectedSubject && subjectSelection"
            >{{ $t('start') }}</q-btn
        >

        <StartTestModal @startTest="startTest" />
    </div>
</template>

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
import { useMainStore } from 'src/stores/main'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'

const modalStore = useModalStore()
const referenceStore = useReferencesStore()
const testStore = useTestStore()
const mainStore = useMainStore()
const userStore = useUserStore()

const props = defineProps({
    subjects: {
        type: Array,
        default: [],
    },
})

const selectedSubject = ref('')
const subjectSelection = ref('')
const subjectSelectionsList = ref({
    results: [],
})

const { startModal } = storeToRefs(modalStore)
const router = useRouter()
const { t } = useI18n()

const firstIsSelect = ref(false)

watch(
    () => selectedSubject.value,
    async (newValue) => {
        subjectSelection.value = ''
        firstIsSelect.value = false
        if (newValue) {
            subjectSelectionsList.value = await referenceStore.getSelection({
                subject: newValue,
            })
        }
    },
)

const checkFirstSelected = () => {
    if (selectedSubject.value) {
        firstIsSelect.value = false
    } else {
        if (navigator.vibrate) {
            navigator.vibrate(200)
        }

        firstIsSelect.value = true
    }
}

const openModal = () => {
    if (selectedSubject.value && subjectSelection) {
        startModal.value = true
    }
}

const startTest = async () => {
    mainStore.changeSiteLoader(true)

    await testStore.START_TEST(TEST_TYPES.BY_SELECTIONS, {
        selection: subjectSelection.value,
    })

    router.push({
        name: 'test-solve',
    })

    nextTick(() => {
        startModal.value = false
    })
    mainStore.changeSiteLoader(false)
}
</script>

<style lang="scss">
.block-module {
    border-radius: 6px;
    border: 1px solid $gray-5;
    padding: 24px 16px;
}
</style>
