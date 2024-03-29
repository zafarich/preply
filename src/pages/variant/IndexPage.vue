<script setup>
import { computed, onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const $q = useQuasar();

import { useReferencesStore } from "src/stores/references";
import { useTestStore } from "src/stores/test";

const referencesStore = useReferencesStore();
const testStore = useTestStore();

const subject_id = route.params.id;
const subject = ref(null);

const variants = ref([]);

onMounted(() => {
  fetchSubject();
  fetchVariants();
});

async function fetchVariants() {
  variants.value = await testStore.getVariants({
    page: 1,
    subject: subject_id,
  });

  console.log("variants.value", variants.value);
}

async function fetchSubject() {
  subject.value = await referencesStore.getSubjectById(subject_id);
}
</script>
<template>
  <div>
    <div class="flex items-center mb-6 mt-5">
      <router-link :to="{ name: 'tests' }" class="mr-6"
        ><q-icon size="24px" name="keyboard_backspace"
      /></router-link>
      <div class="text-bold text-xl">{{ subject?.title }}</div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        class="variant-item"
        v-for="variant in variants"
        :key="variant.id"
      >
        {{ variant.title }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.variant-item {
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid $gray-6;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
