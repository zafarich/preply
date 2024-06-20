import * as api from 'src/api/test'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref, computed } from 'vue-demi'
import { TEST_TYPES } from 'src/utils/constants'

export const useTestStore = defineStore('test', () => {
    const default_test = {
        loaded: false,
        type: '',
        variant_id: 3,
        selected_answer: [],
        active_index: 0,
        active_subject: 0,
    }

    const defualt_test_result = {
        block_test_subjects: [],
        results: [],
        test_type: {},
    }

    const test_type = ref(LocalStorage.getItem('test_type') || '')

    const test_response = ref(LocalStorage.getItem('test_response') || null)
    const questions = ref(LocalStorage.getItem('questions') || [])
    const test = ref(
        LocalStorage.getItem('test') || {
            ...default_test,
        },
    )

    const test_results = ref(
        LocalStorage.getItem('test_results') || { ...defualt_test_result },
    )

    const getOverallBall = computed(() => {
        const sum = test_results.value.results.reduce(
            (partialSum, a) => partialSum + a.score,
            0,
        )
        return sum
    })

    async function getVariants(params) {
        const res = await api.getVariants(params)
        return res?.results
    }

    function changeTestField(data) {
        test.value = { ...test.value, ...data }
        LocalStorage.set('test', test.value)
    }

    function setSelectedAnswer(index, question_index) {
        questions.value[question_index].selected_answer = index
        LocalStorage.set('questions', questions.value)
    }

    function resetStore() {
        test.value = { ...default_test }
        questions.value = []
        test_response.value = null

        LocalStorage.set('test', { ...default_test })
        LocalStorage.set('questions', [])
        LocalStorage.set('test_response', null)
    }

    async function getResultDetail() {
        const res = await api.getTestResultDetail(test_response.value?.id)

        test_results.value = res
        LocalStorage.set('test_results', res)

        return res
    }

    async function startVariantTest(payload) {
        const res = await api.startVariantTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', { ...res, type: TEST_TYPES.SINGLE })
        changeTestField({ type: TEST_TYPES.SINGLE })
        test_type.value = TEST_TYPES.SINGLE
        LocalStorage.set('test_type', TEST_TYPES.SINGLE)
        LocalStorage.set('questions', questions.value)

        return res
    }

    async function endVariantTest() {
        const solved_questions = questions.value.filter(
            (item) => item.selected_answer,
        )

        const answers = []

        solved_questions.forEach((item) => {
            answers.push({
                order_number: item.order_number,
                user_answer: item.selected_answer,
            })
        })

        const data = {
            result_id: test_response.value?.id,
            answers: answers,
        }

        const res = await api.endVariantTest(data)
        console.log('ress', res)
        return res
    }

    async function startBlockTest(payload) {
        const res = await api.startBlockTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', { ...res, type: TEST_TYPES.BLOCK })
        changeTestField({ type: TEST_TYPES.BLOCK })
        test_type.value = TEST_TYPES.BLOCK
        LocalStorage.set('test_type', TEST_TYPES.BLOCK)

        LocalStorage.set('questions', questions.value)

        return res
    }

    async function endBlockTest() {
        const solved_questions = questions.value.filter(
            (item) => item.selected_answer,
        )

        const answers = []

        solved_questions.forEach((item) => {
            answers.push({
                order_number: item.order_number,
                user_answer: item.selected_answer,
            })
        })

        const data = {
            result_id: test_response.value?.id,
            answers,
        }

        const res = await api.endBlockTest(data)
        return res
    }

    async function startBySubjectTest(payload) {
        const res = await api.startBySubjectTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', {
            ...res,
            type: TEST_TYPES.BY_SUBJECTS,
        })
        changeTestField({ type: TEST_TYPES.BY_SUBJECTS })
        test_type.value = TEST_TYPES.BY_SUBJECTS
        LocalStorage.set('test_type', TEST_TYPES.BY_SUBJECTS)

        LocalStorage.set('questions', questions.value)

        return res
    }

    async function endBySubjectTest() {
        const solved_questions = questions.value.filter(
            (item) => item.selected_answer,
        )

        const answers = []

        solved_questions.forEach((item) => {
            answers.push({
                order_number: item.order_number,
                user_answer: item.selected_answer,
            })
        })

        const data = {
            result_id: test_response.value?.id,
            answers,
        }

        const res = await api.endBySubjectTest(data)
        return res
    }

    return {
        getVariants,
        changeTestField,
        test,
        endBySubjectTest,
        test_response,
        test_results,
        startVariantTest,
        setSelectedAnswer,
        getOverallBall,
        questions,
        startBlockTest,
        startBySubjectTest,
        resetStore,
        endBlockTest,
        test_type,
        endVariantTest,
        getResultDetail,
    }
})
