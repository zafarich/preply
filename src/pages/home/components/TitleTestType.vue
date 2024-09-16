<template>
    <div class="flex mb-6 gap-2 items-center">
        <div class="font-semibold text-xl">{{ label }}</div>
        <div @click="showInfoModal()">
            <q-icon name="eva-info-outline" color="primary" size="md" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    testType: {
        type: String,
        required: true,
    },
})

const modalStore = useModalStore()
const mainStore = useMainStore()

const showInfoModal = () => {
    mainStore.changeSelectedTariffInfo(props.testType)
    modalStore.changeTariffInfoModal(true)
}
</script>

<style>
/* Your component styles here */
</style>
