<script setup>
import { ref } from "vue-demi";
import { useI18n } from "vue-i18n";

import BaseSelect from "src/components/UI/BaseSelect.vue";

const { t } = useI18n();
const data = ref({
  s1: "",
  s2: "",
  s3: "",
  s4: "",
  s5: "",
});
</script>
<template>
  <div>
    <div class="block-module mb-6">
      <div class="text-lg mb-4">Asosiy fanlarni tanlang</div>
      <div>
        <div class="mb-6">
          <BaseSelect
            v-model="data.s1"
            outlined
            placeholder="Birinchi fan"
            :options="[
              'Matematika',
              'Fizika',
              'Kimyo',
              'Biologiya',
              'Dasturlash',
            ]"
          />
        </div>
        <div>
          <BaseSelect
            v-model="data.s2"
            outlined
            placeholder="Ikkinchi fan"
            :options="[
              'Matematika',
              'Fizika',
              'Kimyo',
              'Biologiya',
              'Dasturlash',
            ]"
          />
        </div>
      </div>
    </div>

    <div class="block-module mb-6">
      <div class="text-lg mb-4">Majburiy fanlarni tanlang</div>
      <div class="mb-6">
        <BaseSelect
          v-model="data.s3"
          outlined
          placeholder="Birinchi fan"
          :options="[
            'Matematika',
            'Fizika',
            'Kimyo',
            'Biologiya',
            'Dasturlash',
          ]"
        />
      </div>
      <div class="mb-6">
        <BaseSelect
          v-model="data.s4"
          outlined
          placeholder="Ikkinchi fan"
          :options="[
            'Matematika',
            'Fizika',
            'Kimyo',
            'Biologiya',
            'Dasturlash',
          ]"
        />
      </div>
      <div>
        <BaseSelect
          v-model="data.s5"
          outlined
          placeholder="Uchinchi fan"
          :options="[
            'Matematika',
            'Fizika',
            'Kimyo',
            'Biologiya',
            'Dasturlash',
          ]"
        />
      </div>
    </div>
    <q-btn color="primary" class="full-width button-md" no-caps>Boshlash</q-btn>
  </div>
</template>

<style lang="scss">
.block-module {
  border-radius: 6px;
  border: 1px solid $gray-5;
  padding: 24px 16px;
}
</style>
