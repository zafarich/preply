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
        <!-- <div class="flex mb-6 justify-between items-center">
            <div class="text-md font-semibold">
                {{ $t('national_certificate_tests') }}
            </div>
        </div> -->

        <ScienceList :subjects="subjects" />
    </div>
</template>

<style lang="scss"></style>
