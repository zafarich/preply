<template>
    <BaseModal
        :model-value="subscriptionModal"
        @close="close"
        class="warning-modal"
        id="add-subs-modal"
    >
        <div>
            <div class="row items-center q-pb-none">
                <div class="title-modal"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>
            <div>
                <div class="font-bold text-lg mb-4">
                    {{ $t('Tarifni tanlang') }}:
                </div>

                <q-tabs
                    v-model="currentSubsTab"
                    narrow-indicator
                    dense
                    class="text-primary mb-4"
                >
                    <q-tab
                        :name="TARIFFS.PRIME.code"
                        :label="$t(TARIFFS.PRIME.label)"
                    />
                    <q-tab
                        :name="TARIFFS.PREMIUM.code"
                        :label="$t(TARIFFS.PREMIUM.label)"
                    />
                </q-tabs>

                <label
                    class="selectable-item"
                    v-for="(item, index) in getCurrentTabTariffs"
                    :key="index"
                    @click="() => (tariff = item)"
                    :class="{ 'selectable-item__active': tariff === item }"
                >
                    <div class="flex justify-between items-center w-full">
                        <div class="flex justfiy-start items-center gap-2">
                            <input
                                :checked="tariff === item"
                                type="radio"
                                name="name"
                                class="hidden"
                            />
                            <div v-if="tariff === item">
                                <img src="/icons/user-check.png" class="w-5" />
                            </div>
                            <div v-else class="unchecked-desc"></div>
                            <q-badge :label="item.quantity" />

                            {{
                                TARIFFS.PREMIUM.code == currentSubsTab
                                    ? $t('file')
                                    : $t('month')
                            }}
                        </div>
                        <div>
                            <span class="font-bold">
                                {{ getSum(item) }}
                            </span>
                            {{ $t('sum') }}
                        </div>
                    </div>
                </label>

                <div
                    v-if="tariff"
                    class="flex justify-start flex-col bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-md"
                >
                    {{ tariff.description }}
                </div>

                <div class="font-bold text-lg mt-6 mb-4">
                    {{ $t('select_card') }}:
                </div>

                <!-- class="mb-4 !w-auto border-2 !rounded-lg cursor-pointer relative !py-2 px-3 font-bold" -->
                <label
                    class="selectable-item"
                    v-for="(card, index) in userStore.userVerifyCards"
                    :key="index"
                    @click="() => (seletedCard = card.id)"
                    :class="{
                        'selectable-item__active': card.id === seletedCard,
                    }"
                >
                    <div class="flex justify-between items-center mb-2">
                        <input
                            :checked="card.id === seletedCard"
                            type="radio"
                            name="name"
                            class="hidden"
                        />
                        <div v-if="card.id === seletedCard">
                            <img src="/icons/user-check.png" class="w-5" />
                        </div>
                        <div v-else class="unchecked-desc"></div>
                        <div>
                            {{ card.card_number }}
                        </div>
                    </div>
                    <div>
                        {{ card.expire }}
                    </div>
                </label>

                <q-btn
                    :loading="loading"
                    @click="addSubscribe"
                    :disabled="!tariff || !seletedCard"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    {{ $t('add') }}
                </q-btn>
            </div>
        </div>
    </BaseModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import { useBillingStore } from 'src/stores/billing'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
import { priceFormat } from 'src/utils/helpers'
import { TARIFFS, TEST_TYPES } from 'src/utils/constants'
import { useMainStore } from 'src/stores/main'
import { useTestStore } from 'src/stores/test'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()
const router = useRouter()
const { subscriptionModal } = storeToRefs(modalStore)

const billingStore = useBillingStore()
const userStore = useUserStore()
const mainStore = useMainStore()
const testStore = useTestStore()

const $q = useQuasar()

const tariff = ref('')
const seletedCard = ref('')
const loading = ref(false)
const currentSubsTab = ref(TARIFFS.PRIME.code)

const getCurrentTabTariffs = computed(() => {
    return billingStore.tariffTypes.filter(
        (tarif) => tarif.unique_name === currentSubsTab.value,
    )
})

const addSubscribe = async () => {
    try {
        loading.value = true

        const exportData = {
            tariff: tariff.value.tariff_id,
            card: seletedCard.value,
            tariff_type: tariff.value.id,
        }

        const res = await billingStore.createSubscription(exportData)
        await billingStore.paySubscription(res.id)
        await billingStore.getSubscriptions({ page_size: 1000 })
        await userStore.getMe()
        subscriptionModal.value = false

        mainStore.changeFireWorks(true)

        const matchedTariff = Object.values(TARIFFS).find(
            (tariff) => tariff.errorText === testStore.errorSubsType,
        )

        if (
            testStore.avtoStartAfterPaying &&
            matchedTariff.code == currentSubsTab.value
        ) {
            mainStore.changeSiteLoader(true)
            await testStore.START_TEST(
                testStore.test_type,
                testStore.testStartPayload,
            )

            router.push({
                name: 'test-solve',
            })
            mainStore.changeSiteLoader(false)
        }
    } catch (error) {
        loading.value = false
        console.log('errorr', error)
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            position: 'top',
            icon: 'warning',
            message: error.response.data.error.message,
        })
    }

    loading.value = false
}

const close = () => {
    subscriptionModal.value = false
}

const getSum = (item) => {
    return priceFormat(Math.ceil(item.price / 100))
}
</script>
<style lang="scss">
#add-subs-modal {
    .q-dialog__inner--minimized {
        padding: 10px;
    }

    .selectable-item {
        display: block;
        border: 2px solid $dark-light;
        cursor: pointer;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 15px;

        &__active {
            border: 2px solid $primary;
        }

        .unchecked-desc {
            border: 2px solid $positive;
            border-radius: 100%;

            height: 20px;
            width: 20px;
        }
    }
}
</style>
