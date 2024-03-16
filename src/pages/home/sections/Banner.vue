<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";
</script>
<template>
  <div class="banner">
    <div class="rounded-lg overflow-hidden my-2.5">
      <swiper :slides-per-view="1" :space-between="0">
        <swiper-slide
          ><BaseImg
            src="https://storage.kun.uz/source/8/0Ep_iriIbn71ygifzsV2ymTEdKyYg9Ki.jpg"
        /></swiper-slide>
        <swiper-slide
          ><BaseImg
            src="https://storage.kun.uz/source/8/0Ep_iriIbn71ygifzsV2ymTEdKyYg9Ki.jpg"
        /></swiper-slide>
        <swiper-slide
          ><BaseImg
            src="https://storage.kun.uz/source/8/0Ep_iriIbn71ygifzsV2ymTEdKyYg9Ki.jpg"
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style></style>
