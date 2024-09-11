<template>
  <main>
    <FirstSection />

    <section class="section about">
      <div class="about__left">
        <img
          class="about__left-img"
          src="@/assets/imgs/about.webp"
          alt="olive farmer"
        />
      </div>
      <div class="about__right">
        <div class="about__block">
          <p class="about__right-text grotesk">
            We proudly introduce you to our exquisite extra virgin olive oil
            crafted by families on the island of Crete. For over a century,
            these families have honored traditions in creating.
          </p>
          <nuxt-link
            title="About"
            to="/about"
            class="about__right-link link underline"
          >
            Go read about page
          </nuxt-link>
        </div>
        <p class="about__right-caption h1">Greece</p>
        <img
          class="about__right-img"
          src="@/assets/imgs/crete.svg"
          alt="Crete"
        />
        <div class="about__block">
          <h6 class="about__right-title antique">
            The production of olive oil
          </h6>
          <p class="about__right-text antique">
            Nestled in Greece, 350+ farmers devote themselves to crafting
            exceptional olive oil. Their dedication has spawned three distinct
            categories: Premium, Select, and Elixirio, each with its unique
            essence.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-margin products">
      <h2 class="title h2-smallcaps">Products</h2>
      <hr />
      <div class="products__cards desktop">
        <div
          class="products__card"
          v-for="(card, index) in listProducts"
          :key="index"
        >
          <h6 class="products__card-title antique pre-line">{{ card.name }}</h6>
          <img
            class="products__card-img"
            :src="card.img"
            alt="Olive oil bottle"
          />
        </div>
      </div>
      <div class="mobile">
        <Slider :list="listProducts" />
      </div>
    </section>

    <FamilySlider />
    <div class="section video">
      <h6 class="video-text antique">How we produce olive oil</h6>
      <img
        class="video-img"
        src="@/assets/imgs/video.jpg"
        alt="How we produce olive oil"
      />
    </div>
    <MediaResourses />
  </main>
</template>
<script setup>
import FirstSection from "@/components/pages/index/firstSection/index.vue";
import Slider from "@/components/common/slider/slider.vue";
import FamilySlider from "@/components/pages/index/familySlider/index.vue";
import MediaResourses from "@/components/pages/index/media/index.vue";

import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();


onMounted(() => {
  headerStateStore.changeLogoShow(false);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(false);
});

// IMPORT ASSETS PRODUCTS //
import premium from "@/assets/imgs/bottles/premiumVoutaktakis500.png";
import select from "@/assets/imgs/bottles/selectPapadakis500.png";
import elixir from "@/assets/imgs/bottles/elixirChatzigeorgiou.png";

const listProducts = [
  {
    name: "Premium \n250, 500, 750 ml",
    img: premium,
  },
  {
    name: "Select \n250, 500 ml",
    img: select,
  },
  {
    name: "Elixirio \n250 ml",
    img: elixir,
  },
];
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
