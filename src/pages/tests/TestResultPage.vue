<script setup>
import { computed, onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

import { useTestStore } from 'src/stores/test'

const testStore = useTestStore()

const test_id = route.params.id

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
    <div class="q-pa-sm">
        <div class="subjects-top-slider">
            <swiper :slides-per-view="'auto'" :space-between="10">
                <swiper-slide
                    v-for="(subject, index) in testStore.test_results
                        ?.block_test_subjects"
                    :class="{ _active: isActiveTopSlider === index }"
                    :key="subject.id"
                    class="subject-slider-item"
                >
                    {{ subject.title }}
                </swiper-slide>
            </swiper>
        </div>
        <div
            v-for="(result, aIndex) in testStore.test_results.results"
            :key="aIndex"
        >
            <h3 class="font-bold">{{ result.subject.title }}</h3>

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
    </div>
</template>

<style lang="scss">
.subjects-top-slider {
    padding: 8px 0;
    .swiper-slide {
        width: auto !important;
    }

    .subject-slider-item {
        padding: 4px 12px;
        font-size: 13px;
        color: #333;
        font-weight: 500;
        border: 1px solid $gray-5;
        border-radius: 8px;
    }

    ._active {
        background-color: $primary;
        color: #fff;
        border: 1px solid $primary;
    }
}
.question-wrap {
    .question-text {
        margin-top: 16px;
    }
    .variants-wrap {
        margin-top: 24px;
        .variant-item {
            padding: 12px 24px;
            border-radius: 10px;
            border: 2px solid $gray-5;
            width: 100%;
            display: block;
            text-align: left;
            margin-bottom: 10px;
            // background-color: #f4f4f4;
        }
        ._selected {
            // background-color: $;
            border: 2px solid #ffcf26;
        }
    }
}
</style>
