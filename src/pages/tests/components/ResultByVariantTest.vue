<script setup>
import { useTestStore } from 'src/stores/test'
import { computed } from 'vue'

const testStore = useTestStore()

const returnListItemColor = (item, answer, cIndex) => {
    if (item.is_correct && cIndex == item.correct_answer) {
        return 'bg-green text-white !border-0'
    } else if (!item.is_correct && cIndex == item.user_answer) {
        return 'bg-red text-white !border-0'
    } else if (!item.is_correct && cIndex == item.correct_answer) {
        return 'bg-warning text-white !border-0'
    }
    return ''
}

const getCorrectAnswersCount = computed(() => {
    const count = testStore.test_results.results.reduce(
        (partialCount, a) => (partialCount + a.is_correct ? 1 : 0),
        0,
    )
    return count
})
</script>

<template>
    <div class="font-bold text-xl my-4">
        {{ testStore.test_results?.test_variant.title }}
    </div>
    <div class="flex justify-start items-center mb-8 text-lg">
        <div class="mr-2">To'g'ri javoblar soni :</div>
        <div>{{ getCorrectAnswersCount }} ta</div>
    </div>

    <div
        class="mb-8 question-wrap"
        v-for="(item, index) in testStore.test_results.results"
        :key="index"
    >
        <div class="question-text">
            {{ item.order_number + 1 }} {{ item.question }}
        </div>
        <div class="variants-wrap">
            <button
                v-for="(answer, cIndex) in item.answers"
                :key="cIndex"
                class="variant-item"
                :class="returnListItemColor(item, answer, cIndex)"
            >
                <b v-if="cIndex === 0">A.</b>
                <b v-if="cIndex === 1">B.</b>
                <b v-if="cIndex === 2">C.</b>
                <b v-if="cIndex === 3">D.</b>
                {{ answer }}
            </button>
        </div>
    </div>
</template>
