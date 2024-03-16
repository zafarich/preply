<script setup>
import { computed, onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

import ScienceList from "src/components/ScienceList.vue";
import BlockTestStart from "src/components/BlockTestStart.vue";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const $q = useQuasar();

import { useReferencesStore } from "src/stores/references";

const referencesStore = useReferencesStore();

const test_type = ref("science");

const subjects = ref([]);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  subjects.value = await referencesStore.getSubjects({ page: 1 });

  console.log("subjects.value", subjects.value);
}
</script>
<template>
  <div>
    <div class="text-bold mt-6 mb-4 text-xl">Testlar</div>
    <div>
      <q-tabs
        active-color="primary"
        class="base-tab mb-6"
        v-model="test_type"
        no-caps
        outlined
      >
        <q-tab name="science" label="Fan bo'yicha" />
        <q-tab name="block" label="Blok test" />
      </q-tabs>

      <div>
        <ScienceList v-if="test_type === 'science'" :subjects="subjects" />
        <BlockTestStart v-if="test_type === 'block'" />
      </div>
    </div>
  </div>
</template>

<style></style>
