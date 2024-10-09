<template>
  <main>
    <section class="section hero">
      <div class="hero__title" ref="section">
        <h1 class="hero__title-h1">
          <img
            class="hero__title-h1-img desktop"
            src="@/assets/imgs/oneLineLogoWhite.svg"
            alt="Greek Legend"
          />

          <img
            class="hero__title-h1-img mobile"
            src="@/assets/imgs/bigLogo.svg"
            alt="Greek Legend"
          />
        </h1>
        <h2
          class="hero__title-h2"
          :class="{
            'h2-smallcaps': isDesktopStore.getIsDesktop,
            'greek-caption': !isDesktopStore.getIsDesktop,
          }"
        >
          {{ subtitle }}
        </h2>
      </div>
      <div class="hero__basement">
        <OliviesIcon class="hero__basement-img" color="#fff" />
        <p class="hero__basement-p caption">
          {{ textUnderIcon }}
        </p>
      </div>
      <div class="hero__cards" ref="cardsContainer">
        <Card
          class="hero__cards-item"
          v-for="(card, index) in cards"
          :title="card.title"
          :img="card.img"
          :text="card.text"
          :key="index"
          :iconWhite="card.iconWhite"
          :iconBrown="card.iconBrown"
          :reversedTitle="card.reversed.title"
          :reversedImg="card.reversed.img"
          :reversedText="card.reversed.text"
          :lastChild="index === cards.length - 1"
          :heightVw="card.reversed.heightVw"
        />
      </div>
    </section>
    <section class="section culture" ref="culture">
      <h2 class="title h2-smallcaps">Culture</h2>
      <div class="culture-content desktop">
        <div class="culture__left">
          <img
            class="culture__left-img"
            :src="cultureList[activeCultureItem].img"
            :alt="cultureList[activeCultureItem].title"
          />
        </div>
        <div class="culture__center">
          <div class="culture__center-list">
            <p
              class="culture__center-list-item caption"
              :class="{
                'culture__center-list-item-active': activeCultureItem === index,
              }"
              v-for="(item, index) in cultureList"
              @click="changeActiveCultureItem(index)"
            >
              ({{ index + 1 }}) {{ item.title }}
            </p>
          </div>
        </div>
        <div class="culture__right">
          <p
            class="culture__right-p antique"
            v-for="(text, index) in cultureList[activeCultureItem].texts"
          >
            {{ text }}
          </p>
        </div>
      </div>
      <div class="culture-content mobile">
        <ul class="culture__accordion">
          <li
            class="culture__accordion-item"
            :class="{
              'culture__accordion-item-active': cultureList[index].isOpen,
            }"
            v-for="(item, index) in cultureList"
            :key="index"
          >
            <p
              class="culture__accordion-item-header caption"
              @click="openCultureItem(index)"
            >
              ({{ index + 1 }}) {{ item.title }}
            </p>
            <div
              class="culture__accordion-item-content"
              ref="accordionItemContent"
              :style="{
                height: cultureList[index].isOpen
                  ? cultureList[index].height + 'vw'
                  : 0,
              }"
            >
              <img
                class="culture__accordion-item-img"
                :src="cultureList[index].img"
                :alt="cultureList[index].title"
              />
              <div class="culture__accordion-item-texts">
                <p
                  class="culture__accordion-item-texts-p antique"
                  v-for="(text, i) in item.texts"
                  :key="i"
                >
                  {{ text }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="section final">
      <div class="final__left">
        <div></div>
        <div class="final__left-main">
          <h6 class="final__left-subtitle caption">{{ textAboveTitle }}</h6>
          <h3 class="final__left-title h1">{{ titleFinal }}</h3>
        </div>

        <div class="final__left-list">
          <nuxt-link
            v-for="(farmer, index) in farmers"
            :key="index"
            :to="localePath(farmer.link)"
            class="final__left-list-farmer link underline"
            :title="farmer.name"
            >{{ farmer.name }}</nuxt-link
          >
        </div>
      </div>
      <div class="final__right">
        <img class="final__right-img" :src="imgFinal" alt="Bottle" />
      </div>
    </section>
  </main>
</template>

<script setup>
import OliviesIcon from "@/components/common/oliviesIcon/index.vue";
import Card from "@/components/pages/essence/card/index.vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

const config = useRuntimeConfig();
const { locale } = useI18n();
const API_ROUTE = config.public.api_route;

const accordionItemContent = ref();
const section = ref();
const heightSection = ref();
const culture = ref();
const heightCulture = ref();
const cardsContainer = ref();

const { data } = await useAsyncData("essence-page", () =>
  $fetch(API_ROUTE + `/api/essence?populate=deep&locale=${locale.value}`),
  {
    watch: [locale]
  }
);
const response = data.value.data.attributes;
// HERO SECTION //
const subtitle = response.subtitle;
const textUnderIcon = response.textUnderIcon;
// CARDS //
const cards = [];
response.card.forEach((card) => {
  const item = {
    title: card.cardName,
    text: card.cardTitle,
    iconWhite: API_ROUTE + card.svgIconWhite.data.attributes.url,
    iconBrown: API_ROUTE + card.svgIconBrown.data.attributes.url,
    reversed: {
      title: card.backTitle,
      img: API_ROUTE + card.backImg.data.attributes.url,
      text: card.backText,
    },
  };
  cards.push(item);
});

// CULTURE //
const cultureList = reactive([]);
response.cultureItem.forEach((element) => {
  const item = {
    title: element.title,
    img: API_ROUTE + element.img.data.attributes.url,
    texts: element.paragraph.map((obj) => obj.text),
    isOpen: false,
  };
  cultureList.push(item);
});
const activeCultureItem = ref(0);
function changeActiveCultureItem(index) {
  activeCultureItem.value = index;
}
function openCultureItem(index) {
  cultureList[index].isOpen = !cultureList[index].isOpen;
}

// FINAL SECTION //
const { data: dataFamily } = await useAsyncData("family-page-s", () =>
  $fetch(API_ROUTE + `/api/family-pages?populate=deep&locale=${locale.value}`),
  {
    watch: [locale]
  }
);
const titleFinal = response.finalSection.title;
const textAboveTitle = response.finalSection.textAboveTitle;
const imgFinal = API_ROUTE + response.finalSection.img.data.attributes.url;
const farmers = [];
dataFamily.value.data.forEach((element) => {
  farmers.push({
    name: element.attributes.name,
    link: "/" + element.attributes.name.toLowerCase(),
  });
});

onMounted(() => {
  document.querySelectorAll(".card").forEach((card) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top center",
        scrub: true,
      },
      y: VwToPx(10.417),
    });
  });
  headerStateStore.changeLogoShow(false);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(true);

  accordionItemContent.value.forEach((item, index) => {
    cultureList[index].height = pxToVw(item.scrollHeight + 5.33);
  });

  heightSection.value = section.value.offsetHeight;
  heightCulture.value = culture.value.offsetTop;
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
function handleScroll() {
  if (window.pageYOffset > heightSection.value) {
    headerStateStore.changeLogoShow(true);
    headerStateStore.changeColorToWhite(true);
    if (
      window.pageYOffset + VwToPx(isDesktopStore.getIsDesktop ? 3.125 : 13.33) >
      culture.value.offsetTop
    ) {
      headerStateStore.changeCanHeaderChange(true);
      headerStateStore.changeColorToWhite(false);
    } else {
      headerStateStore.changeCanHeaderChange(false);
    }
  } else {
    headerStateStore.changeLogoShow(false);
    headerStateStore.changeColorToWhite(true);
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
