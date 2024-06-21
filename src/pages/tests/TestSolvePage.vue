<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { computed, onMounted, onUnmounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { TEST_TYPES } from 'src/utils/constants'

import NotifyTestModal from './components/NotifyTestModal.vue'
import EndTestModal from 'src/components/modals/EndTestModal.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

const s1 = route.query?.s1

import { useReferencesStore } from 'src/stores/references'
import { useTestStore } from 'src/stores/test'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'

const testStore = useTestStore()
const modalStore = useModalStore()

const { notifyTestModal, endTestModal } = storeToRefs(modalStore)

async function confirmBack() {
    const test_type = route.query.test_type

    if (test_type == TEST_TYPES.BLOCK) {
        await testStore.endBlockTest()
    } else if (test_type == TEST_TYPES.VARIANT) {
        await testStore.endVariantTest()
    } else if (test_type == TEST_TYPES.BY_SUBJECTS) {
        await testStore.endBySubjectTest()
    }

    testStore.resetStore()

    router.replace({ name: 'home' })
}

let timer
const remainingTime = ref(3 * 60 * 60)
const warningTimePeriod = 3 * 60

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

const isActiveTopSlider = computed(() => {
    if (active_test.value.order_number < 30) return 0
    else if (
        active_test.value.order_number >= 30 &&
        active_test.value.order_number
    )
        return 1
    else 2
})

const active_test = computed(() => {
    return testStore.questions?.[test_store.value.active_index]
})

const updateRemainingTime = () => {
    if (testStore.test_response.started_at) {
        const currentTime = new Date()
        const timeDiff =
            currentTime.getTime() -
            new Date(testStore.test_response.started_at).getTime()
        remainingTime.value = Math.max(
            0,
            3 * 60 * 60 - Math.floor(timeDiff / 1000),
        )
        if (remainingTime.value <= 0) {
            confirmEndTest()
            clearInterval(timer)
        }
    }
}

onMounted(async () => {
    await fetchTest()
    timer = setInterval(updateRemainingTime, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})

const formatTwoRoom = (number) => {
    const strNum = number.toString()
    if (strNum.length == 1) {
        return `0${strNum}`
    } else return strNum
}

const formatTime = (seconds) => {
    const hours = formatTwoRoom(Math.floor(seconds / 3600))
    const mins = formatTwoRoom(Math.floor((seconds % 3600) / 60))
    const secs = formatTwoRoom(seconds % 60)

    return `${hours}:${mins}:${secs}`
}

async function fetchTest() {
    let res = testStore.test_response
    if (!test_store.value?.loaded) {
        testStore.changeTestField({
            loaded: true,
        })
    }

    test_variant.value = res?.test_variant
}

function selectAnswer(index, question_index) {
    testStore.setSelectedAnswer(index, question_index)
}

async function confirmEndTest() {
    $q.loading.show()

    const test_type = route.query.test_type

    console.log('test_type', test_type)

    let res
    if (test_type == TEST_TYPES.BLOCK) {
        await testStore.endBlockTest()
    } else if (test_type == TEST_TYPES.VARIANT) {
        await testStore.endVariantTest()
    } else if (test_type == TEST_TYPES.BY_SUBJECTS) {
        await testStore.endBySubjectTest()
    }

    res = await testStore.getResultDetail()

    $q.loading.hide()

    if (res?.id) {
        testStore.resetStore()
        router.replace({ name: 'test.result', params: { id: res.id } })
    }
}
</script>
<template>
    <div>
        <div class="test-solve-header">
            <div class="flex items-center top-wrap justify-between px-3 py-1.5">
                <div>
                    <q-btn
                        @click="() => (notifyTestModal = true)"
                        color="primary"
                        flat
                        dense
                        :label="$t('back')"
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
                    <div
                        class="font-semibold"
                        :class="
                            warningTimePeriod >= remainingTime
                                ? 'clock-warning'
                                : 'text-primary'
                        "
                    >
                        {{ formatTime(remainingTime) }}
                    </div>
                </div>

                <div v-if="is_visible_variant_title" class="font-semibold">
                    {{ test_variant?.title }}
                </div>
            </div>
            <div class="subjects-top-slider" v-if="is_visible_subjects">
                <swiper :slides-per-view="'auto'" :space-between="10">
                    <!-- :class="{ _active: isActiveTopSlider === index }" -->
                    <swiper-slide
                        v-for="(subject, index) in testStore.test_response
                            ?.block_test_subjects"
                        :key="subject.id"
                        class="subject-slider-item"
                    >
                        {{ subject.title }}
                    </swiper-slide>
                </swiper>
            </div>
            <!-- {{ active_test }} -->
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

        <div class="flex justify-between items-center mt-10">
            <div>
                <q-btn
                    v-if="test_store.active_index > 0"
                    align="around"
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index - 1,
                        })
                    "
                    no-caps
                    class="text-base"
                    color="primary"
                    icon="chevron_left"
                >
                    {{ $t('previous') }}
                </q-btn>
            </div>
            <div v-if="test_store.active_index < questions?.length - 1">
                <q-btn
                    align="around"
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index + 1,
                        })
                    "
                    no-caps
                    class="text-base"
                    color="primary"
                    icon-right="chevron_right"
                >
                    {{ $t('next') }}
                </q-btn>
            </div>
        </div>

        <div class="mt-32">
            <q-btn
                @click="() => (endTestModal = true)"
                :label="$t('finish')"
                no-caps
                color="warning"
                class="full-width"
                size="lg"
            />
        </div>
        <NotifyTestModal @confirmBack="confirmBack" />
        <EndTestModal @confirmEndTest="confirmEndTest" />
    </div>
</template>

<style lang="scss" src="src/assets/scss/TestSolvePage.scss"></style>
<style lang="scss">
.clock-warning {
    animation-name: animation;
    animation-duration: 1s;
    // animation-repeat: infinite;
    animation-iteration-count: infinite;
    animation-delay: 1s;
    animation-fill-mode: none;
}

@keyframes animation {
    0% {
        color: green;
        // border-radius: 50%;
    }

    100% {
        color: rgb(236, 27, 27);
        // border-radius: 50%;
    }
}
</style>
