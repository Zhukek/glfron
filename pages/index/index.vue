<template>
  <main>
    <FirstSection
      :subtitle
      :bottomTextBefore
      :slogan
      :bottomTextAfter
      :firstBackground
    />

    <section class="section about">
      <div class="about__left">
        <img
          class="about__left-img"
          :src="secondSectionImg"
          alt="olive farmer"
        />
      </div>
      <div class="about__right">
        <div class="about__block">
          <p class="about__right-text grotesk">
            {{ topText }}
          </p>
          <nuxt-link
            title="About"
            :to="localePath('/about')"
            class="about__right-link link underline"
          >
            {{ linkText }}
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
            {{ bottomTitle }}
          </h6>
          <p class="about__right-text antique">
            {{ bottomText }}
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
          <h6 class="products__card-title antique pre-line">
            {{ card.name + "\n" + card.capacity }}
          </h6>
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

    <FamilySlider :families />
    <div class="section video">
      <h6 class="video-text antique">{{ videoDescription }}</h6>
      <img
        class="video-img"
        :src="videoBackground"
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
const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;

const { data } = await useAsyncData("main-page", () =>
  $fetch(API_ROUTE + "/api/main-page?populate=deep")
);
const response = data.value.data.attributes;
// FIRST SECTION
const subtitle = response.firstSection.subtitle;
const bottomTextBefore = response.firstSection.bottomTextBefore;
const slogan = response.firstSection.slogan;
const bottomTextAfter = response.firstSection.bottomTextAfter;
const firstBackground =
  API_ROUTE + response.firstSection.background.data.attributes.url;
// SECOND SECTION
const secondSectionImg =
  API_ROUTE + response.secondSection.img.data.attributes.url;
const topText = response.secondSection.topText;
const linkText = response.secondSection.linkText;
const bottomTitle = response.secondSection.bottomTitle;
const bottomText = response.secondSection.bottomText;
// PRODUCTS SECTION
const listProducts = [];
response.products.forEach((product) => {
  const item = {
    name: product.title,
    capacity: product.capacity,
    img: API_ROUTE + product.bottleImg.data.attributes.url,
  };
  listProducts.push(item);
});
// FAMILIES SECTION
const families = [];
response.families.forEach((family) => {
  const item = {
    name: "Family \n" + family.name,
    greekName: family.greekName,
    text: family.description,
    link: "/" + family.name.toLowerCase(),
    img: API_ROUTE + family.photo.data.attributes.url,
  };
  families.push(item);
});
// VIDEO SECTION
const videoDescription = response.videoSection.text;
const videoBackground =
  API_ROUTE + response.videoSection.background.data.attributes.url;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
