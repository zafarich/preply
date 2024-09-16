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
    testType: {
        type: String,
        required: true,
    },
})

const showInfoModal = () => {
    mainStore.changeSelectedTariffInfo(props.testType)
    modalStore.changeTariffInfoModal(true)
}
</script>
<template>
    <div class="popular-subjects">
        <TestTypeList :test-types="testTypes" />
    </div>
</template>

<style lang="scss"></style>
