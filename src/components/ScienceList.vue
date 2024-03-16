<script setup>
import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";

const props = defineProps({
  subjects: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="subject in subjects" :key="subject.id" class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">{{ subject.title }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.science-item {
  border-radius: 4px;
  border: 1px solid #ececec;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  .title-science {
    font-size: 16px;
    font-weight: 500;
    // margin-left: 12px;
  }
}
</style>
