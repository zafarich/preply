<template>
    <div>
        <div class="block-module mb-6">
            <div class="text-lg mb-4">{{ $t('select_main_subjects') }}</div>
            <div>
                <div class="mb-6">
                    <BaseSelect
                        v-model="data.s1"
                        emit-value
                        map-options
                        outlined
                        :placeholder="$t('first_subject')"
                        :options="mainSubjects"
                        option-label="title"
                        :error="firstIsSelect"
                        :isShaking="isShaking"
                        option-value="id"
                    />
                    <span v-if="firstIsSelect" class="text-red mt-1">
                        {{ $t('must_be_select_first_subject') }}
                    </span>
                </div>
                <div>
                    <!-- {{ data.s2 }} -->
                    <BaseSelect
                        v-model="data.s2"
                        class="tracking-widest"
                        emit-value
                        map-options
                        outlined
                        :disabled="!!data.s1"
                        :placeholder="$t('second_subject')"
                        :options="referenceStore.sub_main_subjects"
                        option-label="title"
                        option-value="id"
                        @click="checkFirstSelected"
                    />
                </div>
            </div>
            <div class="text-lg mb-4 mt-8 pt-5 border-t">Majburiy fanlar:</div>
            <div class="flex justify-between items-center">
                <q-badge
                    v-for="(subject, index) in MANDATORY_SUBJECTS"
                    :key="index"
                    rounded
                    class="py-2 px-4"
                    color="secondary"
                    :label="$t(subject.label)"
                />
            </div>
        </div>

        <q-btn
            @click="openModal"
            color="primary"
            class="full-width button-md"
            no-caps
            :loading="loading"
            :disable="data.s1 && data.s2"
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
import { MANDATORY_SUBJECTS, TEST_TYPES } from 'src/utils/constants'
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
    mainSubjects: {
        type: Array,
        default: [],
    },
})

const { startModal, buySubscriptionModal } = storeToRefs(modalStore)
const router = useRouter()
const { t } = useI18n()
const data = ref({
    s1: '',
    s2: '',
})

const firstIsSelect = ref(false)
const isShaking = ref(false)

watch(
    () => data.value.s1,
    async (newValue) => {
        data.value.s2 = ''
        firstIsSelect.value = false
        referenceStore.setSubMainSubject([])
        if (newValue) {
            await referenceStore.getSubjects({ parent_subjects: newValue })
        }
    },
)

const checkFirstSelected = () => {
    if (data.value.s1) {
        firstIsSelect.value = isShaking.value = false
    } else {
        if (navigator.vibrate) {
            navigator.vibrate(200)
            isShaking.value = true
        }

        firstIsSelect.value = true
    }
}

const openModal = () => {
    if (testStore.isEndLimit) {
        modalStore.changeBuySubscriptionModal(true)
        return
    }

    if (data.value.s1 && data.value.s2) {
        startModal.value = true
    }
}

const startTest = async () => {
    mainStore.changeSiteLoader(true)

    const response = await testStore.START_TEST(TEST_TYPES.BLOCK, {
        subjects: [data.value.s1, data.value.s2],
    })

    if (!response.error) {
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

<style lang="scss">
.block-module {
    border-radius: 6px;
    border: 1px solid $gray-5;
    padding: 24px 16px;
}
</style>
