<template>
    <div>
        <div class="block-module mb-6">
            <div class="text-lg mb-4">{{ $t('select_variant_test') }}</div>
            <div>
                <div class="mb-6">
                    <BaseSelect
                        v-model="data.s1"
                        emit-value
                        map-options
                        outlined
                        :placeholder="$t('select_subject')"
                        :error="firstIsSelect"
                        :options="subjects"
                        option-label="title"
                        option-value="id"
                    />
                    <span v-if="firstIsSelect" class="text-red mt-1">
                        {{ $t('first_select_subject') }}
                    </span>
                </div>
                <div>
                    <BaseSelect
                        v-model="data.s2"
                        emit-value
                        map-options
                        outlined
                        :disabled="!!data.s1"
                        :placeholder="$t('select_variant')"
                        :options="variants"
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
            :disable="data.s1 && data.s2"
            >{{ $t('start') }}</q-btn
        >

        <!-- <StartTestModal @startTest="startTest" /> -->
        <VariantNotifyStartModal @startTest="startTest" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import VariantNotifyStartModal from 'src/pages/variant/components/VariantStartNotifyModal.vue'

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
import { useQuasar } from 'quasar'
const modalStore = useModalStore()
const referenceStore = useReferencesStore()
const testStore = useTestStore()
const mainStore = useMainStore()
const userStore = useUserStore()
const $q = useQuasar()
const { buySubscriptionModal, variantNotifyStartModal } =
    storeToRefs(modalStore)
const router = useRouter()
const { t } = useI18n()
const data = ref({
    s1: '',
    s2: '',
})
const variants = ref([])
const firstIsSelect = ref(false)
const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
})

const checkFirstSelected = () => {
    if (data.value.s1) {
        firstIsSelect.value = false
    } else firstIsSelect.value = true
}

async function fetchVariants(subject_id) {
    const response = await testStore.FETCH_VARIANTS({
        page: 1,
        subject: subject_id,
    })

    variants.value = [...response]
}

watch(
    () => data.value.s1,
    async (newValue) => {
        data.value.s2 = ''
        referenceStore.setSubMainSubject([])
        if (newValue) {
            fetchVariants(newValue)
        }
    },
)

const openModal = () => {
    if (!userStore.userData.is_free_attempts_left) {
        variantNotifyStartModal.value = false
        buySubscriptionModal.value = true
        return
    }

    if (testStore.isEndLimit) {
        modalStore.changeBuySubscriptionModal(true)
        return
    }

    if (data.value.s1 && data.value.s2) {
        variantNotifyStartModal.value = true
    }
}

const startTest = async () => {
    if (!userStore.userData.is_free_attempts_left) {
        variantNotifyStartModal.value = false
        buySubscriptionModal.value = true
        return
    }

    if (testStore.isEndLimit) {
        modalStore.changeBuySubscriptionModal(true)
        return
    }

    mainStore.changeSiteLoader(true)
    $q.loading.show()
    await testStore.START_TEST(TEST_TYPES.VARIANT, {
        variant_id: data.value.s2,
    })

    $q.loading.hide()
    variantNotifyStartModal.value = false
    router.push({
        name: 'test-solve',
        query: {
            test_type: TEST_TYPES.VARIANT,
        },
    })

    nextTick(() => {
        variantNotifyStartModal.value = false
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
