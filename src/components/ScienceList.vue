<script setup>
import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";
</script>
<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Matematika</div>
    </div>
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Fizika</div>
    </div>
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Biologiya</div>
    </div>
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Kimyo</div>
    </div>
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Ona-tili</div>
    </div>
    <div class="science-item">
      <div class="flex justify-center">
        <!-- <BaseImg width="24px" src="/math.png" /> -->
      </div>
      <div class="title-science">Ingliz-tili</div>
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
