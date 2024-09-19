<template>
  <section class="section industry">
    <h2 class="title h2-smallcaps">Changing the industry</h2>

    <div class="industry-content" ref="targetAnimation">
      <div class="industry-dots">
        <div
          class="industry-dots-item"
          :class="{ 'industry-dots-item-active': index === activeDot }"
          v-for="(item, index) in industryList"
          :key="index"
        ></div>
      </div>
      <div
        class="industry-block"
        v-for="(item, index) in industryList"
        :key="index"
        :style="{ 'z-index': index }"
      >
        <div
          class="industry-block-img"
          :style="{ 'background-image': `url(${item.img})` }"
        ></div>
        <div class="industry-block-title">
          <div class="industry-block-title-number grotesk">
            {{ index + 1 }}
          </div>
          <h3
            class="industry-block-title-heading"
            :class="{
              h1: isDesktopStore.getIsDesktop,
              h2: !isDesktopStore.getIsDesktop,
            }"
          >
            {{ item.title }}
          </h3>
        </div>

        <div class="industry-block-caption">
          <div class="industry-block-caption-item antique">
            {{ item.text }}
          </div>
          <div
            class="industry-block-caption-item-icon industry-block-caption-item"
            v-if="index === 0"
          >
            <img
              class="industry-block-caption-item-icon-img"
              src="@/assets/imgs/iris.webp"
              alt="IRIS"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const targetAnimation = ref();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
const activeDot = ref(0);
onMounted(() => {
  ScrollTrigger.killAll();
  animationIndustry();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
});
function animationIndustry() {
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetAnimation.value,
          start: `top ${VwToPx(1.56)}px`,
          end: "bottom top",
          pin: true,
          scrub: true,
        },
      });
      const blocks = gsap.utils.toArray(".industry-block");
      blocks.forEach((block, index) => {
        if (index)
          tl.fromTo(
            block,
            { yPercent: -100 * (index - 1) },
            {
              yPercent: -100 * index,
              onComplete: () => (activeDot.value = index),
              onReverseComplete: () => (activeDot.value = index - 1),
            }
          );
      });
    },
  });
}

const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;
const { data } = await useAsyncData("family-page-industry", () =>
  $fetch(API_ROUTE + `/api/family-page-changing-the-industry?populate=deep`)
);
const response = data.value.data.attributes;
const industryList = [];
response.slide.forEach((slide) => {
  const item = {
    title: slide.title,
    img: API_ROUTE + slide.background.data.attributes.url,
    text: slide.caption,
  };
  industryList.push(item);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
