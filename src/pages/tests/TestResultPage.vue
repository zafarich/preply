<script setup>
import { computed, onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const $q = useQuasar();

import { useTestStore } from "src/stores/test";

const testStore = useTestStore();

const test_id = route.params.id;
</script>

<template>
  <div>{{ test_id }}</div>
</template>

<style lang="scss"></style>
