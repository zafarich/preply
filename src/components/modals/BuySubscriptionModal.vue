<template>
    <BaseModal
        :model-value="buySubscriptionModal"
        @close="close"
        class="warning-modal"
    >
        <div>
            <div class="row items-center q-pb-none">
                <div class="title-modal"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>
            <div class="text-center mb-3">
                <q-icon name="eva-alert-circle-outline" color="red" size="xl" />
            </div>
            <div class="font-semibold text-lg mb-2 text-center">
                {{
                    $t('you_have_not_subscription', {
                        subscription_type: getSubsType,
                    })
                }}
            </div>
            <button
                class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary mt-5"
                @click="goToPurchase"
            >
                {{ $t('purchase') }}
            </button>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'
import { useBillingStore } from 'src/stores/billing'
import { onMounted, computed } from 'vue'
import { TEST_ERROR_TYPES } from 'src/utils/constants'

const modalStore = useModalStore()
const testStore = useTestStore()
const billingStore = useBillingStore()

const router = useRouter()

const { buySubscriptionModal } = storeToRefs(modalStore)

onMounted(async () => {
    await billingStore.getTariffTypes()
})

const getSubsType = computed(() => {
    if (testStore.errorSubsType == TEST_ERROR_TYPES.PRIME_SUBS_IS_NOT_EXIST) {
        return 'Prime'
    }
    return 'Premium'
})

const close = () => {
    buySubscriptionModal.value = false
}

const goToPurchase = () => {
    useTestStore().RESET_TEST_STORE()
    router.push({ name: 'profile' })
    buySubscriptionModal.value = false
}
</script>

<style>
/* Your component styles here */
</style>
