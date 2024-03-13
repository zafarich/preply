<script setup>
import { ref } from "vue-demi";
import { useI18n } from "vue-i18n";

import BaseSelect from "src/components/UI/BaseSelect.vue";

import BlockTestStart from "src/components/BlockTestStart.vue";

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
    <div class="text-bold mt-6 mb-6 text-xl">Blok test yechish</div>

    <BlockTestStart />
  </div>
</template>

<style lang="scss">
.block-module {
  border-radius: 6px;
  border: 1px solid $gray-5;
  padding: 24px 16px;
}
</style>
