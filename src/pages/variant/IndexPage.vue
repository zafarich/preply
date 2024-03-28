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

const referencesStore = useReferencesStore();

const subject_id = route.params.id;
const subject = ref(null);

onMounted(() => {
  fetchSubject();
  fetchData();
});

async function fetchSubject() {
  subject.value = await referencesStore.getSubjectById(subject_id);
}
</script>
<template>
  <div>
    <div class="text-bold mt-6 mb-4 text-xl">{{ subject?.title }}</div>
  </div>
</template>

<style></style>
