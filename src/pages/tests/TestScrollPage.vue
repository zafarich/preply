<template>
    <div id="test-scroll-page" class="relative">
        <div class="result-page">
            <div class="result-page-header">
                <div class="confirmBack">
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
                        :class="
                            warningTimePeriod >= remainingTime
                                ? 'clock-warning'
                                : 'text-primary'
                        "
                    />
                    <div class="font-semibold text-primary">
                        {{ formatTime(remainingTime) }}
                    </div>
                </div>
            </div>
            <div class="font-medium text-center mt-3 mb-5 text-xl">
                {{ getTestTypeTitle }}
            </div>
            <div class="font-medium text-lg mb-10" v-if="testStore.GET_TESTS">
                <div v-if="testStore.GET_TEST_TYPE === TEST_TYPES.VARIANT">
                    <div>
                        {{ testStore.GET_TESTS.test_variant.subject.title }}
                    </div>
                    <div>
                        {{ testStore.GET_TESTS.test_variant.title }}
                    </div>
                </div>
                <div v-else-if="testStore.GET_TEST_TYPE === TEST_TYPES.BLOCK">
                    <q-badge
                        outline
                        color="primary"
                        v-for="(subject, index) in testStore.GET_TESTS
                            .block_test_subjects"
                        :key="index"
                        class="text-lg"
                    >
                        {{ index + 1 }}. {{ subject.title }}
                    </q-badge>
                </div>
                <div
                    v-else-if="
                        testStore.GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS
                    "
                >
                    <q-badge
                        outline
                        color="primary"
                        v-for="(subject, index) in testStore.GET_TESTS
                            .block_test_subjects"
                        :key="index"
                        :label="subject.title"
                        class="text-lg"
                    />
                </div>
            </div>

            <div
                class="question-wrap"
                v-for="(question, index) in testStore.test_questions"
                :key="index"
                :id="`question_${question.order_number}`"
            >
                <div class="question-text">
                    {{ question.order_number + 1 }}.
                    {{ question.question }}
                </div>
                <div class="variants-wrap">
                    <button
                        class="variant-item"
                        v-for="(answer, answerIndex) in question.answers"
                        :key="answerIndex"
                        @click="
                            selectAnswer(answerIndex, question.order_number)
                        "
                        :class="{
                            _selected: question.selected_answer === answerIndex,
                        }"
                    >
                        <b v-if="answerIndex === 0">A.</b>
                        <b v-if="answerIndex === 1">B.</b>
                        <b v-if="answerIndex === 2">C.</b>
                        <b v-if="answerIndex === 3">D.</b>
                        {{ answer }}
                    </button>
                </div>
            </div>
            <div class="mt-10 mb-24">
                <q-btn
                    @click="() => (solveInfoModal = true)"
                    label="Urinishlar"
                    no-caps
                    color="primary"
                    class="full-width py-2 mb-4"
                    size="md"
                />
                <q-btn
                    @click="() => (endTestModal = true)"
                    :label="$t('finish')"
                    no-caps
                    color="warning"
                    class="full-width py-2"
                    size="md"
                />
            </div>
        </div>

        <NotifyTestModal @confirmBack="confirmBack" />
        <EndTestModal @confirmEndTest="confirmEndTest" />
        <SolveInfoModal
            :questions="testStore.test_questions"
            @goToLink="goToLink"
        />

        <div
            class="fixed bottom-14 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToTop"
            id="scrollIcon"
            v-if="showIcon"
        >
            <img src="/images/icons/to-top-icon.svg" class="w-4 h-4" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue-demi'
import { useRouter } from 'vue-router'
import { TEST_TYPES } from 'src/utils/constants'

import NotifyTestModal from './components/NotifyTestModal.vue'
import EndTestModal from 'src/components/modals/EndTestModal.vue'

import { useTestStore } from 'src/stores/test'
import { useModalStore } from 'src/stores/modal'
import { useMainStore } from 'src/stores/main'
import { storeToRefs } from 'pinia'
import SolveInfoModal from './components/SolveInfoModal.vue'

const router = useRouter()
const testStore = useTestStore()
const modalStore = useModalStore()
const mainStore = useMainStore()

const showIcon = ref(false)

const { notifyTestModal, endTestModal, solveInfoModal } =
    storeToRefs(modalStore)

async function confirmBack() {
    await testStore.END_TEST()
    testStore.RESET_TEST_STORE()

    router.replace({ name: 'home' })
}

const getTestTypeTitle = computed(() => {
    if (testStore.GET_TEST_TYPE === TEST_TYPES.VARIANT) {
        return 'Variant Test'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BLOCK) {
        return 'Blok Test'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BY_SELECTIONS) {
        return 'Mavzulashtirilgan test'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS) {
        return 'Mock Test'
    }
})

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

    window.addEventListener('scroll', () => {
        const scrollIcon = document.getElementById('scrollIcon')
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > 500) {
            showIcon.value = true
        } else {
            showIcon.value = false
        }
        // }
    })
})

onUnmounted(() => {
    clearInterval(timer)
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const goToLink = (index) => {
    const element = document.getElementById(`question_${index}`)
    console.log('liIndex', index)
    console.log('element', element)
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    console.log('offsetPosition', offsetPosition)

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    })
}

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
    console.log('index', index)
    console.log('question_index', question_index)
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

<style lang="scss">
#test-scroll-page {
    .result-page {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            background: white;
            padding: 15px 15px;
            margin: 0 -12px;
            border-bottom: 1px solid $gray-5;
        }
    }

    .question-wrap {
        margin-bottom: 40px;

        .question-text {
            margin-top: 16px;
            font-size: 18px;
            font-weight: bold;
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
                font-size: 16px;
                // background-color: #f4f4f4;
            }

            ._selected {
                // background-color: $;
                border: 2px solid #ffcf26;
            }
        }
    }
}
</style>
