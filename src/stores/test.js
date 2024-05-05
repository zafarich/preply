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
    const test_response = ref(LocalStorage.getItem('test_response') || null)
    const questions = ref(LocalStorage.getItem('questions') || [])
    const test = ref(
        LocalStorage.getItem('test') || {
            ...default_test,
        },
    )

    async function getVariants(params) {
        const res = await api.getVariants(params)
        return res?.results
    }

    async function getSimpleTest(id) {
        const res = await api.getSimpleTest(id)
        test_response.value = res
        questions.value = res.questions
        LocalStorage.set('test_response', res)
        LocalStorage.set('questions', questions.value)
        return res
    }

    async function startTest(payload) {
        const res = await api.startTest(payload)
        return res
    }

    async function endTest() {
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

        const res = await api.endTest(data)
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

        LocalStorage.set('test', { ...default_test })
        LocalStorage.set('questions', [])
        LocalStorage.set('test_response', null)
    }

    async function startBlockTest(payload) {
        const res = await api.startBlockTest(payload)

        test_response.value = res
        questions.value = res.questions

        LocalStorage.set('test_response', { ...res, type: 'block' })
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

    async function getResultDetail() {
        const res = await api.getTestResultDetail(test_response.value.id)
        return res
    }

    return {
        getVariants,
        changeTestField,
        test,
        test_response,
        getSimpleTest,
        startTest,
        setSelectedAnswer,
        questions,
        startBlockTest,
        resetStore,
        endBlockTest,
        endTest,
        getResultDetail,
    }
})
