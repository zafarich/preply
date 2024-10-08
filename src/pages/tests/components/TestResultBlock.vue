<template>
    <div class="font-semibold text-xl mb-4 mt-6 text-center">
        <div>
            {{ testStore.GET_TEST_RESULTS?.test_type.title }}
            <span class="ml-2" v-if="testStore.GET_TEST_RESULTS?.test_variant">
                {{ testStore.GET_TEST_RESULTS?.test_variant.title }}
            </span>
        </div>

        <div class="flex justify-center items-center text-lg mb-4">
            <div class="mr-1">
                <img class="mr-2" src="/images/icons/stopwatch.svg" alt="" />
            </div>
            <div>{{ spendTime }}</div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-5 q-pa-sm mt-5">
        <q-btn
            @click="sendFileToTelegramUser(testStore.GET_TEST_RESULTS.pdf_file)"
            color="primary"
            no-caps
        >
            <q-icon name="eva-download-outline" size="xs"></q-icon>
            <span class="ml-1"> {{ $t('download_file') }} </span>
        </q-btn>
        <!-- <q-btn
            @click="sendFileToTelegramUser"
            color="secondary"
            no-caps
            outline
        >
            <div class="flex justify-center items-center">
                <img
                    src="/icons/send-tg.png"
                    alt=""
                    class="w-7 h-7 cursor-pointer"
                />
                <span class="ml-1"> {{ $t('send_to_tg') }} </span>
            </div>
        </q-btn> -->
        <q-btn @click="dowloadResultPage" color="secondary" no-caps>
            <q-icon name="eva-download-outline" size="xs"></q-icon>
            <span class="ml-1"> {{ $t('download_result') }} </span>
        </q-btn>
    </div>
    <div class="q-pa-sm font-medium" ref="pdfContent">
        <div class="flex justify-start items-center text-lg">
            <div class="mr-2">{{ $t('answers_count') }} -</div>
            <div>{{ getTotalTestCount }}</div>
        </div>

        <div class="flex justify-start items-center text-lg">
            <div class="bg-green-500 h-[20px] w-[20px] rounded-full mr-2"></div>
            <div class="mr-2">{{ $t('correct_answers') }} -</div>
            <div>{{ getCorrectAnswersCount }}</div>
        </div>

        <div class="flex justify-start items-center text-lg">
            <div class="bg-red-500 h-[20px] w-[20px] rounded-full mr-2"></div>
            <div class="mr-2">{{ $t('wrong_answers') }} -</div>
            <div>{{ getFalsyAnswersCount }}</div>
        </div>

        <div class="flex justify-start items-center text-lg mb-5">
            <div class="bg-gray-500 h-[20px] w-[20px] rounded-full mr-2"></div>
            <div class="mr-2">{{ $t('unmarked_anwers') }} -</div>
            <div>{{ getUnmarkedAnswersCount }}</div>
        </div>

        <div class="answers p-0 mb-10">
            <div class="flex flex-wrap gap-2 justify-center">
                <div v-for="(answer, index) in getAllResults" :key="index">
                    <button
                        class="answer-item border-4"
                        :class="returnBorderColor(answer)"
                        @click="goToLink(answer.order_number)"
                    >
                        {{ index + 1 }}
                    </button>
                </div>
            </div>
        </div>

        <div
            class="mb-8 question-wrap !text-sm"
            v-for="(item, bIndex) in getAllResults"
            :key="bIndex"
        >
            <div
                class="question-text relative"
                :id="`question_${item.order_number}`"
            >
                <span class="mr-1 inline-block absolute top-[-12px]">
                    <img
                        v-if="item.is_correct"
                        src="/icons/check-mark.png"
                        class="!w-8 mt-1"
                    />
                    <img v-else src="/icons/cancel.png" class="!w-8 mt-1" />
                </span>
                <span
                    ><span class="ml-9"> {{ item.order_number + 1 }} ) </span>
                    {{ item.question }}</span
                >
            </div>

            <div class="my-4" v-if="item.question_image">
                <img :src="item.question_image" />
            </div>
            <div class="variants-wrap">
                <button
                    v-for="(answer, cIndex) in item.answers"
                    :key="cIndex"
                    class="variant-item"
                    :class="returnListItemColor(item, cIndex)"
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

<script setup>
import { useTestStore } from 'src/stores/test'
import { computed, ref } from 'vue'
import html2pdf from 'html2pdf.js'
import { useQuasar } from 'quasar'

const testStore = useTestStore()

const emit = defineEmits([
    'returnListItemColor',
    'downloadPdf',
    'dowloadResultPage',
    'sendFileToTelegramUser',
])

const pdfContent = ref(null)
const $q = useQuasar()

const dowloadResultPage = async () => {
    emit('dowloadResultPage', pdfContent.value)
}

const getAllResults = computed(() => {
    let items = []

    for (let subjects of testStore.GET_TEST_RESULTS.results) {
        items = [...items, ...subjects.items]
    }

    return items
})

const getTotalTestCount = computed(() => {
    return getAllResults.value.length
})

const returnListItemColor = (item, cIndex) => {
    if (item.is_correct && cIndex == item.correct_answer) {
        return 'bg-green text-white !border-0'
    } else if (!item.is_correct && cIndex == item.user_answer) {
        return 'bg-red text-white !border-0'
    } else if (!item.is_correct && cIndex == item.correct_answer) {
        return 'bg-green text-white !border-0'
    }
    return ''
}

const returnBorderColor = (item) => {
    if (item.is_correct) {
        return '!border-green-500'
    } else if (!item.is_correct && !!item.user_answer) {
        return '!border-red-500'
    } else return '!border-gray-500'
}
const sendFileToTelegramUser = async () => {
    emit('sendFileToTelegramUser', pdfContent.value)
}

const downloadPdf = async (pdfUrl) => {
    emit('downloadPdf', pdfUrl)
}

const goToLink = (index) => {
    const element = document.getElementById(`question_${index}`)
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
        top: offsetPosition,
        behavior: 'instant',
    })
}

const getCorrectAnswersCount = computed(() => {
    const count = getAllResults.value.reduce(
        (partialCount, a) => (partialCount + a.is_correct ? 1 : 0),
        0,
    )
    return count
})

const getUnmarkedAnswersCount = computed(() => {
    const count = getAllResults.value.reduce(
        (partialCount, a) => partialCount + (!a.user_answer ? 1 : 0),
        0,
    )
    return count
})

const getFalsyAnswersCount = computed(() => {
    const count = getAllResults.value.reduce(
        (partialCount, a) =>
            partialCount + (a.user_answer && !a.is_correct ? 1 : 0),
        0,
    )
    return count
})

const spendTime = computed(() => {
    const date1 = new Date(testStore.GET_TEST_RESULTS.finished_at)
    const date2 = new Date(testStore.GET_TEST_RESULTS.started_at)

    const differenceInMilliseconds = Math.abs(date1 - date2)

    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60))
    const minutes = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    )
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000)

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
</script>

<style lang="scss" src="src/assets/scss/TestResultPage.scss"></style>
