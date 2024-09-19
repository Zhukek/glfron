<template>
  <main>
    <section class="section main">
      <h1 class="main__h1 h1">
        Family<br />
        {{ surname }}
      </h1>
      <h2 class="main__h2 greek-caption">{{ greekName }}</h2>
      <div class="main__wrapper">
        <img class="main__wrapper-img" :src="photo" :alt="surname" />
      </div>
    </section>
    <section class="section section-margin harvest">
      <div class="title h2-smallcaps">Harvest</div>
      <div class="harvest-timeline">
        <div class="harvest-timeline-year">
          <div
            class="harvest-timeline-year-line harvest-timeline-year-line-disable"
          ></div>
        </div>
        <div
          class="harvest-timeline-year"
          :class="{ 'harvest-timeline-year-active': i === activeTimeline }"
          @mouseenter="changeActiveTimeLine(i)"
          @click="changeActiveTimeLine(i)"
          v-for="(item, i) in listTimelime"
          :key="i"
        >
          <div class="harvest-timeline-year-vertical"></div>
          <div class="harvest-timeline-year-line"></div>
          <div class="harvest-timeline-year-value grotesk">{{ item.year }}</div>
          <div class="harvest-timeline-year-line"></div>
          <div class="harvest-timeline-year-points desktop">
            <div
              class="harvest-timeline-year-points-item antique pre-line"
              v-for="(point, j) in item.points"
              :key="j"
            >
              {{ point }}
            </div>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div class="harvest-points">
          <div
            class="harvest-points-item antique pre-line"
            v-for="(point, j) in listTimelime[activeTimeline].points"
            :key="j"
          >
            {{ point }}
          </div>
        </div>
      </div>

      <div class="harvest__cards desktop">
        <div
          class="harvest__card"
          v-for="(card, index) in listTimelime[activeTimeline].listHarvest"
          :key="index"
        >
          <h6 class="harvest__card-title antique pre-line">{{ card.name }}</h6>
          <img
            v-if="card.img"
            class="harvest__card-img"
            :src="card.img"
            alt="Olive oil"
          />
        </div>
      </div>
      <div class="mobile">
        <Slider :list="listTimelime[activeTimeline].listHarvest" />
      </div>
    </section>
    <section class="section about">
      <h2 class="title h2-smallcaps">About farmer</h2>
      <div class="about__content">
        <div class="about__left">
          <img class="about__left-img" :src="photoAbout" :alt="surname" />
        </div>
        <div class="about__center">
          <p class="about__center-title grotesk pre-line">
            {{ fullname }}
          </p>
          <p class="about__center-subtitle caption">{{ greekName }}</p>
          <img
            class="about__center-img voutaktakis"
            :src="signature"
            :alt="surname"
          />
        </div>
        <div class="about__right">
          <p class="about__right-text about__right-text-lead grotesk">
            {{ textBig }}
          </p>
          <p
            class="about__right-text antique"
            v-for="(text, index) in smallTexts"
            :key="index"
          >
            {{ text }}
          </p>
        </div>
      </div>
    </section>
    <section class="section farm">
      <div class="farm-block">
        <img class="farm-img" :src="farmImg" :alt="farmName" />
        <div class="farm-caption">
          <div class="farm-caption-item antique">
            {{ farmName }}
          </div>
          <div class="farm-caption-item desktop antique">
            {{ farmCoordinates }}
          </div>
        </div>
      </div>
    </section>
    <section class="section production section-margin">
      <h2 class="title h2-smallcaps">About production</h2>
      <div class="production-content">
        <div class="production-radio">
          <label
            v-for="(item, index) in productions"
            :key="index"
            class="production-radio-btn caption"
            :class="{
              'production-radio-btn-active': productionActiveIndex === index,
            }"
            :for="item.title"
          >
            {{ item.title }}
            <input
              class="production-radio-input"
              type="radio"
              :id="item.title"
              :value="index"
              v-model="productionActiveIndex"
            />
          </label>
        </div>

        <hr />
        <div class="production-info">
          <div class="production-info-model">
            <div class="production-info-model-title antique">
              {{ productions[productionActiveIndex].title }}
              <br />
              {{ productions[productionActiveIndex].text }}
            </div>
            <img
              class="production-info-model-img"
              :class="{
                premium: productionActiveIndex === 0,
                select: productionActiveIndex === 1,
                elixir: productionActiveIndex === 2,
              }"
              :src="productions[productionActiveIndex].img"
              :alt="productions[productionActiveIndex].title"
            />
          </div>
          <div class="production-info-options desktop">
            <div class="production-info-options-view">
              <button
                v-for="(option, index) in accordion"
                :class="{
                  'production-info-options-view-item-active':
                    index === activeOption,
                }"
                @click="changeActiveOption(index)"
                class="production-info-options-view-item caption"
              >
                {{ `(${index + 1}) ` + option.title }}
              </button>
            </div>
            <div class="production-info-options-text">
              <p
                class="production-info-options-text-item antique"
                v-for="text in accordion[activeOption].texts"
                :key="text"
              >
                {{ text }}
              </p>
            </div>
          </div>
          <div class="production-info-accordion mobile">
            <div
              class="production-info-accordion-item"
              v-for="(item, index) in accordion"
              :key="index"
              @click="openAccordionItem(index)"
              ref="accordionItemContent"
              :style="{
                height: accordion[index].isOpen
                  ? accordion[index].height + 'vw'
                  : '14.93vw',
              }"
            >
              <p
                class="production-info-accordion-item-title caption"
                :class="{
                  'production-info-accordion-item-title-active': item.isOpen,
                }"
              >
                {{ `(${index + 1}) ` + item.title }}
              </p>
              <p
                class="production-info-accordion-item-text antique"
                v-for="text in item.texts"
                :key="text"
              >
                {{ text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Industry />

    <section class="section accreditation">
      <div class="accreditation__column">
        <img
          class="accreditation__column-img"
          :src="accreditationImg"
          alt="Process"
        />
      </div>
      <div class="accreditation__column">
        <h6
          class="accreditation__column-title"
          :class="{
            'greek-caption': !isDesktopStore.getIsDesktop,
            caption: isDesktopStore.getIsDesktop,
          }"
        >
          {{ accreditationTitle }}
        </h6>
        <div class="accreditation__column-icon">
          <img
            class="accreditation__column-icon-img"
            :src="accreditationLogo"
            alt="Greek Legend"
          />
        </div>
      </div>
      <div class="accreditation__column">
        <p
          class="accreditation__column-text accreditation__column-text-lead grotesk"
        >
          {{ bigTextAccreditation }}
        </p>

        <p
          class="accreditation__column-text antique"
          v-for="(text, index) in smallTextsAccreditation"
          :key="index"
        >
          {{ text }}
        </p>
      </div>
    </section>
    <section class="autoslider section-margin">
      <Autoslider :list="listImgs" />
    </section>
  </main>
</template>

<script setup>
import Industry from "~/components/pages/family/industry/index.vue";
import Slider from "~/components/common/slider/slider.vue";
import Autoslider from "~/components/common/autoslider/autoslider.vue";
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useRoute } from "vue-router";
const route = useRoute();

const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;

const accordionItemContent = ref();

const { data } = await useAsyncData("family-page-" + route.params.family, () =>
  $fetch(
    API_ROUTE +
      `/api/family-pages?filters[name][$eqi]=${route.params.family}&populate=deep`
  )
);
const response = data.value.data[0]?.attributes;
if (!response) {
  throw createError({
    statusCode: 404,
    message: "not found",
    fatal: true,
  });
}

// FIRST SECTION //
const surname = response.name;
const greekName = response.greekName;
const photo = API_ROUTE + response.photo.data.attributes.url;
// TIMELINE //
const activeTimeline = ref(0);
function changeActiveTimeLine(index) {
  activeTimeline.value = index;
}
const listTimelime = [];
response.harvest.forEach((element) => {
  const item = {
    year: element.year,
    points: [],
    listHarvest: [],
  };
  element.circle.forEach((el) => {
    item.points.push(el.value);
  });
  element.harvestItem.forEach((el) => {
    item.listHarvest.push({
      name: el.type + " " + element.year + "\n" + el.capacity,
      img: API_ROUTE + el.bottleImg.data.attributes.url,
    });
  });
  listTimelime.push(item);
});
// ABOUT //
const fullname = surname + "\n" + response.about.farmerFirstName;
const photoAbout = API_ROUTE + response.about.photo.data.attributes.url;
const signature = API_ROUTE + response.about.signature.data.attributes.url;
const textBig = response.about.textBig;
const smallTexts = response.about.smallTexts.map((obj) => obj.paragraph);
// FARM //
const farmName = response.farmName;
const farmImg = API_ROUTE + response.farmImg.data.attributes.url;
const farmCoordinates = response.farmCoordinates;
// ABOUT PRODUCTION //
const productions = [];
response.aboutProductionBottles.forEach((element) => {
  const item = {
    title: element.type,
    img: API_ROUTE + element.bottleImg.data.attributes.url,
    text: element.capacities,
  };
  productions.push(item);
});
const productionActiveIndex = ref(0);

const { data: dataAccordion } = await useAsyncData(
  "family-page-" + route.params.family + "-accordion",
  () =>
    $fetch(
      API_ROUTE + `/api/family-about-prodaction-right-column?populate=deep`
    )
);
const responseAccordion = dataAccordion.value.data.attributes;
const accordion = reactive([]);
responseAccordion.rightColumn.forEach((element) => {
  const item = {
    title: element.key,
    isOpen: false,
    texts: element.item.map((obj) => obj.value),
  };
  accordion.push(item);
});
function openAccordionItem(index) {
  accordion[index].isOpen = !accordion[index].isOpen;
}
const activeOption = ref(0);
function changeActiveOption(index) {
  activeOption.value = index;
}
// ACCREDITATION //
const { data: dataAccreditation } = await useAsyncData(
  "family-page-" + route.params.family + "-accreditation",
  () => $fetch(API_ROUTE + `/api/family-accreditation?populate=deep`)
);
const responseAccreditation =
  dataAccreditation.value.data.attributes.accreditationSection;
const accreditationImg =
  API_ROUTE + responseAccreditation.img.data.attributes.url;
const accreditationTitle = responseAccreditation.title;
const accreditationLogo =
  API_ROUTE + responseAccreditation.accreditationLogo.data.attributes.url;
const bigTextAccreditation = responseAccreditation.bigText;
const smallTextsAccreditation = responseAccreditation.smallTexts.map(
  (obj) => obj.text
);
const { data: dataSlider } = await useAsyncData(
  "family-page-" + route.params.family + "-slider",
  () => $fetch(API_ROUTE + `/api/family-page-auto-slider?populate=deep`)
);
const responseSlider = dataSlider.value.data.attributes.sliderPhotos.data;
// AUTOSLIDER //
const listImgs = [];
responseSlider.forEach((element) => {
  listImgs.push(API_ROUTE + element.attributes.url);
});
listImgs.splice(1, 0, API_ROUTE + response.photoInSlider.data.attributes.url);

onMounted(() => {
  headerStateStore.changeColorToWhite(false);
  headerStateStore.changeCanHeaderChange(true);
  headerStateStore.changeLogoShow(true);
  accordionItemContent.value.forEach((item, index) => {
    accordion[index].height = pxToVw(item.scrollHeight);
  });
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
