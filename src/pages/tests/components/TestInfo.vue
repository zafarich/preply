<template>
    <div id="test-info">
        <div class="row items-center q-pb-none">
            <div class="title-modal font-medium">
                {{ $t('selected_tests') }}
            </div>
            <q-space />
            <button class="close-modal_btn" v-close-popup>
                <!-- <img src="/images/icons/close-modal.png" alt="" /> -->

                <q-icon name="eva-a" />
            </button>
        </div>
        <div>
            <div class="answers p-0 my-10">
                <div class="flex flex-wrap gap-2 justify-center">
                    <div v-for="(question, index) in questions" :key="index">
                        <button
                            class="answer-item border-4"
                            :class="{
                                '!border-green-500':
                                    isHaveSelectedAnser(question),
                            }"
                            @click="goToLink(question.order_number)"
                        >
                            {{ index + 1 }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'

const props = defineProps({
    questions: {
        type: Array,
        default: [],
    },
})

const emits = defineEmits(['goToLink'])

const modalStore = useModalStore()
const { solveInfoModal } = storeToRefs(modalStore)

const close = () => {
    solveInfoModal.value = false
}
const goToLink = (index) => {
    close()
    setTimeout(() => {
        emits('goToLink', index)
    }, 10)
}

const isHaveSelectedAnser = (question) => {
    return question.hasOwnProperty('selected_answer')
}
</script>
<style lang="scss">
#test-info {
    .answer-item {
        padding: 20px;
        font-size: 16px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        font-weight: 500;
        border: 4px solid $gray-5;
        border-radius: 50%;
    }
}

/* Your component styles here */
</style>
