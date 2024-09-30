<template>
  <main>
    <section
      class="first"
      ref="section"
      :style="{ 'background-image': `url(${background})` }"
    >
      <div class="first__title">
        <h1 class="h2">{{ mainText }}</h1>
      </div>
      <div class="first__basement">
        <p class="caption">
          {{ bottomText }}
        </p>
      </div>
    </section>
    <section class="section table">
      <div class="table-content">
        <div class="table__item" v-for="(item, index) in table" :key="index">
          <div class="table__item-value factoid">
            {{ item.value }}
            <img
              v-if="item.plusAfterNumber"
              class="table__item-value-plus"
              src="@/assets/imgs/plus.svg"
              alt="Plus"
            />
          </div>
          <div class="table__item-title antique">{{ item.title }}</div>
        </div>
      </div>
      <hr class="desktop" />
    </section>
    <section class="section partnership">
      <h2 class="title h2-smallcaps">Partnership</h2>
      <div class="partnership__content">
        <div class="partnership__left">
          <video class="partnership__left-img" autoplay loop muted playsinline>
            <source :src="partnershipVideo" type="video/mp4" />
          </video>
        </div>

        <div class="partnership__right">
          <div
            v-for="(item, index) in partnership"
            :key="index"
            class="partnership__right-row"
          >
            <p class="partnership__right-row-text grotesk">
              {{ item.text }}
            </p>
            <div class="partnership__right-row-column">
              <ul class="partnership__right-row-list">
                <li
                  class="partnership__right-row-list-item antique"
                  v-for="element in item.list"
                  :key="element"
                >
                  {{ element }}
                </li>
              </ul>
              <router-link
                class="partnership__right-row-btn caption"
                v-if="item.btn"
                :to="item.btn.link"
                >{{ item.btn.text }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section difference section-margin">
      <h2 class="title h2-smallcaps">Difference from other brands</h2>
      <div class="difference__content desktop">
        <div class="difference__content-row">
          <div class="difference__content-row-cell grotesk"></div>

          <div class="difference__content-row-cell grotesk">
            <p class="difference__content-row-cell-text">Greek Legend</p>
            <img
              src="@/assets/imgs/icon.svg"
              alt="Greek Legend"
              class="difference__content-row-cell-img"
            />
          </div>
          <div class="difference__content-row-cell grotesk">Other brands</div>
        </div>
        <div
          class="difference__content-row"
          v-for="(row, i) in difference"
          :key="i"
        >
          <div
            class="difference__content-row-cell"
            v-for="(cell, j) in row"
            :key="j"
          >
            <p
              class="difference__content-row-cell-text"
              :class="{
                grotesk: j === 0,
                antique: j !== 0,
              }"
            >
              {{ cell }}
            </p>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div class="difference__content">
          <div
            class="difference__content-item"
            v-for="(item, index) in difference"
          >
            <div class="difference__content-item-title caption">
              {{ item.title }}
            </div>
            <div class="difference__content-item-blocks">
              <div class="difference__content-item-block">
                <div class="difference__content-item-block-title grotesk">
                  Greek Legend
                </div>
                <div class="difference__content-item-block-text antique">
                  {{ item.greeklegend }}
                </div>
              </div>

              <div class="difference__content-item-block">
                <div class="difference__content-item-block-title grotesk">
                  Other brands
                </div>
                <div class="difference__content-item-block-text antique">
                  {{ item.other }}
                </div>
              </div>
            </div>
          </div>

          <div class="difference__accreditation">
            <h6 class="difference__accreditation-title greek-caption">
              {{ qualityControl }}
            </h6>
            <div class="difference__accreditation-icon">
              <img
                class="difference__accreditation-icon-img"
                src="@/assets/imgs/icon.svg"
                alt="Greek Legend"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section products section-margin">
      <h2 class="title h2-smallcaps">Products</h2>
      <div class="products__content desktop">
        <div class="products__left">
          <img
            class="products__left-img"
            :src="families[familyActiveIndex].img"
            :alt="families[familyActiveIndex].name + ' bottle'"
          />
        </div>
        <div class="products__right">
          <div class="products__right-instruction">
            <p class="products__right-instruction-text grotesk">
              {{ instructionsTopText }}
            </p>
            <p class="products__right-instruction-text antique">
              {{ instructionsBottomText }}
            </p>
          </div>
          <div class="products__right-families">
            <router-link
              :to="localePath(family.link)"
              class="products__right-families-family h1"
              :class="{
                'products__right-families-family-active':
                  index === familyActiveIndex,
              }"
              v-for="(family, index) in families"
              :key="index"
              @mouseenter="changeFamily(index)"
            >
              {{ family.name }}
            </router-link>
          </div>
          <div class="products__right-info">
            <div class="products__right-info-bottles">
              <img
                class="products__right-info-bottles-img"
                src="@/assets/imgs/bottles.svg"
                alt="bottles"
              />
            </div>
            <div class="products__right-info-text antique">
              {{ productsBottomText }}
            </div>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div class="products__content">
          <Annotation />
          <div class="products__families">
            <div
              class="products__families-block"
              v-for="(family, index) in families"
              :key="index"
            >
              <img
                class="products__families-block-img"
                :src="family.img"
                :alt="family.name"
              />
              <nuxt-link
                :title="family.name"
                :to="localePath(family.link)"
                class="products__families-block-title h1"
              >
                {{ family.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Capacities
      :hint="leftHintText"
      :factoriesListProp
      :apiKey
      :captionAboveOwnerPhoto
    />
    <section class="section section-margin ceo">
      <h2 class="title h2-smallcaps">Appeal CEO</h2>
      <div class="ceo__content">
        <div class="ceo__left">
          <img class="ceo__left-img" :src="photo" alt="CEO Greek Legend" />
        </div>
        <div class="ceo__center">
          <p class="ceo__center-title pre-line grotesk">
            {{ name }}
          </p>
          <p class="ceo__center-subtitle caption">{{ greekName }}</p>
          <img class="ceo__center-img" :src="signature" alt="Βουτακτάκης" />
          <p class="ceo__center-info antique">CEO Greek Legend</p>
          <a
            :href="'mailto: ' + email"
            class="ceo__center-email antique"
            :title="email"
            >{{ email }}</a
          >
        </div>
        <div class="ceo__right">
          <h6 class="ceo__right-title h2">{{ bigText }}</h6>
          <p class="ceo__right-text ceo__right-text-lead grotesk">
            {{ mediumText }}
          </p>
          <p
            class="ceo__right-text antique"
            v-for="(text, index) in smallTexts"
            :key="index"
          >
            {{ text }}
          </p>

          <p class="ceo__right-text caption">
            {{ caption }} <br />
            {{ greekCaption }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import Annotation from "@/components/common/annotation/index.vue";
import Capacities from "@/components/pages/about/index.vue";

import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();

const section = ref(null);
const heightSection = ref(null);
onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(true);
  heightSection.value = section.value.offsetHeight;
  window.addEventListener("scroll", handleScroll);
});
function handleScroll() {
  if (window.pageYOffset > heightSection.value) {
    headerStateStore.changeCanHeaderChange(true);
    headerStateStore.changeColorToWhite(false);
  } else {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(true);
  }
}

const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;
const apiKey = config.public.maps;
const { locale } = useI18n(); 

const { data } = await useAsyncData("about-page", () =>
  $fetch(API_ROUTE + `/api/about-page?populate=deep&locale=${locale.value}`),
  {
    watch: [locale]
  }
);
const response = data.value.data.attributes;
// FIRST SECTION //
const background = API_ROUTE + response.background.data.attributes.url;
const mainText = response.mainText;
const bottomText = response.bottomText;
// TABLE //
const table = [];
response.table.cell.forEach((cell) => {
  const item = {
    value: cell.number,
    title: cell.title,
    plusAfterNumber: cell.plusAfterNumber,
  };
  table.push(item);
});
// PARTNERSHIP //
const partnershipVideo =
  API_ROUTE + response.partnership.video.data.attributes.url;
const partnership = [];
response.partnership.rightColumnRow.forEach((row) => {
  const item = {
    list: row.answer.split("\n\n"),
    text: row.question,
  };
  partnership.push(item);
});
//  DIFFERENCE //
const difference = [];
response.difference.row.forEach((row) => {
  const item = {
    title: row.title,
    greeklegend: row.greekLegend,
    other: row.otherBrands,
  };
  difference.push(item);
});
const qualityControl = response.difference.qualityControl;
// PRODUCTS //
const instructionsTopText = response.products.rightColumn.instructionsTopText;
const instructionsBottomText =
  response.products.rightColumn.instructionsBottomText;
const productsBottomText = response.products.rightColumn.bottomText;
const families = [];
response.products.familyProduct.forEach((product) => {
  const item = {
    name: product.familyName,
    img: API_ROUTE + product.img.data.attributes.url,
    link: "/" + product.familyName.toLowerCase(),
  };
  families.push(item);
});
const familyActiveIndex = ref(0);
function changeFamily(index) {
  familyActiveIndex.value = index;
}
// CAPACITIES //
const leftHintText = response.capacities.leftHintText;
const captionAboveOwnerPhoto = response.capacities.captionAboveOwnerPhoto;
const factoriesListProp = [];
response.capacities.factory.forEach((factory) => {
  const item = {
    text: factory.factoryName,
    isActive: false,
    isOpen: false,
    type: factory.type,
    option: {
      position: {
        lat: factory.coordinatesLatitude,
        lng: factory.coordinatesLongitude,
      },
    },
    description: factory.description,
    img: API_ROUTE + factory.factoryPhoto.data.attributes.url,
    owner: {
      img: API_ROUTE + factory.factoryOwnerPhoto.data.attributes.url,
      name: factory.factoryOwnerName,
      description: factory.ownerQuote,
    },
  };
  factoriesListProp.push(item);
});

// CEO //
const photo = API_ROUTE + response.ceo.photo.data.attributes.url;
const name = formatName(response.ceo.name);
const greekName = response.ceo.greekName;
const email = response.ceo.email;
const signature = API_ROUTE + response.ceo.signature.data.attributes.url;
const bigText = response.ceo.bigText;
const mediumText = response.ceo.mediumText;
const smallTexts = response.ceo.smallText.split("\n\n");
const caption = response.ceo.caption;
const greekCaption = response.ceo.greekCaption;

function formatName(fullName) {
  const [firstName, lastName] = fullName.split(" ");
  return `${firstName}\n${lastName}`;
}
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
