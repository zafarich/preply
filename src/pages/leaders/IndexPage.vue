<script setup>
import { ref } from "vue-demi";

import BaseSelect from "src/components/UI/BaseSelect.vue";
import LeaderTable from "src/components/LeaderTable.vue";

const region = ref("");
const district = ref("");
const science = ref("");
const page = ref(1);
</script>
<template>
  <div>
    <div class="text-bold mt-6 mb-6 text-xl">Leaderboard</div>

    <div class="flex justify-between mb-4">
      <div><q-btn color="primary" no-caps label="Kunlik" /></div>
      <div><q-btn outline color="primary" no-caps label="Haftalik" /></div>
      <div><q-btn outline color="primary" no-caps label="Oylik" /></div>
      <div><q-btn outline color="primary" no-caps label="Barcha" /></div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <BaseSelect
        v-model="region"
        outlined
        placeholder="Viloyat"
        :options="[
          'Toshkent',
          'Buxoro',
          'Qoraqalpog\'iston respublikasi',
          'Andijon',
        ]"
      />
      <BaseSelect
        v-model="district"
        outlined
        placeholder="Tuman"
        :options="[
          'Toshkent',
          'Buxoro',
          'Qoraqalpog\'iston respublikasi',
          'Andijon',
        ]"
      />
    </div>

    <div class="mb-6">
      <BaseSelect
        v-model="science"
        outlined
        placeholder="Fan"
        :options="['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Dasturlash']"
      />
    </div>

    <LeaderTable />

    <div class="flex justify-center my-5">
      <q-pagination
        v-model="page"
        @update:model-value="changePagination"
        :max="12"
        :max-pages="6"
        boundary-numbers
        direction-links
        class="base-pagination"
        icon-prev="img:/images/icons/chevron_left_16.svg"
        icon-next="img:/images/icons/chevron_right_16.svg"
      />
    </div>
  </div>
</template>

<style></style>
