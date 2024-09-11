<template>
  <main>
    <section class="section main">
      <h1 class="main__h1 h1">
        Family <br />
        Chatzigeorgiou
      </h1>
      <h2 class="main__h2 greek-caption">ΧΑΤΖΗΓΙΩΡΓΗΣ</h2>
      <div class="main__wrapper">
        <img
          class="main__wrapper-img"
          src="@/assets/imgs/families/chatzigeorgiou.webp"
          alt="Chatzigeorgiou"
        />
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
            alt="Harvest olive oil"
          />
        </div>
      </div>
      <div class="mobile">
        <slider :list="listTimelime[activeTimeline].listHarvest" />
      </div>
    </section>
    <section class="section about">
      <h2 class="title h2-smallcaps">About farmer</h2>
      <div class="about__content">
        <div class="about__left">
          <img
            class="about__left-img"
            src="@/assets/imgs/families/aboutChatzigeorgiou.webp"
            alt="Chatzigeorgiou"
          />
        </div>
        <div class="about__center">
          <p class="about__center-title grotesk">
            Chatzigeorgiou <br />
            Dimos
          </p>
          <p class="about__center-subtitle caption">ΧΑΤΖΗΓΙΩΡΓΗΣ</p>
          <img
            class="about__center-img chatzigeorgiou"
            src="@/assets/imgs/families/signatureChatzigiorgis.svg"
            alt="ΧΑΤΖΗΓΙΩΡΓΗΣ"
          />
        </div>
        <div class="about__right">
          <p class="about__right-text about__right-text-lead grotesk">
            Dimos Chatzigeorgiou is the living embodiment of the centuries-old
            tradition of olive oil production in Crete. Since childhood, he has
            been immersed in the love for the land and the craft inherited from
            his grandfather, who founded the family farm in 1926.
          </p>
          <p class="about__right-text antique">
            Today, Dimos is the guardian of this 98-year-old family legacy.
            Using traditional methods, he meticulously cares for the olive
            groves and oversees every stage of production, from harvesting the
            olives to storing the olive oil.
          </p>
          <p class="about__right-text antique">
            His dedication has not gone unnoticed: in 1951, the Chatzigeorgiou
            family won an award at the Thessaloniki Olive Oil Exhibition.
          </p>
          <p class="about__right-text antique">
            Dimos attributes his success not only to his commitment to tradition
            but also to the support of his family. His wife Maria, sons Nikos
            and Michalis, brother, and brother-in-law all help him in this
            challenging but noble endeavor.In his free time, Dimos enjoys
            spearfishing, but his heart always belongs to the olive grove, where
            he creates his unique symphony of flavor.
          </p>
        </div>
      </div>
    </section>
    <section class="section farm">
      <div class="farm-block">
        <img
          class="farm-img"
          src="@/assets/imgs/mapChatzigeorgiou.webp"
          alt="Olive oil farm Chatzigeorgiou"
        />
        <div class="farm-caption">
          <div class="farm-caption-item antique">
            Olive oil farm Chatzigeorgiou
          </div>
          <div class="farm-caption-item desktop antique">
            35.144148° 24.756445°
          </div>
        </div>
        <!-- <div class="farm-caption farm-caption-right desktop">
          <img class="farm-caption-img" src="@/assets/imgs/map.jpg" alt="map" />
        </div> -->
      </div>
      <!-- <div class="farm-block mobile">
        <img class="farm-img" src="@/assets/imgs/map.jpg" alt="Map" />
        <div class="farm-caption">
          <div class="farm-caption-item mobile antique">
            35.144148° 24.756445°
          </div>
        </div>
      </div> -->
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
            <!-- <button>Check in 3D view</button> -->
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
    <section
      class="section accreditation"
      id="accreditation"
      ref="accreditation"
    >
      <div class="accreditation__column">
        <img
          class="accreditation__column-img"
          src="@/assets/imgs/process.webp"
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
          Greek Legend guarantee and quality control
        </h6>
        <div class="accreditation__column-icon">
          <img
            class="accreditation__column-icon-img"
            src="@/assets/imgs/icon.svg"
            alt="Greek Legend"
          />
        </div>
      </div>
      <div class="accreditation__column">
        <p
          class="accreditation__column-text accreditation__column-text-lead grotesk"
        >
          Olive oil production is a multi-stage process that requires strict
          control at every stage. It all starts with the harvest, followed by
          hand-picking and immediate delivery to the factory to transform the
          olives into olive oil.
        </p>
        <p class="accreditation__column-text antique">
          The fruits are crushed, the olive oil is extracted, and then
          processed. Thanks to the correct processing approach, the olive oil
          retains not only its unique aroma but also valuable vitamins and
          antioxidants.
        </p>
        <p class="accreditation__column-text antique">
          Delicate handling of the fruit, responsible work of the farmers, and
          time-tested production technology allow for low acidity and maximum
          preservation of the beneficial properties of olives.
        </p>
        <p class="accreditation__column-text antique">
          In every drop of olive oil lies not only the taste and aroma of
          Greece, but also its history, culture, and soul. This is a product
          that the Greeks themselves eat!
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
import slider from "~/components/common/slider/slider.vue";
import Autoslider from "~/components/common/autoslider/autoslider.vue";
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useRouter } from "vue-router";
const router = useRouter();
const accreditation = ref();
const accordionItemContent = ref();
function anchorCheck() {
  if (router.currentRoute.value.hash === "#accreditation")
    setTimeout(() => {
      accreditation.value.scrollIntoView();
    }, 100);
}
onMounted(() => {
  anchorCheck();
  headerStateStore.changeColorToWhite(false);
  headerStateStore.changeCanHeaderChange(true);
  headerStateStore.changeLogoShow(true);
  accordionItemContent.value?.forEach((item, index) => {
    accordion[index].height = pxToVw(item.scrollHeight);
  });
});

const activeOption = ref(0);
function changeActiveOption(index) {
  activeOption.value = index;
}
// IMPORT BOTTLES //
import premium from "@/assets/imgs/bottles/premiumChatzigeorgiou500.png";
import select from "@/assets/imgs/bottles/selectChatzigeorgiou500.png";
import elixir from "@/assets/imgs/bottles/elixirChatzigeorgiou.png";
const productions = [
  { title: "Premium", img: premium, text: "250, 500, 750 ml" },
  { title: "Select", img: select, text: "250, 500 ml" },
  { title: "Elixirio", img: elixir, text: "250 ml" },
];
const productionActiveIndex = ref(0);

const accordion = reactive([
  {
    title: "Packaging",
    isOpen: false,
    texts: [
      'During transportation of our products, we use environmentally friendly and ergonomic packaging and strictly follow the "top-bottom" marking to prevent damage.',
    ],
  },
  {
    title: "Concept",
    isOpen: false,
    texts: [
      "We are a dynamically developing company with a unique concept that allows each family producer from Greece to put their fresh, exclusive olive oil on the buyer's table under our brand.",
      "We do not strive to conquer the whole world, since Greece does not produce a lot of olive oil, and we also select only the highest quality and freshest from it. But we want to share our excellent product with you.",
    ],
  },

  {
    title: "Bottle",
    isOpen: false,
    texts: [
      `Each bottle of "Greek Legend" is a story of a family that has been cultivating olives with love and care for many years. The olive oil produced by each family is bottled separately and marked: each bottle features a photo and the last name of the family member who participated in the production of the oil as a sign of the farmer's personal responsibility for the quality of the product.`,
    ],
  },
  {
    title: "Olive oil",
    isOpen: false,
    texts: [
      "Our olive oil is made from the Koroneiki olive variety, which grows throughout Greece. The production of the olive oil is controlled at every stage: from the cultivation of the olives to their gentle pressing. Each drop of olive oil contains not only the taste and aroma of Greece, but also its history, culture and soul. This is a product that Greeks themselves eat!",
    ],
  },
]);
function openAccordionItem(index) {
  accordion[index].isOpen = !accordion[index].isOpen;
}

const activeTimeline = ref(0);
function changeActiveTimeLine(index) {
  activeTimeline.value = index;
}

const listTimelime = [
  {
    year: "2020/2021",
    points: [
      "800 \nTons of \nolives",
      "1 000 \nTrees",
      "600 \nLiters of \nolive oil",
    ],
    listHarvest: [
      {
        name: "Premium 2020/2021 \n(500 liters)",
        img: premium,
      },
      {
        name: "Select 2020/2021 \n(300 liters)",
        img: select,
      },
      {
        name: "Elixirio 2020/2021 \n(100 liters)",
        img: elixir,
      },
    ],
  },
  {
    year: "2021/2022",
    points: [
      "900 \nTons of \nolives",
      "1 000 \nTrees",
      "750 \nLiters of \nolive oil",
    ],
    listHarvest: [
      {
        name: "Premium 2021/2022 \n(500 liters)",
        img: premium,
      },
      {
        name: "Select 2021/2022 \n(300 liters)",
        img: select,
      },
      {
        name: "Elixirio 2021/2022 \n(100 liters)",
        img: elixir,
      },
    ],
  },
  {
    year: "2022/2023",
    points: [
      "630 \nTons of \nolives",
      "1 000 \nTrees",
      "690 \nLiters of \nolive oil",
    ],
    listHarvest: [
      {
        name: "Premium 2022/2023 \n(500 liters)",
        img: premium,
      },
      {
        name: "Select 2022/2023 \n(300 liters)",
        img: select,
      },
      {
        name: "Elixirio 2022/2023 \n(100 liters)",
        img: elixir,
      },
    ],
  },
  {
    year: "2023/2024",
    points: [
      "500 \nTons of \nolives",
      "1 000 \nTrees",
      "500 \nLiters of \nolive oil",
    ],
    listHarvest: [
      {
        name: "Premium 2023/2024 \n(500 liters)",
        img: premium,
      },
      {
        name: "Select 2023/2024 \n(300 liters)",
        img: select,
      },
      {
        name: "Elixirio 2023/2024 \n(100 liters)",
        img: elixir,
      },
    ],
  },
];

import slider1 from "@/assets/imgs/slider/1.webp";
import slider2 from "@/assets/imgs/slider/2Chatzigeorgiou.webp";
import slider3 from "@/assets/imgs/slider/3Chatzigeorgiou.webp";

const listImgs = [
  {
    img: slider1,
  },
  {
    img: slider2,
  },
  {
    img: slider3,
  },
];
</script>
<style lang="scss" scoped>
@import "@/assets/styles/family.scss";
</style>
