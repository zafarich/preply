<script setup>
import TestTypeList from 'src/components/TestTypeList.vue'
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'

const modalStore = useModalStore()
const mainStore = useMainStore()

const props = defineProps({
    testTypes: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        required: true,
    },
    test_type: {
        type: String,
        required: true,
    },
})

const showInfoModal = () => {
    mainStore.changeSelectedTariffInfo(props.test_type)
    modalStore.changeTariffInfoModal(true)
}
</script>
<template>
    <div class="popular-subjects">
        <div class="flex mb-6 gap-2 items-center">
            <div class="font-semibold text-xl">{{ label }}</div>
            <div @click="showInfoModal()">
                <q-icon name="eva-info-outline" color="primary" size="md" />
            </div>
        </div>

        <TestTypeList :test-types="testTypes" />
    </div>
</template>

<style lang="scss"></style>
