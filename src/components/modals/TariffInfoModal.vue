<template>
    <BaseModal
        :model-value="tariffInfoModal"
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

            <div class="flex justify-center mb-3">
                <img :src="findTariffByCode.icon" alt="" class="h-10 w-10" />
            </div>
            <div class="font-semibold text-lg mb-2 text-center">
                {{ $t(findTariffByCode.label) }}
            </div>
            <div class="font-medium text-gray text-center">
                {{ $t(findTariffByCode.info) }}
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'
import { TARIFFS } from 'src/utils/constants'
import { computed } from 'vue'

const modalStore = useModalStore()
const mainStore = useMainStore()

const findTariffByCode = computed(() =>
    Object.values(TARIFFS).find(
        (tariff) => tariff.code === mainStore.selectedTariffInfo,
    ),
)

const { tariffInfoModal } = storeToRefs(modalStore)

const close = () => {
    tariffInfoModal.value = false
}
</script>
