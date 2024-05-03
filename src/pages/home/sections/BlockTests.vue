<script setup>
import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";

import ScienceList from "src/components/ScienceList.vue";

const props = defineProps({
  subjects: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="popular-subjects">
    <div class="flex mb-6 justify-between items-center">
      <div class="font-semibold text-xl">Blok Testlar</div>
    </div>

    <ScienceList :subjects="subjects" />
  </div>
</template>

<style lang="scss"></style>
