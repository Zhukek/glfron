<template>
  <swiper :pagination="true" :modules="modules" class="slider">
    <swiper-slide
      v-for="(item, index) in list"
      :key="index"
      class="slider-slide"
    >
      <h6 class="slider-slide-h6 pre-line antique">{{ item.name }}</h6>
      <img
        :class="{
          premium: index === 0,
          select: index === 1,
          elixir: index === 2,
        }"
        class="slider-slide-img"
        :src="item.img"
        alt="botl"
      />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const modules = [Pagination];

const props = defineProps({
  list: { type: Array, required: true },
});
</script>
<style lang="scss" scoped>
@import "./slider.scss";
</style>
