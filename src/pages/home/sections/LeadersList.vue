<script setup>
import { ref, onMounted } from 'vue-demi'

import LeaderTable from 'src/components/LeaderTable.vue'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
</script>
<template>
    <div class="flex mb-4 justify-between items-center">
        <div class="font-semibold text-xl">Liderlar</div>
        <q-btn
            :to="{ name: 'leaders' }"
            class="icon-16"
            icon-right="arrow_forward"
            no-caps
            flat
            dense
            color="primary"
            >barchasi</q-btn
        >
    </div>
    <LeaderTable :items="userStore.leaders.results" />
</template>
