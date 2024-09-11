<template>
  <div class="section section-margin media" v-if="data">
    <h2 class="media__title title h2-smallcaps">Media resourses</h2>
    <hr class="desktop media__hr" />
    <div class="media__container desktop">
      <div class="media__container-navigation">
        <div class="media__container-navigation-counter">
          <div class="media__container-navigation-counter-wrap">
            <img
              @click="prevSlide"
              class="media__container-navigation-counter-wrap-arrow prev"
              :class="{
                'media__container-navigation-counter-wrap-arrow-disable':
                  activeSlide === 3,
              }"
              src="@/assets/imgs/arrow.svg"
              alt="Arrow"
            />
          </div>
          <span class="media__container-navigation-counter-span">
            {{ getActiveSlide }} / {{ news.length }}</span
          >
          <div class="media__container-navigation-counter-wrap">
            <img
              @click="nextSlide"
              class="media__container-navigation-counter-wrap-arrow next"
              :class="{
                'media__container-navigation-counter-wrap-arrow-disable':
                  activeSlide === news.length,
              }"
              src="@/assets/imgs/arrow.svg"
              alt="Arrow"
            />
          </div>
        </div>
      </div>

      <Swiper
        class="media__container-slider"
        :modules="modules"
        :slidesPerView="3"
        :spaceBetween="1"
        :navigation="{
          nextEl: '.next',
          prevEl: '.prev',
        }"
      >
        <SwiperSlide v-for="item in news" :key="item.content">
          <a
            :href="item.link"
            target="_blank"
            class="media__container-slider-item"
          >
            <div class="media__container-slider-item-wrap">
              <img
                class="media__container-slider-item-wrap-img"
                src="@/assets/imgs/cover.jpg"
                alt="Instagram post"
              />
            </div>

            <h6 class="media__container-slider-item-title caption">
              {{ item.type }}
            </h6>
            <p class="media__container-slider-item-content grotesk pre-line">
              {{ item.content }}
            </p>
            <p class="media__container-slider-item-date antique">
              {{ item.date }}
            </p>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="media-mobile">
      <Swiper
        @slideChange="onSlideChange"
        class="media-mobile__slider"
        :modules="modules"
        :navigation="{
          nextEl: '.next',
          prevEl: '.prev',
        }"
      >
        <SwiperSlide v-for="item in news" :key="item.content">
          <a
            :href="item.link"
            target="_blank"
            class="media-mobile__slider-item"
          >
            <div class="media-mobile__slider-item-wrap">
              <img
                class="media-mobile__slider-item-wrap-img"
                src="@/assets/imgs/cover.jpg"
                alt="Instagram post"
              />
            </div>

            <h6 class="media-mobile__slider-item-title caption">
              {{ item.type }}
            </h6>
            <p class="media-mobile__slider-item-content grotesk pre-line">
              {{ item.content }}
            </p>
            <p class="media-mobile__slider-item-date antique">
              {{ item.date }}
            </p>
          </a>
        </SwiperSlide>
      </Swiper>
      <div class="media-mobile__counter">
        <div class="media-mobile__counter-wrap">
          <img
            @click="prevSlide"
            class="media-mobile__counter-wrap-arrow prev"
            :class="{
              'media-mobile__counter-wrap-arrow-disable': activeIndex === 1,
            }"
            src="@/assets/imgs/arrow.svg"
            alt="Arrow"
          />
        </div>
        <span class="media-mobile__counter-span antique">
          {{ getActiveIndex }} / {{ news.length }}</span
        >
        <div class="media-mobile__counter-wrap">
          <img
            @click="nextSlide"
            class="media-mobile__counter-wrap-arrow next"
            :class="{
              'media-mobile__counter-wrap-arrow-disable':
                activeIndex === news.length,
            }"
            src="@/assets/imgs/arrow.svg"
            alt="Arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
const modules = [Navigation];

const { data } = await useAsyncData("posts", () =>
  $fetch("https://web.greeklegend.gr/get-instagram-posts", {
    method: "POST",
    body: {
      language: "en",
    },
  })
);

const news = [];
if (data.value)
  data.value.forEach((element) => {
    const item = {};
    item.img = element.media.src;
    item.type = "News";
    item.content = element.content.split("\n\n")[0];
    item.date = element.date;
    item.link = element.url;
    news.push(item);
  });

const activeSlide = ref(3);
function prevSlide() {
  if (activeSlide.value === 3) return;
  activeSlide.value--;
}
function nextSlide() {
  if (activeSlide.value === news.length) return;
  activeSlide.value++;
}
const getActiveSlide = computed(() => {
  if (activeSlide.value.toString().length < 2 && news.length > 9) {
    return "0" + activeSlide.value.toString();
  }
  return activeSlide.value;
});

const activeIndex = ref(1);
function onSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex + 1;
}
const getActiveIndex = computed(() => {
  if (activeIndex.value.toString().length < 2 && news.length > 9) {
    return "0" + activeIndex.value.toString();
  }
  return activeIndex.value;
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
