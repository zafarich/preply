<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { computed, onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

const s1 = route.query?.s1

import { useTestStore } from 'src/stores/test'

const testStore = useTestStore()

const notice_test_modal = ref(false)

function close() {
    notice_test_modal.value = false
}

function confirmBack() {
    testStore.resetStore()
    router.go(-1)
}

const tests = ref([])

const test_variant = ref(null)
const test_store = computed(() => testStore.test)

const is_visible_time = computed(() => {
    return testStore.test.type !== 'single'
})
const is_visible_variant_title = computed(() => {
    return testStore.test.type === 'single'
})
const is_visible_subjects = computed(() => {
    return testStore.test.type !== 'single'
})
const questions = computed(() => {
    return testStore.questions
})
const active_test = computed(() => {
    return testStore.questions?.[test_store.value.active_index]
})
onMounted(() => {
    fetchTest()
})

async function fetchTest() {
    let res = testStore.test_response

    if (!test_store.value?.type) {
        if (test_store.value.type === 'single') {
        }
    }

    test_variant.value = res?.test_variant
}

function selectAnswer(index, question_index) {
    testStore.setSelectedAnswer(index, question_index)
}
</script>
<template>
    ``
    <div>
        <div class="test-solve-header">
            <div class="flex items-center top-wrap justify-between px-3 py-1.5">
                <div>
                    <q-btn
                        @click="notice_test_modal = true"
                        color="primary"
                        flat
                        dense
                        label="Orqaga"
                        icon="chevron_left"
                        no-caps
                    ></q-btn>
                </div>
                <div class="flex items-center" v-if="is_visible_time">
                    <img
                        class="mr-2"
                        src="/images/icons/stopwatch.svg"
                        alt=""
                    />
                    <div class="font-semibold text-primary">09:54</div>
                </div>

                <div v-if="is_visible_variant_title" class="font-semibold">
                    {{ test_variant?.title }}
                </div>
            </div>
            <div class="subjects-top-slider" v-if="is_visible_subjects">
                <swiper :slides-per-view="'auto'" :space-between="10">
                    <swiper-slide
                        ><div class="subject-slider-item">
                            Matematika
                        </div></swiper-slide
                    >
                    <swiper-slide
                        ><div class="subject-slider-item _active">
                            Fizika
                        </div></swiper-slide
                    >
                    <swiper-slide
                        ><div class="subject-slider-item">
                            Ingliz tili
                        </div></swiper-slide
                    >
                    <swiper-slide
                        ><div class="subject-slider-item">
                            Ona-tili
                        </div></swiper-slide
                    >
                    <swiper-slide
                        ><button class="subject-slider-item">
                            Tarix
                        </button></swiper-slide
                    >
                </swiper>
            </div>
            <div class="questions-top-slider">
                <swiper :slides-per-view="'auto'" :space-between="5">
                    <swiper-slide
                        v-for="(question, index) in questions"
                        :key="index"
                        ><button
                            @click="
                                testStore.changeTestField({
                                    active_index: index,
                                })
                            "
                            class="question-slider-item"
                            :class="{
                                _active: index == active_test.order_number,
                                _selected: question?.selected_answer >= 0,
                            }"
                        >
                            {{ index + 1 }}
                        </button></swiper-slide
                    >
                </swiper>
            </div>
        </div>
        <div
            :class="{
                'h-[137px]': is_visible_subjects,
                'h-[92px]': !is_visible_subjects,
            }"
        ></div>
        <div class="question-wrap" v-if="active_test">
            <div class="question-text">
                {{ active_test?.order_number + 1 }}. {{ active_test?.question }}
            </div>

            <div class="variants-wrap">
                <button
                    v-for="(answer, index) in active_test?.answers"
                    :key="answer"
                    @click="selectAnswer(index, active_test.order_number)"
                    class="variant-item"
                    :class="{
                        _selected: active_test?.selected_answer === index,
                    }"
                >
                    <b v-if="index === 0">A.</b>
                    <b v-if="index === 1">B.</b>
                    <b v-if="index === 2">C.</b>
                    <b v-if="index === 3">D.</b>
                    {{ answer }}
                </button>
            </div>
        </div>

        <div class="flex justify-between items-center mt-6">
            <div>
                <q-btn
                    v-if="test_store.active_index > 0"
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index - 1,
                        })
                    "
                    label="Oldingi"
                    no-caps
                    color="primary"
                    icon="chevron_left"
                    outline
                    flat
                />
            </div>
            <div v-if="test_store.active_index < questions?.length - 1">
                <q-btn
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index + 1,
                        })
                    "
                    label="Keyingi"
                    no-caps
                    color="primary"
                    icon-right="chevron_right"
                    flat
                />
            </div>
        </div>

        <div class="mt-10">
            <q-btn
                label="Testni yakunlash"
                no-caps
                color="warning"
                class="full-width"
            />
        </div>

        <BaseModal
            :model-value="notice_test_modal"
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
                        <div class="flex justify-center mb-5">
                            <img
                                src="/images/icons/warning_circle.png"
                                alt=""
                            />
                        </div>

                        <div class="font-semibold text-lg mb-2 text-center">
                            Ogohlantirish
                        </div>
                        <div class="font-medium mb-2 text-center">
                            Testni yakunlashni tavsiya qilamiz. Oraqaga
                            qaytishni tasdiqlashingiz bilan ushbu test bekor
                            qilinadi
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button
                            v-close-popup
                            class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                        >
                            Bekor qilish
                        </button>
                        <button
                            @click="confirmBack"
                            class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                        >
                            Tasdiqlash
                        </button>
                    </div>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<style lang="scss" src="src/assets/scss/TestResultQuestionsPage.scss"></style>
