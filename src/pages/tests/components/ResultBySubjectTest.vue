<script setup>
import { useTestStore } from 'src/stores/test'
import { computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const testStore = useTestStore()

const emit = defineEmits(['returnListItemColor'])

const returnListItemColor = (item, answer, cIndex) => {
    if (item.is_correct && cIndex == item.correct_answer) {
        return 'bg-green text-white !border-0'
    } else if (!item.is_correct && cIndex == item.user_answer) {
        return 'bg-red text-white !border-0'
    } else if (!item.is_correct && cIndex == item.correct_answer) {
        return 'bg-green text-white !border-0'
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

const getUnmarkedAnswersCount = computed(() => {
    const count = testStore.test_results.results.reduce(
        (partialCount, a) => (partialCount + !a.user_answer ? 1 : 0),
        0,
    )
    return count
})
</script>

<template>
    <div class="font-bold text-xl my-4">
        {{ testStore.test_results?.test_type.title }}
    </div>
    <div class="flex justify-start items-center text-lg">
        <div class="mr-2">Savollar soni -</div>
        <div>{{ testStore.test_results.results.length }} ta</div>
    </div>
    <div class="flex justify-start items-center text-lg">
        <div class="bg-green-500 h-[20px] w-[20px] rounded-full mr-2"></div>
        <div class="mr-2">To'g'ri javoblar -</div>
        <div>{{ getCorrectAnswersCount }} ta</div>
    </div>

    <div class="flex justify-start items-center text-lg">
        <div class="bg-red-500 h-[20px] w-[20px] rounded-full mr-2"></div>
        <div class="mr-2">Noto'g'ri javoblar -</div>
        <div>
            {{ testStore.test_results.results.length - getCorrectAnswersCount }}
            ta
        </div>
    </div>

    <div class="flex justify-start items-center text-lg mb-5">
        <div class="bg-gray-500 h-[20px] w-[20px] rounded-full mr-2"></div>
        <div class="mr-2">Belgilanmagan savollar -</div>
        <div>{{ getUnmarkedAnswersCount }} ta</div>
    </div>

    <!-- <div class="subjects-top-slider" v-if="testStore.test_results?.results">
        <swiper :slides-per-view="'auto'" :space-between="10">
            <div
                v-for="(answer, index) in testStore.test_results?.results"
                :key="answer.id"
                class="subject-slider-item mr-1 mb-2"
            >
                {{ answer.order_number + 1 }}
            </div>
        </swiper>
        <div>Jami: {{ testStore.getOverallBall }} ball</div>
    </div> -->
    <div class="questions-top-slider p-0 mb-10">
        <!-- <swiper :slides-per-view="'auto'" :space-between="5"> -->
        <div class="flex flex-wrap gap-2">
            <div
                v-for="(answer, index) in testStore.test_results?.results"
                :key="index"
            >
                <button
                    class="question-slider-item border-4"
                    :class="{
                        '!border-red-500': !answer.is_correct,
                        '!border-green-500': answer.is_correct,
                        '!border-gray-500': !answer.user_answer,
                    }"
                >
                    {{ index + 1 }}
                </button>
            </div>
        </div>
        <!-- </swiper> -->
    </div>

    <div
        class="mb-8 question-wrap"
        v-for="(item, bIndex) in testStore.test_results.results"
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
</template>
