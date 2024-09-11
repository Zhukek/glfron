<template>
  <Splide :options="splideOptions" :extensions="extensions">
    <SplideSlide v-for="(slide, index) in list" :key="index">
      <img
        class="splide__slide-img"
        :class="{
          first: index === 0,
          second: index === 1,
          third: index === 2,
          fourth: index === 3,
        }"
        :src="slide.img"
      />
    </SplideSlide>
  </Splide>
</template>
<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/vue-splide/css/core";

const props = defineProps({
  list: { type: Array, required: true },
});
const extensions = { AutoScroll };

const splideOptions = {
  type: "loop",
  autoWidth: true,
  autoHeight: true,
  arrows: false,
  pagination: false,
  drag: false,
  autoScroll: {
    speed: 2,
    pauseOnHover: false,
    pauseOnFocus: false,
    rewind: false,
  },
};
</script>
<style lang="scss" scoped>
@import "./autoslider.scss";
</style>
