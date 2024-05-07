import * as api from 'src/api/test'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue-demi'

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

    async function getVariants(params) {
        const res = await api.getVariants(params)
        return res?.results
    }

    async function startVariantTest(payload) {
        const res = await api.startVariantTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', { ...res, type: 'single' })
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
            variant_id: test.value?.variant_id,
            answers: answers,
        }

        const res = await api.endVariantTest(data)
        return res
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
        // test_results.value = { ...defualt_test_result }

        LocalStorage.set('test', { ...default_test })
        LocalStorage.set('questions', [])
        LocalStorage.set('test_response', null)
        // LocalStorage.set('test_results', { ...defualt_test_result })
    }

    async function startBlockTest(payload) {
        const res = await api.startBlockTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', { ...res, type: 'block' })
        LocalStorage.set('questions', questions.value)

        console.log('questions', questions.value)
        console.log('test_response', test_response.value)

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

    async function getResultDetail() {
        const res = await api.getTestResultDetail(test.value.variant_id)

        test_results.value = res
        LocalStorage.setItem('test_results', res)

        console.log('test_results')

        return res
    }

    return {
        getVariants,
        changeTestField,
        test,
        test_response,
        test_results,
        startVariantTest,
        setSelectedAnswer,
        questions,
        startBlockTest,
        resetStore,
        endBlockTest,
        endVariantTest,
        getResultDetail,
    }
})
