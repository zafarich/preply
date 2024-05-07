<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { computed, onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { TEST_TYPES } from 'src/utils/constants'

import NotifyTestModal from './components/NotifyTestModal.vue'
import EndTestModal from './components/EndTestModal.vue'

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

const { notifyTestModal } = storeToRefs(modalStore)

function confirmBack() {
    testStore.resetStore()
    router.back()
}

const tests = ref([])

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
onMounted(async () => {
    await fetchTest()
})

async function fetchTest() {
    let res = testStore.test_response

    if (!test_store.value?.loaded) {
        if (test_store.value.type === 'single') {
            testStore.changeTestField({
                loaded: true,
            })
        } else if (test_store.value.type === 'block') {
            testStore.changeTestField({
                loaded: true,
            })
        }
    }

    test_variant.value = res?.test_variant
}

function selectAnswer(index, question_index) {
    testStore.setSelectedAnswer(index, question_index)
}

async function confirmEndTest() {
    $q.loading.show()

    let res
    console.log('route.query.test_type', route)
    if (route.query.test_type == TEST_TYPES.BLOCK) {
        await testStore.endBlockTest()
        // console.log('response', res)
    } else {
        await testStore.endVariantTest()
    }
    res = await testStore.getResultDetail()

    $q.loading.hide()

    if (res?.id) {
        testStore.resetStore()
        router.replace({ name: 'test.result', params: { id: res.id } })
    }

    console.log('res', res)
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
                        label="Orqaga"
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
                    <div class="font-semibold text-primary">09:54</div>
                </div>

                <div v-if="is_visible_variant_title" class="font-semibold">
                    {{ test_variant?.title }}
                </div>
            </div>
            <div class="subjects-top-slider" v-if="is_visible_subjects">
                <swiper :slides-per-view="'auto'" :space-between="10">
                    <swiper-slide
                        v-for="(subject, index) in testStore.test_response
                            ?.block_test_subjects"
                        :class="{ _active: isActiveTopSlider === index }"
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

        <div class="flex justify-between items-center mt-6">
            <div>
                <q-btn
                    v-if="test_store.active_index > 0"
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index - 1,
                        })
                    "
                    label="Oldingi"
                    no-caps
                    color="primary"
                    icon="chevron_left"
                    outline
                    flat
                />
            </div>
            <div v-if="test_store.active_index < questions?.length - 1">
                <q-btn
                    @click="
                        testStore.changeTestField({
                            active_index: test_store.active_index + 1,
                        })
                    "
                    label="Keyingi"
                    no-caps
                    color="primary"
                    icon-right="chevron_right"
                    flat
                />
            </div>
        </div>

        <div class="mt-10">
            <q-btn
                @click="end_test_modal = true"
                label="Testni yakunlash"
                no-caps
                color="warning"
                class="full-width"
            />
        </div>
        <NotifyTestModal @confirmBack="confirmBack" />
        <EndTestModal @confirmEndTest="confirmEndTest" />
    </div>
</template>

<style lang="scss" src="src/assets/scss/TestSolvePage.scss"></style>
