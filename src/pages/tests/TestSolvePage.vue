<template>
    <div id="test-solve">
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
                <div class="flex items-center">
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
            </div>
            <div class="subjects-top-slider" v-if="is_visible_subjects">
                <swiper
                    :slides-per-view="'auto'"
                    :space-between="10"
                    :speed="100"
                >
                    <swiper-slide-
                        v-for="(subject, index) in testStore.GET_TESTS
                            ?.block_test_subjects"
                        :key="index"
                        class="subject-slider-item"
                    >
                        {{ subject.title }}
                    </swiper-slide->
                </swiper>
            </div>
            <div class="questions-top-slider">
                <swiper
                    :speed="100"
                    :slides-per-view="'auto'"
                    :space-between="5"
                >
                    <swiper-slide
                        v-for="(
                            question, index
                        ) in testStore.GET_TEST_QUESTIONS"
                        :key="index"
                        ><button
                            @click="testStore.SELECT_TEST(index)"
                            class="question-slider-item"
                            :class="{
                                _selected: question?.selected_answer >= 0,
                                _active:
                                    index == testStore.GET_ACTIVE_TEST_INDEX,
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
        <div class="question-wrap">
            <div class="question-text">
                {{ testStore.GET_ACTIVE_TEST?.order_number + 1 }}.
                {{ testStore.GET_ACTIVE_TEST?.question }}
            </div>

            <div class="variants-wrap">
                <button
                    v-for="(answer, index) in testStore.GET_ACTIVE_TEST
                        ?.answers"
                    :key="answer"
                    @click="
                        selectAnswer(
                            index,
                            testStore.GET_ACTIVE_TEST.order_number,
                        )
                    "
                    class="variant-item"
                    :class="{
                        _selected:
                            testStore.GET_ACTIVE_TEST?.selected_answer ===
                            index,
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
                    v-if="testStore.GET_ACTIVE_TEST_INDEX > 0"
                    align="around"
                    @click="
                        testStore.SELECT_TEST(
                            testStore.GET_ACTIVE_TEST_INDEX - 1,
                        )
                    "
                    no-caps
                    class="text-base"
                    color="primary"
                    icon="chevron_left"
                >
                    {{ $t('previous') }}
                </q-btn>
            </div>
            <div
                v-if="
                    testStore.GET_ACTIVE_TEST_INDEX <
                    testStore.GET_TEST_QUESTIONS?.length - 1
                "
            >
                <q-btn
                    align="around"
                    @click="
                        testStore.SELECT_TEST(
                            testStore.GET_ACTIVE_TEST_INDEX + 1,
                        )
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

        <div class="mt-20">
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

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { computed, onMounted, onUnmounted, ref } from 'vue-demi'
import { useRouter, useRoute } from 'vue-router'
import { TEST_TYPES } from 'src/utils/constants'

import NotifyTestModal from './components/NotifyTestModal.vue'
import EndTestModal from 'src/components/modals/EndTestModal.vue'

import { useTestStore } from 'src/stores/test'
import { useModalStore } from 'src/stores/modal'
import { useMainStore } from 'src/stores/main'
import { storeToRefs } from 'pinia'

const router = useRouter()
const testStore = useTestStore()
const modalStore = useModalStore()
const mainStore = useMainStore()

const showIcon = ref(false)

const { notifyTestModal, endTestModal } = storeToRefs(modalStore)

async function confirmBack() {
    await testStore.END_TEST()
    testStore.RESET_TEST_STORE()

    router.replace({ name: 'home' })
}

let timer
const remainingTime = ref(testStore.GET_TEST_TIME)
const warningTimePeriod = 3 * 60

const is_visible_subjects = computed(() => {
    return testStore.GET_TEST_TYPE !== TEST_TYPES.BLOCK
})

const updateRemainingTime = () => {
    if (testStore.GET_TESTS.started_at) {
        const currentTime = new Date()
        const timeDiff =
            currentTime.getTime() -
            new Date(testStore.GET_TESTS.started_at).getTime()
        remainingTime.value = Math.max(
            0,
            testStore.GET_TEST_TIME - Math.floor(timeDiff / 1000),
        )

        if (remainingTime.value <= 0) {
            confirmEndTest()
            clearInterval(timer)
        }
    }
}

onMounted(async () => {
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

function selectAnswer(index, question_index) {
    testStore.SELECT_ANSWER(index, question_index)
}

async function confirmEndTest() {
    mainStore.changeSiteLoader(true)

    await testStore.END_TEST()

    let res = await testStore.FETCH_TEST_RESULT()

    if (res?.id) {
        testStore.RESET_TEST_STORE()
        router.replace({ name: 'test.result', params: { id: res.id } })
    }
    mainStore.changeSiteLoader(true)
}
</script>
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
