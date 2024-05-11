<script setup>
import { ref, onMounted } from 'vue-demi'
import BaseImg from 'src/components/UI/BaseImg.vue'

import ScienceList from 'src/components/ScienceList.vue'
import { TEST_TYPES } from 'src/utils/constants'

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [],
    },
})
</script>
<template>
    <div class="popular-subjects">
        <div class="flex mb-6 justify-between items-center">
            <div class="font-semibold text-xl">Ommabop fanlar</div>
            <q-btn
                :to="{
                    name: 'tests',
                    query: { test_type: TEST_TYPES.BY_SUBJECTS },
                }"
                class="icon-16"
                icon-right="arrow_forward"
                no-caps
                flat
                dense
                color="primary"
                >barchasi</q-btn
            >
        </div>

        <ScienceList :subjects="subjects" />
    </div>
</template>

<style lang="scss"></style>
