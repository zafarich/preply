<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import { useBillingStore } from 'src/stores/billing'
import { onMounted } from 'vue'
import { ref } from 'vue'

const modalStore = useModalStore()
const { subscriptionModal } = storeToRefs(modalStore)

const billingStore = useBillingStore()

const tariff = ref('')
const card = ref('')

onMounted(async () => {
    await billingStore.getTariffs()
})

const addSubscribe = () => {}

const close = () => {
    subscriptionModal.value = false
}
</script>

<template>
    <BaseModal
        :model-value="subscriptionModal"
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
            <div>
                <div class="mb-8">
                    <BaseSelect
                        v-model="tariff"
                        emit-value
                        map-options
                        outlined
                        placeholder="Tarif tanlang"
                        :options="billingStore.tariffs"
                        option-label="title"
                        option-value="id"
                    />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-close-popup
                        class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                    >
                        Yo'q
                    </button>
                    <button
                        @click="addSubscribe"
                        class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                    >
                        Yakunlash
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
