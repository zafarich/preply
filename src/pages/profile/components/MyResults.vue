<template>
    <div>
        <q-table
            flat
            bordered
            :rows="results"
            :columns="columns"
            hide-bottom=""
            :pagination.sync="pagination"
            row-key="score"
            @row-click="goToResultPage"
        >
            <template v-slot:body-cell-score="props">
                <q-td :props="props">
                    {{ props.row.score }}
                </q-td>
            </template>

            <template v-slot:body-cell-test_type="props">
                <q-td :props="props">
                    {{ getTestTypeText(props.row.test_type_unique_name) }}
                </q-td>
            </template>

            <template v-slot:body-cell-duration="props">
                <q-td :props="props">
                    {{
                        calculateDuration(
                            props.row.started_at,
                            props.row.finished_at,
                        )
                    }}
                </q-td>
            </template>
        </q-table>
        <div class="q-pa-lg flex flex-center">
            <q-pagination
                v-model="current"
                color="primary"
                :max="pagesNumber"
                :max-pages="6"
                boundary-numbers
            />
        </div>
    </div>
</template>

<script setup>
import { TEST_TYPE_LIST } from 'src/utils/constants'
import {} from 'vue'
import { ref, computed, watch } from 'vue'
import { useTestStore } from 'src/stores/test'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMainStore } from 'src/stores/main'

const router = useRouter()
const testStore = useTestStore()
const props = defineProps({
    count: {
        type: Number,
        default: [],
    },
    results: {
        type: Array,
        default: [],
    },
})
const { t: $t } = useI18n()

const columns = [
    {
        label: $t('test_type'),
        name: 'test_type',
        align: 'left',
    },

    {
        name: 'duration',
        align: 'center',
        label: $t('test_period'),
        field: 'duration',
    },
    {
        label: $t('test_result'),
        name: 'score',
        align: 'right',
    },
]

const current = ref(1)
const pageSize = ref(5)

const pagination = computed(() => ({
    page: current.value,
    rowsPerPage: pageSize.value,
}))

watch(
    () => current.value,
    () => {
        testStore.GET_MY_RESULTS({
            page_size: pageSize.value,
            page: current.value,
        })
    },
)

const pagesNumber = computed(() => {
    return Math.ceil(props.count / pageSize.value)
})

const getTestTypeText = (key) => {
    const testType = TEST_TYPE_LIST.find((type) => type.key === key)
    return testType ? testType.text : key
}

const goToResultPage = async (event, row) => {
    console.log('rowww', row.id)
    useMainStore().changeSiteLoader(true)

    let res = await testStore.FETCH_TEST_RESULT(row.id)

    if (res?.id) {
        testStore.RESET_TEST_STORE()
        router.replace({ name: 'test.result', params: { id: res.id } })
    }

    useMainStore().changeSiteLoader(false)
}

const calculateDuration = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diff = endDate.getTime() - startDate.getTime()

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
</script>

<style lang="scss"></style>
