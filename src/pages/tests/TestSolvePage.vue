<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
</script>
<template>
  <div>
    <div class="test-solve-header">
      <div class="flex items-center top-wrap justify-between px-3 py-1.5">
        <div>
          <q-btn
            color="primary"
            flat
            dense
            label="Orqaga"
            icon="chevron_left"
            no-caps
          ></q-btn>
        </div>
        <div class="flex items-center">
          <img class="mr-2" src="/images/icons/stopwatch.svg" alt="" />
          <div class="font-semibold text-primary">09:54</div>
        </div>
      </div>
      <div class="subjects-top-slider">
        <swiper :slides-per-view="'auto'" :space-between="10">
          <swiper-slide
            ><div class="subject-slider-item">Matematika</div></swiper-slide
          >
          <swiper-slide
            ><div class="subject-slider-item _active">Fizika</div></swiper-slide
          >
          <swiper-slide
            ><div class="subject-slider-item">Ingliz tili</div></swiper-slide
          >
          <swiper-slide
            ><div class="subject-slider-item">Ona-tili</div></swiper-slide
          >
          <swiper-slide
            ><button class="subject-slider-item">Tarix</button></swiper-slide
          >
        </swiper>
      </div>
      <div class="questions-top-slider">
        <swiper :slides-per-view="'auto'" :space-between="5">
          <swiper-slide v-for="index in 30" :key="index"
            ><div
              class="question-slider-item"
              :class="{ _active: index === 2, _selected: index === 3 }"
            >
              {{ index }}
            </div></swiper-slide
          >
        </swiper>
      </div>
    </div>
    <div class="h-[137px]"></div>

    <div class="question-wrap">
      <div class="question-text">
        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem,
        eum pariatur? Sapiente, explicabo tenetur quae, debitis non ex rem sunt
        labore eligendi nulla veniam obcaecati repudiandae numquam mollitia
        quibusdam dignissimos?
      </div>

      <div class="variants-wrap">
        <button class="variant-item"><b>A.</b> 4 marta ortadi</button>
        <button class="variant-item _selected"><b>B.</b> 8 marta ortadi</button>
        <button class="variant-item"><b>C.</b> 2 marta kamayadi</button>
        <button class="variant-item"><b>D.</b> O'zgarmaydi</button>
      </div>
    </div>

    <div class="flex justify-between items-center mt-6">
      <q-btn
        label="Oldingi"
        no-caps
        color="primary"
        icon="chevron_left"
        outline
        flat
      />
      <q-btn
        label="Keyingi"
        no-caps
        color="primary"
        icon-right="chevron_right"
        flat
      />
    </div>

    <div class="mt-10">
      <q-btn
        label="Testni yakunlash"
        no-caps
        color="warning"
        class="full-width"
      />
    </div>
  </div>
</template>

<style lang="scss">
.test-solve-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid $gray-5;
  .top-wrap {
    border-bottom: 1px solid $gray-5;
  }

  .subjects-top-slider {
    padding: 8px 12px;
    .swiper-slide {
      width: auto !important;
    }

    .subject-slider-item {
      padding: 4px 12px;
      font-size: 13px;
      color: #333;
      font-weight: 500;
      border: 1px solid $gray-5;
      border-radius: 8px;
    }

    ._active {
      background-color: $primary;
      color: #fff;
      border: 1px solid $primary;
    }
  }
  .questions-top-slider {
    padding: 8px 12px;
    .swiper-slide {
      width: auto !important;
    }

    .question-slider-item {
      padding: 4px 10px;
      font-size: 12px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-weight: 500;
      border: 1px solid $gray-5;
      border-radius: 8px;
    }
    ._selected {
      background-color: #e4ecf3;
      color: $primary;
      border: 1px solid #e4ecf3;
    }
    ._active {
      background-color: $primary;
      color: #fff;
      border: 1px solid $primary;
    }
  }
}

.question-wrap {
  .question-text {
    margin-top: 16px;
  }
  .variants-wrap {
    margin-top: 24px;
    .variant-item {
      padding: 12px 24px;
      border-radius: 10px;
      border: 2px solid $gray-5;
      width: 100%;
      display: block;
      text-align: left;
      margin-bottom: 10px;
      // background-color: #f4f4f4;
    }
    ._selected {
      // background-color: $;
      border: 2px solid #ffcf26;
    }
  }
}
</style>
