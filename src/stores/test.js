import * as api from 'src/api/test'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref, computed } from 'vue-demi'
import { TEST_TYPES } from 'src/utils/constants'
import { useUserStore } from './user'

export const useTestStore = defineStore(
    'test',
    () => {
        const tests = ref(null)
        const test_results = ref(null)
        const test_questions = ref([])
        const test_type = ref(TEST_TYPES.BLOCK)
        const active_index = ref(0)

        const GET_TESTS = computed(() => {
            return tests.value
        })
        const GET_TEST_RESULTS = computed(() => {
            return test_results.value
        })

        const GET_TEST_QUESTIONS = computed(() => {
            return test_questions.value
        })

        const GET_TEST_TYPE = computed(() => {
            return test_type.value
        })

        const GET_ACTIVE_TEST = computed(() => {
            return test_questions.value[active_index.value]
        })

        const GET_ACTIVE_TEST_INDEX = computed(() => {
            return active_index.value
        })
        const GET_TEST_TIME = computed(() => {
            return test_questions.value.length * 2 * 60
        })

        function SELECT_TEST(index) {
            active_index.value = index
        }

        function SET_TEST_TYPE(value) {
            test_type.value = value
        }

        async function FETCH_VARIANTS(params) {
            const res = await api.getVariants(params)
            return res?.results
        }

        function SELECT_ANSWER(index, question_index) {
            test_questions.value[question_index].selected_answer = index
        }

        function RESET_TEST_STORE() {
            tests.value = null
            test_questions.value = []
            active_index.value = 0
        }

        async function FETCH_TEST_RESULT() {
            const res = await api.getTestResultDetail(tests.value?.id)
            test_results.value = res

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

            tests.value = res
            test_questions.value = res.questions
            active_index.value = 0

            return res
        }

        async function END_TEST() {
            const solved_questions = test_questions.value.filter(
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
                result_id: tests.value?.id,
                answers,
            }

            let res

            if (test_type.value === TEST_TYPES.BLOCK) {
                res = await api.endBlockTest(data)
            } else if (test_type.value === TEST_TYPES.BY_SUBJECTS) {
                res = await api.endBySubjectTest(data)
            } else if (test_type.value === TEST_TYPES.VARIANT) {
                res = await api.endVariantTest(data)
            } else if (test_type.value === TEST_TYPES.BY_SELECTIONS) {
                res = await api.endBySelectionTest(data)
            }

            await useUserStore().getMe()

            return res
        }

        return {
            tests,
            test_questions,
            test_results,
            active_index,
            test_type,

            GET_TESTS,
            GET_TEST_RESULTS,
            GET_TEST_TYPE,
            GET_TEST_QUESTIONS,
            GET_ACTIVE_TEST,
            GET_TEST_TIME,
            GET_ACTIVE_TEST_INDEX,

            SELECT_TEST,
            START_TEST,
            FETCH_TEST_RESULT,
            END_TEST,
            SET_TEST_TYPE,
            FETCH_VARIANTS,
            SELECT_ANSWER,
            RESET_TEST_STORE,
        }
    },

    {
        persist: true,
    },
)
