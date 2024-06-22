<script setup>
import { useTestStore } from 'src/stores/test'

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
</script>

<template>
    <div class="subjects-top-slider" v-if="testStore.test_results?.results">
        <div
            v-for="(subject, index) in testStore.test_results?.results"
            :class="{ _active: isActiveTopSlider === index }"
            :key="subject.id"
            class="subject-slider-item mr-1 mb-2"
        >
            {{ subject.subject.title }} : {{ subject.score }} ball
        </div>
        <div>Jami: {{ testStore.getOverallBall }} ball</div>
    </div>

    <div
        v-for="(result, aIndex) in testStore.test_results.results"
        :key="aIndex"
    >
        <h3 class="font-bold" v-if="result.subject && result.subject.title">
            {{ result.subject.title }}
        </h3>

        <div
            class="mb-8 question-wrap"
            v-for="(item, bIndex) in result.items"
            :key="bIndex"
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
    </div>
</template>
