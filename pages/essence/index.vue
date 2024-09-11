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
          Represents the orthodox Greek essence
        </h2>
      </div>
      <div class="hero__basement">
        <OliviesIcon class="hero__basement-img" color="#fff" />
        <p class="hero__basement-p caption">
          There will be cards on the left and right of the page. For more
          information, click on the cards
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
          :reversedTitle="card.reversed.title"
          :reversedImg="card.reversed.img"
          :reversedImgAlt="card.reversed.alt"
          :reversedText="card.reversed.text"
          :lastChild="index === cards.length - 1"
          :width="card.reversed.width"
          :height="card.reversed.height"
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
          <h6 class="final__left-subtitle caption">Here, modernity takes</h6>
          <h3 class="final__left-title h1">Real, Greek, Fresh</h3>
        </div>

        <div class="final__left-list">
          <nuxt-link
            v-for="(farmer, index) in farmers"
            :key="index"
            :to="farmer.link"
            class="final__left-list-farmer link underline"
            :title="farmer.name"
            >{{ farmer.name }}</nuxt-link
          >
        </div>
      </div>
      <div class="final__right">
        <img class="final__right-img" src="@/assets/imgs/essence/botl.webp" />
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

const accordionItemContent = ref();
const section = ref();
const heightSection = ref();
const culture = ref();
const heightCulture = ref();
const cardsContainer = ref();
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
    cultureList.value[index].height = pxToVw(item.scrollHeight) + 5.33;
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

// CARDS //
import helios from "@/assets/imgs/essence/cards/helios.png";
import engraving from "@/assets/imgs/essence/cards/engraving.png";
import sunnyDays from "@/assets/imgs/essence/cards/350plus.svg";
import lizard from "@/assets/imgs/essence/cards/lizard.png";
import millions from "@/assets/imgs/essence/cards/millions.svg";

const cards = [
  {
    title: "The sun",
    text: "Greece — solar font for olive oil production",
    reversed: {
      title: "Helios — \ngreek god of \nthe sun",
      img: helios,
      width: 42.133,
      height: 57.333,
      alt: "Helios",
      text: 'The giant statue of the ancient Greek sun god Helios was erected around 294-282 BC and stood in the port city of Rhodes, located on the island of the same name in the Aegean Sea, in Greece. One of the "Seven Wonders of the World".',
    },
  },
  {
    title: "Water and sea",
    text: "The sea in Greece has a beneficial effect on the local soil",
    reversed: {
      title: "Salamis in the Saronic Gulf, Greece, 1890-s, antique engraving.",
      img: engraving,
      width: 42.133,
      height: 41.6,
      alt: "Engraving",
      text: "Greece is washed by the Mediterranean, Ionian, Aegean and Libyan Seas, and the coastline is more than 15,000 kilometers long.",
    },
  },
  {
    title: "Climat",
    text: "The season in Greece lasts more than six months",
    reversed: {
      title:
        "On average, there are more than 300 sunny days per year in Greece",
      width: 41.6,
      height: 12.8,
      img: sunnyDays,
      alt: "350+",
      text: "The local climate is considered one of the best in the world. Greece is ideal for those who love the sun, because for more than 2/3 of the year there are clear, sunny skies, and prolonged rains are a rare phenomenon.",
    },
  },
  {
    title: "Nature",
    text: "The season in Greece lasts more than six months",
    reversed: {
      title:
        "The Greek algiroides is an endemic species of lizard in the Lacertidae family.",
      width: 42.133,
      height: 57.333,
      img: lizard,
      alt: "Lizard",
      text: "The Greek landscape is an alternation of rocky, usually treeless mountains, densely populated valleys, numerous islands, straits and coves.",
    },
  },
  {
    title: "The soil",
    text: "The season in Greece lasts more than six months",
    reversed: {
      title: "Hectares of fertile soil in Greece",
      img: millions,
      width: 25.6,
      height: 12.8,
      alt: "3 mill",
      text: "Most of the coasts in Greece are steep, consisting of many peninsulas, capes, coves with turquoise water. There are very few forests on the islands, as most of them are mountainous. However, due to the combination of favorable fauna and bright sun, the Greek soil is considered one of the most fertile.",
    },
  },
];

// CULTURE //
import religion from "@/assets/imgs/essence/religion.webp";
import history from "@/assets/imgs/essence/history.webp";
import tourism from "@/assets/imgs/essence/tourism.webp";
import farming from "@/assets/imgs/essence/farming.webp";
import modernity from "@/assets/imgs/essence/modernity.webp";

const cultureList = ref([
  {
    title: "Religion",
    img: religion,
    texts: [
      "Modern Greek religion beautifully blends tradition with contemporary practices. The Greek Orthodox Church is central to national identity, with vibrant celebrations like Easter uniting communities. These holidays are marked by joyous customs, rich with spiritual and cultural significance.",
      "A unique aspect of Greek religious festivities is the inclusion of locally produced olive oil, symbolizing purity and light. This cherished tradition ties the spiritual life of Greece to its rich agricultural heritage, highlighting the importance of olive oil in both daily life and religious rituals.",
      "The church also embraces modern technology and social media to connect with younger generations, ensuring the continuity of traditions. This harmonious blend of ancient customs and modern engagement underscores the enduring and evolving nature of Greek spirituality.",
    ],
    isOpen: false,
  },
  {
    title: "History",
    img: history,
    texts: [
      "Greece is undoubtedly the central country of the ancient world, and its history has had a significant impact on the development of human civilization over the centuries. Today's Greece preserves the cultural heritage left to it by its ancestors. This country is famous for its ancient architectural monuments, philosophical ideas, literary heritage and magnificent artificial creativity.",
      "It is from Greece that we know most of the sciences. Mathematics, philosophy, astronomy, medicine and many other fields of knowledge originated here, which formed the basis for modern science. The ancient buildings of Greece still amaze with their beauty and grandeur. The Acropolis in Athens, the ancient theater in Epidaurus, the temple of Olympian Zeus — all these monuments of ancient culture are not only historical heritage, but also inspiring examples of architectural craftsmanship.",
    ],
    isOpen: false,
  },
  {
    title: "Tourism",
    img: tourism,
    texts: [
      "Tourists flock to Greece to immerse themselves in its stunning natural beauty and luxurious experiences. One of the highlights of their visit is tasting the world-renowned Greek olive oil, a staple of the local cuisine. Visitors enjoy sampling this golden elixir at olive groves and traditional tavernas, often participating in olive oil tastings that reveal the rich flavors and centuries-old production methods. This gastronomic delight is a perfect introduction to Greece's culinary heritage.",
      "Beyond the culinary experiences, Greece offers unparalleled relaxation and adventure. Tourists can unwind in elegant villas overlooking the azure Aegean Sea or embark on private yacht tours exploring the picturesque islands. The combination of pristine beaches, crystal-clear waters, and luxurious accommodations provides an idyllic setting for a dream vacation. Whether soaking up the sun on a secluded beach or sailing through the scenic coastline, visitors to Greece find a perfect blend of leisure, luxury, and natural beauty.",
    ],
    isOpen: false,
  },
  {
    title: "Farming",
    img: farming,
    texts: [
      "Greece, with its ideal climate, fertile soil, and centuries-old cultivation traditions, rightfully holds the title of producing the finest olive oil. ",
      "Annually, it yields around 300,000 tons, placing it among the top global producers. Greek olive oil is renowned for its superior quality, marked by robust flavor, vibrant color, and high nutritional value. Produced mainly as extra virgin, it undergoes mechanical extraction without chemicals, preserving its natural taste and health benefits.",
      "Its unique terroir and diverse olive cultivars contribute to its richness in antioxidants and healthy fats, making Greek olive oil highly sought-after worldwide among chefs and food enthusiasts.",
      "This dedication to quality is why we're driven to share the best through Greek Legend, showcasing Greece's olive oil excellence to the world.",
    ],
    isOpen: false,
  },
  {
    title: "Modernity",
    img: modernity,
    texts: [
      "Modern Greece is a European country that actively keeps up with the times, combining a rich cultural heritage with advanced technologies and innovations. Many global companies choose Greece to open offices and develop their business projects due to the favorable economic climate and highly qualified specialists.",
      "The capital of Greece, Athens, is a dynamic center of culture, education and business. The headquarters of many local and international companies are located here, as well as higher education institutions and research centers that contribute to the intellectual development of the country.",
      "Greece is also known for its startup initiatives and digital technologies, which have been actively developing in recent years. Young entrepreneurs and innovators find support in Greece for their projects, which contributes to economic growth and draws the attention of the world community to the potential of this amazing country.",
    ],
    isOpen: false,
  },
]);
const activeCultureItem = ref(0);
function changeActiveCultureItem(index) {
  activeCultureItem.value = index;
}
function openCultureItem(index) {
  cultureList.value[index].isOpen = !cultureList.value[index].isOpen;
}
// FINAL SECTION //
const farmers = [
  {
    name: "Papadakis",
    link: "/papadakis",
  },
  {
    name: "Chatzigeorgiou",
    link: "/chatzigeorgiou",
  },
  {
    name: "Voutaktakis",
    link: "/voutaktakis",
  },
];
</script>

<style lang="scss">
@import "./index.scss";
</style>
