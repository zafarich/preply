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
            <div class="flex justify-end items-center mt-5 mb-8">
                <q-btn
                    @click="
                        sendFileToTelegramUser(testStore.GET_TESTS.pdf_file)
                    "
                    color="primary"
                    no-caps
                >
                    <q-icon name="eva-download-outline" size="xs"></q-icon>
                    <span class="ml-1"> {{ $t('download_file') }} </span>
                </q-btn>
            </div>

            <div class="flex justify-center items-center mt-3 mb-5">
                <div class="font-medium text-xl">
                    {{ $t(getTestTypeTitle) }}
                </div>
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
                    <div class="font-medium text-base mb-2">
                        {{ $t('main_subjects') }}
                    </div>

                    <div
                        class="w-full text-sm border-2 border-[#4f9e91] rounded-10 text-center py-1.5 mb-1.5"
                        v-for="(subject, index) in testStore.GET_TESTS
                            .block_test_subjects"
                        :key="index"
                    >
                        {{ subject.title }}
                    </div>
                    <div class="font-medium text-base mt-4 mb-2">
                        {{ $t('compulsory_subjects') }}
                    </div>
                    <div
                        class="w-full text-sm border-2 border-[#4f9e91] rounded-10 text-center py-1.5 mb-1.5"
                        v-for="(subject, index) in MANDATORY_SUBJECTS"
                        :key="index"
                    >
                        {{ $t(subject.label) }}
                    </div>
                </div>
                <div
                    v-else-if="
                        testStore.GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS
                    "
                >
                    <div
                        class="w-full text-lg border-2 border-[#4f9e91] rounded-10 text-center py-1.5 mb-1.5"
                        v-for="(subject, index) in testStore.GET_TESTS
                            .block_test_subjects"
                        :key="index"
                    >
                        {{ subject.title }}
                    </div>
                </div>
                <div
                    v-else-if="
                        testStore.GET_TEST_TYPE === TEST_TYPES.CERTIFICATE
                    "
                >
                    <div
                        class="w-full text-lg border-2 border-[#4f9e91] rounded-10 text-center py-1.5 mb-1.5"
                        v-for="(subject, index) in testStore.GET_TESTS
                            .block_test_subjects"
                        :key="index"
                    >
                        {{ subject.title }}
                    </div>
                </div>
            </div>

            <div
                class="question-wrap"
                v-for="(question, index) in testStore.test_questions"
                :key="index"
                :id="`question_${question.order_number}`"
            >
                <div class="question-text">
                    <span class="">{{ question.order_number + 1 }} ) </span>

                    {{ question.question }}
                </div>
                <div class="my-4" v-if="question.question_image">
                    <img :src="question.question_image" />
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
            <TestInfo
                :questions="testStore.test_questions"
                @goToLink="goToLink"
            />
            <div class="mt-10 mb-24">
                <q-btn
                    @click="() => (endTestModal = true)"
                    :label="$t('finish')"
                    no-caps
                    color="warning"
                    class="full-width"
                />
            </div>
        </div>

        <NotifyTestModal @confirmBack="confirmBack" />
        <EndTestModal @confirmEndTest="confirmEndTest" />

        <div
            class="fixed bottom-24 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToTop"
            id="scrollIcon"
            v-if="showToTop"
        >
            <img src="/images/icons/to-top-icon.svg" class="w-4 h-4" />
        </div>
        <div
            class="fixed bottom-12 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToBottom"
            id="scrollIcon"
            v-if="showToBottom"
        >
            <img
                src="/images/icons/to-top-icon.svg"
                class="w-4 h-4 rotate-180"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue-demi'
import { useRouter } from 'vue-router'
import { MANDATORY_SUBJECTS, TEST_TYPES } from 'src/utils/constants'
import { api } from 'src/boot/axios'
import NotifyTestModal from './components/NotifyTestModal.vue'
import EndTestModal from 'src/components/modals/EndTestModal.vue'

import { useTestStore } from 'src/stores/test'
import { useModalStore } from 'src/stores/modal'
import { useMainStore } from 'src/stores/main'
import { storeToRefs } from 'pinia'
import TestInfo from './components/TestInfo.vue'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { scrollToTop, scrollToBottom } from 'src/utils/helpers'

const { t: $t } = useI18n()
const router = useRouter()
const testStore = useTestStore()
const modalStore = useModalStore()
const mainStore = useMainStore()
const userStore = useUserStore()

const $q = useQuasar()

const showToTop = ref(false)
const showToBottom = ref(true)

const { notifyTestModal, endTestModal } = storeToRefs(modalStore)

async function confirmBack() {
    mainStore.changeSiteLoader(true)
    await testStore.UPDATE_TEST_RESULT()
    router.replace({ name: 'home' })
    testStore.RESET_TEST_STORE()
    mainStore.changeSiteLoader(false)
}

const getTestTypeTitle = computed(() => {
    if (testStore.GET_TEST_TYPE === TEST_TYPES.VARIANT) {
        return 'by_variant'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BLOCK) {
        return 'by_block'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BY_SELECTIONS) {
        return 'by_selections'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.BY_SUBJECTS) {
        return 'by_science'
    } else if (testStore.GET_TEST_TYPE === TEST_TYPES.CERTIFICATE) {
        return 'national_certificate_tests'
    }
})

let timer
const remainingTime = ref(testStore.GET_TEST_TIME)
const warningTimePeriod = 3 * 60

const updateRemainingTime = () => {
    if (testStore.GET_TESTS && testStore.GET_TESTS.started_at) {
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

const sendFileToTelegramUser = async () => {
    try {
        const res = await userStore.sendFileToUserTelegram({
            result_id: testStore.GET_TESTS.id,
        })

        $q.notify({
            type: 'positive',
            textColor: 'white',
            position: 'top',
            message: $t('file_sended_to_tg'),
        })
    } catch (error) {
        console.error('Error sending file to telegram:', error)
        $q.notify({
            type: 'negative',
            textColor: 'white',
            position: 'top',
            message: $t('error_occured'),
        })
    }
}

// const downloadPdf = async (pdfUrl) => {
//     try {
//         const response = await api.get(pdfUrl, {
//             responseType: 'blob',
//         })

//         const fileUrl = response.request.responseURL

//         const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)

//         const url = window.URL.createObjectURL(new Blob([response.data]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', fileName) // You can set the file name here
//         document.body.appendChild(link)
//         link.click()
//         link.remove()
//         window.URL.revokeObjectURL(url)

//         $q.notify({
//             type: 'positive',
//             textColor: 'white',
//             position: 'top',
//             message: $t('file_saved'),
//         })
//     } catch (error) {
//         console.error('Error downloading the PDF file:', error)
//         $q.notify({
//             type: 'negative',
//             textColor: 'white',
//             position: 'top',
//             message: $t('error_occured'),
//         })
//     }
// }

onMounted(async () => {
    if (remainingTime <= 0) {
        clearInterval(timer)
        confirmEndTest()
    } else {
        timer = setInterval(updateRemainingTime, 1000)

        window.addEventListener('scroll', () => {
            const scrollIcon = document.getElementById('scrollIcon')
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop

            if (scrollTop > 500) {
                showToTop.value = true
            } else {
                showToTop.value = false
            }
            // }
        })
    }
})

onUnmounted(() => {
    clearInterval(timer)
})

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
        behavior: 'instant',
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

    testStore.RESET_TEST_STORE()
    if (res?.id) {
        router.replace({ name: 'test.result', params: { id: res.id } })
        mainStore.changeFireWorks(false)
    }

    mainStore.changeSiteLoader(false)
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
            z-index: 99;
        }
    }

    .question-wrap {
        margin-bottom: 40px;

        .question-text {
            margin-top: 16px;
            font-size: 14px;
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
                font-size: 14px;
                // background-color: #f4f4f4;
            }

            ._selected {
                // background-color: $;
                border: 2px solid #2196f3;
            }
        }
    }
}
</style>
