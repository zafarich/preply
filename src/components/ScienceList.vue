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
    <router-link
      v-for="subject in subjects"
      :key="subject.id"
      :to="{ name: 'variant', params: { id: subject.id } }"
      class="science-item"
    >
      <div class="flex justify-center mb-1">
        <BaseImg width="56px" :src="subject.image" />
      </div>
      <div class="title-science">{{ subject.title }}</div>
    </router-link>
  </div>
</template>

<style lang="scss">
.science-item {
  border-radius: 16px;
  border: 1px solid $gray-6;
  padding: 12px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title-science {
    font-size: 16px;
    font-weight: 500;
    // margin-left: 12px;
  }
}
</style>
