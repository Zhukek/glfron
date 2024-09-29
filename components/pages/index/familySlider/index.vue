<template>
  <section class="section families">
    <h2 class="title h2-smallcaps">Families</h2>
    <Annotation />
    <div class="families__content-mobile">
      <div
        class="families__content-mobile-block"
        v-for="(family, index) in families"
        :key="index"
      >
        <img
          class="families__content-mobile-block-img"
          :src="family.img"
          :alt="family.name"
        />

        <div class="families__content-mobile-block-title h1 pre-line">
          {{ family.name }}
        </div>
        <div class="families__content-mobile-block-subtitle greek-caption">
          {{ family.greekName }}
        </div>
        <div class="families__content-mobile-block-text grotesk">
          {{ family.text }}
        </div>
        <div class="families__content-mobile-block-link link underline">
          <nuxt-link :title="family.name" :to="localePath(family.link)"
            >Go family page</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="families__content" ref="animation">
      <div class="families__left">
        <img
          v-for="(family, index) in families"
          :key="index"
          class="families__left-img"
          :class="{
            'last-img': index === 2,
            'second-img': index === 1,
            'first-img': index === 0,
          }"
          :style="{ 'z-index': 3 - index }"
          :src="family.img"
          :alt="family.name"
        />
      </div>
      <div class="families__right">
        <div class="families__block">
          <p class="families__right-text grotesk">
            {{ families[activeIndex].text }}
          </p>
          <nuxt-link
            class="families__right-link link underline"
            :to="localePath(families[activeIndex].link)"
            :title="families[activeIndex].name"
            >Go family page</nuxt-link
          >
        </div>
        <div class="families__right-title">
          <h1
            class="families__right-title-h1 pre-line"
            :class="{
              h1: isDesktopStore.getIsDesktop,
              h2: !isDesktopStore.getIsDesktop,
            }"
            v-html="families[activeIndex].name"
          ></h1>
          <h2 class="families__right-title-h2 greek-caption">
            {{ families[activeIndex].greekName }}
          </h2>
        </div>
        <div class="families__block">
          <img
            class="families__right-bottles"
            src="@/assets/imgs/bottles.svg"
            alt="Bottles"
          />
          <p class="families__right-text antique">
            The headliners of 2024 are three farmers whose oil is available in
            the Premium, Select, and Elixirio lines in volumes of 750ml, 500ml,
            and 250ml, depending on the harvest and acidity of the olive oil.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Annotation from "@/components/common/annotation/index.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

onMounted(animationSliderFamily);
function animationSliderFamily() {
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      const sliderTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".families__content",
          start: `top ${VwToPx(1.56)}px`,
          scrub: true,
          pin: true,
        },
      });
      sliderTL
        .to(
          ".first-img",
          {
            opacity: 0,
            duration: 1,
            onComplete: changeFamilyIndex,
            onCompleteParams: [1],
            onReverseComplete: changeFamilyIndex,
            onReverseCompleteParams: [0],
          },
          "<"
        )
        .fromTo(
          ".second-img",
          {
            x: VwToPx(4.17),
            scale: 0.91,
          },
          {
            scale: 1,
            x: 0,
            duration: 0.5,
          },
          "<1"
        )
        .fromTo(
          ".last-img",
          {
            x: VwToPx(7.29),
            scale: 0.84,
          },
          {
            scale: 0.91,
            x: VwToPx(4.17),
            duration: 0.5,
          },
          "<"
        )
        .to(
          ".second-img",
          {
            opacity: 0,
            duration: 0.5,
            onComplete: changeFamilyIndex,
            onCompleteParams: [2],
            onReverseComplete: changeFamilyIndex,
            onReverseCompleteParams: [1],
          },
          "<1"
        )
        .to(
          ".last-img",
          {
            scale: 1,
            x: 0,
            duration: 0.5,
            onReverseComplete: changeFamilyIndex,
            onReverseCompleteParams: [2],
          },
          "<1"
        );
    },
  });
}

const activeIndex = ref(0);
function changeFamilyIndex(index) {
  activeIndex.value = index;
}
defineProps({
  families: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
