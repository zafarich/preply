<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";

const props = defineProps({
  banners: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="banner">
    <div class="rounded-lg overflow-hidden my-2.5">
      <swiper :slides-per-view="1" :space-between="0">
        <swiper-slide v-for="banner in banners" :key="banner.id"
          ><BaseImg :src="banner.image"
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style></style>
