<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'
import { ref, onMounted } from 'vue-demi'
import BaseImg from 'src/components/UI/BaseImg.vue'

const props = defineProps({
    banners: {
        type: Array,
        default: () => [],
    },
})
</script>
<template>
    <div class="middle-banner">
        <div class="overflow-hidden my-2.5">
            <!-- :modules="[Autoplay, Pagination]" -->
            <!-- :loop="banners.length > 1"  -->
            <!-- 
                 :autoplay="{
                    delay: 4000,
                    disableOnInteraction: false,
                }" -->
            <!-- :pagination="true" -->
            <swiper :slides-per-view="1" :space-between="0">
                <swiper-slide v-for="banner in banners" :key="banner.id"
                    ><BaseImg :src="banner.image"
                /></swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<style lang="scss">
.middle-banner {
    margin-left: -15px;
    margin-right: -15px;
}
</style>
