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

    const test_type = ref(LocalStorage.getItem('test_type') || TEST_TYPES.BLOCK)

    const test_response = ref(LocalStorage.getItem('test_response') || null)
    const questions = ref(LocalStorage.getItem('questions') || [])
    const test = ref(
        LocalStorage.getItem('test') || {
            ...default_test,
        },
    )

    const EXAM = ref(LocalStorage.getItem('EXAM') || null)
    const EXAM_RESULT = ref(LocalStorage.getItem('EXAM_RESULT' || null))
    const PROBLEMS = ref(LocalStorage.getItem('PROBLEMS') || null)
    const EXAM_TYPE = ref(LocalStorage.getItem('EXAM_TYPE' || null))
    const ACTIVE_INDEX = ref(LocalStorage.getItem('ACTIVE_INDEX' || 0))

    const GET_ACTIVE_TEST = computed(() => {
        return PROBLEMS.value[ACTIVE_INDEX.value]
    })

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

    function changeActiveIndex(index) {
        LocalStorage.setItem('ACTIVE_INDEX', index)
        ACTIVE_INDEX.value = index
    }

    function HISAY() {
        console.log('HISAY')
    }

    function setTestType(value) {
        EXAM_TYPE.value = value
        LocalStorage.setItem('EXAM_TYPE', value)
    }

    async function getVariants(params) {
        const res = await api.getVariants(params)
        return res?.results
    }

    function changeTestField(data) {
        test.value = { ...test.value, ...data }

        LocalStorage.set('test', test.value)
    }

    function setSelectedAnswer(index, question_index) {
        PROBLEMS.value[question_index].selected_answer = index
        LocalStorage.set('PROBLEMS', PROBLEMS.value)
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
        const res = await api.getTestResultDetail(EXAM.value?.id)

        EXAM_RESULT.value = res
        LocalStorage.set('EXAM_RESULT', res)

        return res
    }

    async function START_TEST(type, payload) {
        let res

        if (type === TEST_TYPES.BLOCK) {
            res = await api.startBlockTest(payload)
        } else if (type === TEST_TYPES.BY_SUBJECTS) {
            res = await api.startBySubjectTest(payload)
        } else if (type === TEST_TYPES.VARIANT) {
            res = await api.startVariantTest(payload)
        } else if (type === TEST_TYPES.BY_SELECTIONS) {
            res = await api.startBySelectionTest(payload)
        }

        EXAM.value = res
        PROBLEMS.value = res.questions
        ACTIVE_INDEX.value = 0

        LocalStorage.set('EXAM', { ...res, type: type })
        LocalStorage.set('EXAM_TYPE', type)
        LocalStorage.set('PROBLEMS', res.questions)
        LocalStorage.set('ACTIVE_INDEX', 0)

        changeTestField({ type: type })
        test_type.value = type

        return res
    }

    async function END_TEST() {
        const solved_questions = PROBLEMS.value.filter(
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

        let res

        if (EXAM_TYPE.value === TEST_TYPES.BLOCK) {
            res = await api.endBlockTest(data)
        } else if (EXAM_TYPE.value === TEST_TYPES.BY_SUBJECTS) {
            res = await api.endBySubjectTest(data)
        } else if (EXAM_TYPE.value === TEST_TYPES.VARIANT) {
            res = await api.endVariantTest(data)
        } else if (EXAM_TYPE.value === TEST_TYPES.BY_SELECTIONS) {
            res = await api.endBySelectionTest(data)
        }

        return res
    }

    return {
        EXAM,
        EXAM_RESULT,
        EXAM_TYPE,
        PROBLEMS,
        ACTIVE_INDEX,
        GET_ACTIVE_TEST,
        changeActiveIndex,
        START_TEST,
        END_TEST,

        getVariants,
        changeTestField,
        test,

        test_response,
        test_results,
        setSelectedAnswer,
        getOverallBall,
        questions,
        resetStore,
        test_type,
        setTestType,
        getResultDetail,
        HISAY,
    }
})
