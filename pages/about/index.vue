<template>
  <main>
    <section class="first" ref="section">
      <div class="first__title">
        <h1 class="h2">Welcome to Greek Legend</h1>
      </div>
      <div class="first__basement">
        <p class="caption">
          Crafting Premium Olive Oil from the Heart of Greece
        </p>
      </div>
    </section>
    <section class="section table">
      <div class="table-content">
        <div class="table__item" v-for="(item, index) in table" :key="index">
          <div class="table__item-value factoid">
            {{ item.value }}
            <img
              class="table__item-value-plus"
              src="@/assets/imgs/plus.svg"
              alt="plus"
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
            <source src="@/assets/imgs/video_bottles.mp4" type="video/mp4" />
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
              {{ item[0] }}
            </div>
            <div class="difference__content-item-blocks">
              <div class="difference__content-item-block">
                <div class="difference__content-item-block-title grotesk">
                  Greek Legend
                </div>
                <div class="difference__content-item-block-text antique">
                  {{ item[1] }}
                </div>
              </div>

              <div class="difference__content-item-block">
                <div class="difference__content-item-block-title grotesk">
                  Other brands
                </div>
                <div class="difference__content-item-block-text antique">
                  {{ item[2] }}
                </div>
              </div>
            </div>
          </div>

          <div class="difference__accreditation">
            <h6 class="difference__accreditation-title greek-caption">
              Greek Legend guarantee and quality control
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
              Hover over the last name of one of our 3 farmers to view the
              products
            </p>
            <p class="products__right-instruction-text antique">
              If you click on the last name, you will be taken to the farmer's
              page
            </p>
          </div>
          <div class="products__right-families">
            <router-link
              :to="family.link"
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
              Premium, Select, and Elixirio, each with its unique essence. 250,
              500, 750. Their dedication has spawned three distinct categories:
              Premium, Select, and Elixirio.
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
                :to="family.link"
                class="products__families-block-title h1"
              >
                {{ family.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Capacities />
    <section class="section section-margin ceo">
      <h2 class="title h2-smallcaps">Appeal CEO</h2>
      <div class="ceo__content">
        <div class="ceo__left">
          <img
            class="ceo__left-img"
            src="@/assets/imgs/ceo/ceo.webp"
            alt="CEO Greek Legend"
          />
        </div>
        <div class="ceo__center">
          <p class="ceo__center-title grotesk">
            Chatzigiorgis <br />
            Georgios
          </p>
          <p class="ceo__center-subtitle caption">χατζηγιωργησ</p>
          <img
            class="ceo__center-img"
            src="@/assets/imgs/ceo/signature.svg"
            alt="Βουτακτάκης"
          />
          <p class="ceo__center-info antique">CEO Greek Legend</p>
          <a
            href="mailto: ceo@greeklegend.gr"
            class="ceo__center-email antique"
            title="ceo@greeklegend.gr"
            >ceo@greeklegend.gr</a
          >
        </div>
        <div class="ceo__right">
          <h6 class="ceo__right-title h2">Dear Guests!</h6>
          <p class="ceo__right-text ceo__right-text-lead grotesk">
            «Greek Legend is Greek olive oil with a unique concept. At its core
            lies the management of crop quality and the absence of blending
            olive oil from different regions, farmers, and seasons. This allows
            olive producers from Greece to present their own product jointly
            with Greek Legend as olive oil on the international market, in its
            authentic form with original flavor characteristics.»
          </p>
          <p class="ceo__right-text antique">
            Our mission is to produce and deliver extra virgin olive oil to you
            the way the Greeks themselves eat it. When buying GREEK LEGEND olive
            oil, you've turned to GOOD FRIENDS!
          </p>
          <p class="ceo__right-text antique">
            First and foremost, Greek Legend is about the friendship among
            individuals who have united under one brand and want their voices to
            be heard, allowing others to experience the diversity of taste that
            has been crafted here, on the island of Crete, in Greece.
          </p>
          <p class="ceo__right-text caption">
            HAVE A GOOD APPETITE! <br />
            (ΚΑΛΉ ΌΡΕΞΗ!)
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import Annotation from "@/components/common/annotation/index.vue";
import Capacities from "@/components/pages/about/index.vue";

import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
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
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
const table = [
  {
    value: "350",
    title: "Families",
  },
  {
    value: "125 000",
    title: "Threes",
  },
  {
    value: "5 000",
    title: "Tons of olives",
  },
  {
    value: "1 000",
    title: "Tons of olive oil",
  },
  {
    value: "3 million",
    title: "Square meters",
  },
];
const partnership = [
  {
    text: "What is the cooperation between olive growers and the Greek legend about?",
    list: [
      "Reducing equipment and fertilizer Costs for olive production",
      "Contractual and proprietary standards-based product quality management",
      "Developing a strong brand identity that resonates with target consumers and differentiates the product from competitors.",
      "Extra income!",
    ],
    // btn: { text: "Submit an application", link: "/" },
  },
  {
    text: "What does the brand give to the end consumer?",
    list: [
      "Olive oil eaten by the Greeks themselves",
      "Olive Oil made with the original, time-tested technology",
      "A natural product that is packed with vitamins, antioxidants, and other essential nutrients.",
      "The unparalleled flavor and fragrance of genuine Greek olive oil, which has the power to transform any meal into something special.",
    ],
    // btn: { text: "See where the olive oil is sold", link: "/" },
  },
];
const difference = [
  [
    "Olive production",
    "Made with care and attention to detail, following rigorous quality control procedures",
    "The process of growing, harvesting, and processing the crop depends mainly on the human factor.",
  ],
  [
    "Harvesting",
    "The collection process is provided with modern equipment and human resources, and proper conditions for transportation to the plant are ensured.",
    "The low level of optimization of raw material collection and transportation leads to untimely delivery for processing.",
  ],
  [
    "Olive oil squeeze",
    "Urgent and high-quality olive processing at an authorized plant. Our production technology excludes mixing of olive oil produced by different manufacturers in different seasons.",
    "Often produced at the nearest plant on a first-come, first-served basis, which negatively affects the speed and quality of production, and is mixed with olive oils from other manufacturers to achieve normal acidity.",
  ],
  [
    "Packaging",
    "The olive oil from different families is bottled separately. Each bottle has a photo and the last name of the farmer who participated in the production.",
    "The majority of products are sold to trading and procurement companies, which either package or resell the goods wholesale.",
  ],
  [
    "Transportation",
    "The thermocontainer ensures that the temperature remains constant.",
    "Transportation of the product using accessible methods.",
  ],
  [
    "End-customer communication",
    "Omnichannel customer support system",
    "Lack of a client platform",
  ],
];
import chatzigeorgiou from "@/assets/imgs/families/chatzigeorgiouProducts.webp";
import voutaktakis from "@/assets/imgs/families/voutaktakisProducts.webp";
import papadakis from "@/assets/imgs/families/papadakisProducts.webp";
const families = [
  {
    name: "Chatzigeorgiou",
    img: chatzigeorgiou,
    link: "/chatzigeorgiou",
  },
  {
    name: "Voutaktakis",
    img: voutaktakis,
    link: "/voutaktakis",
  },
  {
    name: "Papadakis",
    img: papadakis,
    link: "/papadakis",
  },
];
const familyActiveIndex = ref(0);
function changeFamily(index) {
  familyActiveIndex.value = index;
}
</script>
<style lang="scss" scoped>
@import "./about.scss";
</style>
