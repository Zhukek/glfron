<template>
  <header
    class="header"
    :class="{
      'header-hide': !isHeaderShow && !isHeaderOpen && !onTop,
      'header-white': headerStateStore.getCanHeaderChange && getWhiteHeader,
      'header-beige':
        headerStateStore.getCanHeaderChange && !getWhiteHeader && !isHeaderOpen,
      'header-black':
        router.currentRoute.value.name === 'privacy-policy' && !isHeaderOpen,
      delay: isHeaderClosing,
    }"
  >
    <button
      ref="button"
      class="header__menu"
      :class="{
        white: isWhite,
        black: !isWhite || isHeaderOpen,
        link: isDesktopStore.getIsDesktop,
      }"
      @click="openMenu"
    >
      <span class="desktop">{{ getHeaderMenu }}</span>
      <burger :color="getLogoColor" :isBurger="!isHeaderOpen" />
    </button>
    <template v-if="isMounted">
      <Transition>
        <div
          class="header__logo"
          :style="{
            'transition-delay': isHeaderOpen ? '1s' : '0s',
          }"
          v-if="headerStateStore.getIsLogoShow || isHeaderOpen"
        >
          <nuxt-link :to="localePath('/')">
            <smallLogo class="header__logo-img" :color="getLogoColor" />
          </nuxt-link>
        </div>
      </Transition>
    </template>

    <div class="header__wrapper">
      <div
        class="header__temperature link desktop"
        :class="{
          white: isWhite,
          black: !isWhite || isHeaderOpen,
          link: isDesktopStore.getIsDesktop,
        }"
        v-if="temperatureCelsius"
      >
        {{ temperature }}
      </div>
      <button
        type="button"
        class="header__menu-language"
        :class="{
          white: isWhite,
          black: !isWhite || isHeaderOpen,
          link: isDesktopStore.getIsDesktop,
        }"
        @click="openLanguage"
      >
        {{ isDesktop ? "Language" : locale}}
      </button>
    </div>
  </header>
  <Transition name="header" @enter="onEnter" @leave="onEnter">
    <div class="header__open" v-show="isHeaderOpen">
      <Transition @after-enter="onAfterEnter" @after-leave="onAfterEnter">
        <div class="header__open-wrapper" v-if="isHeaderOpen">
          <div class="header__open-">
            <img
              class="header__open--img"
              :src="menuItems[0].items[activeImg].img"
              alt=""
            />
          </div>
          <div class="header__open-menu">
            <div
              class="header__open-menu-el"
              v-for="(menu, i) in menuItems"
              :key="i"
            >
              <h6 class="header__open-menu-el-title caption">
                {{ menu.title }}
              </h6>
              <ul class="header__open-menu-el-list">
                <li
                  v-for="(item, j) in menu.items"
                  :key="j"
                  class="header__open-menu-el-list-item"
                  @mouseenter="changeActiveImg(i === 0 ? j : null)"
                  :class="{
                    h2: menu.isBig,
                    grotesk: !menu.isBig,
                  }"
                >
                  <nuxt-link
                    class="header__open-menu-el-list-item-link"
                    v-if="!item.isDisable"
                    :to="localePath(item.link)"
                  >
                    {{ item.text }}
                  </nuxt-link>
                  <span
                    class="header__open-menu-el-list-item-span"
                    v-if="item.isDisable"
                  >
                    {{ item.text }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="header__open-temperature mobile link">
            {{ temperature }}
          </div>
        </div>
      </Transition>
    </div>
  </Transition>

  <Transition name="language" @enter="onEnter" @leave="onEnter">
    <div class="header__language" v-show="isLanguageOpen">
      <Transition @after-enter="onAfterEnter" @after-leave="onAfterEnter">
        <div class="header__language-list" v-if="isLanguageOpen">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="header__language-item"
          >
            {{ locale.name }}
          </nuxt-link>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import smallLogo from "@/components/common/smallLogo.vue";
import burger from "~/components/common/burger/index.vue";

import { useHeaderStateStore } from "~/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "~/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

// Header settings (color, position) //
const isHeaderShow = ref(true);
const isWhite = computed(() => headerStateStore.getIsColorWhite);
const isHeaderOpen = computed(() => headerStateStore.getIsOpen);
const isLanguageOpen = computed(() => headerStateStore.getIsLanguageOpen);
const isDesktop = computed(() => isDesktopStore.getIsDesktop);
const lastScroll = ref(0);
const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const onTop = ref(true);
const isHeaderClosing = ref(false);
watch(isHeaderOpen, (newValue) => {
  if (!newValue) {
    isHeaderClosing.value = true;
  }
  setTimeout(() => {
    isHeaderClosing.value = false;
  }, 1700);
});

const getLogoColor = computed(() => {
  if (isWhite.value && !isHeaderOpen.value) {
    return "white";
  }
  return "#2C2C2C";
});
import { whitePages } from "@/constants/whitePages";
const getWhiteHeader = computed(() => {
  return whitePages.includes(router.currentRoute.value.fullPath);
});
// MENU //
import { useRouter } from "vue-router";
const router = useRouter();
const button = ref(null);
const isButtonDisable = ref(false);
router.afterEach(() => {
  headerStateStore.closeHeader();
});
function onEnter() {
  isButtonDisable.value = true;
}
function onAfterEnter() {
  isButtonDisable.value = false;
}
function openMenu() {
  if (isButtonDisable.value) {
    return;
  }
  if (headerStateStore.getIsOpen) {
    headerStateStore.closeHeader();
  } else {
    headerStateStore.openHeader();
  }
}
function openLanguage() {
  if (isButtonDisable.value) {
    return;
  }
  if (headerStateStore.getIsLanguageOpen) {
    headerStateStore.closeLanguage();
  } else {
    headerStateStore.openLanguage();
  }
}
const getHeaderMenu = computed(() => {
  return isHeaderOpen.value ? "Close menu" : "Menu";
});

const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;

const { data: dataHeader } = await useAsyncData("header-menu", () =>
  $fetch(API_ROUTE + "/api/header-menu?populate=deep")
);

//I18 locales//

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value);
})

watch(locale, () => {
  if (headerStateStore.getIsLanguageOpen) {
    headerStateStore.closeLanguage();
  }
  window.location.reload()
})

// MENU ITEMS //
const response = dataHeader.value.data.attributes;
const premiumChatzigeorgiou =
  API_ROUTE + response.chatzigeorgiouBottleImg.data.attributes.url;
const premiumVoutaktakis =
  API_ROUTE + response.voutaktakisBottleImg.data.attributes.url;
const premiumPapadakis =
  API_ROUTE + response.papadakisBottleImg.data.attributes.url;
const menuItems = [
  {
    title: "Families",
    isBig: true,
    items: [
      {
        text: "Chatzigeorgiou",
        link: "/chatzigeorgiou",
        isDisable: false,
        img: premiumChatzigeorgiou,
      },
      {
        text: "Voutaktakis",
        link: "/voutaktakis",
        isDisable: false,
        img: premiumVoutaktakis,
      },
      {
        text: "Papadakis",
        link: "/papadakis",
        isDisable: false,
        img: premiumPapadakis,
      },
    ],
  },
  {
    title: "Company",
    isBig: false,
    items: [
      { text: "About", link: "/about", isDisable: false },
      { text: "Certificates", link: "/info/premium", isDisable: false },
    ],
  },
  {
    title: "Information",
    isBig: false,
    items: [
      {
        text: "Media",
        link: "/privacy-policy",
        isDisable: true,
      },
      { text: "Greek Essence", link: "/essence" },
      {
        text: "Contacts",
        link: "/contacts",
        isDisable: false,
      },
    ],
  },
];
const activeImg = ref(0);
function changeActiveImg(index) {
  if (Number.isInteger(index)) {
    activeImg.value = index;
  }
}
// TEMPERATURE //
const weatherApiKey = config.public.wheather;
const { data: dataWeather } = await useAsyncData("wheather", () =>
  $fetch(
    `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=Heraklion&aqi=no`
  )
);
const temperatureCelsius = Math.round(dataWeather.value?.current.temp_c);
const temperature =
  (temperatureCelsius > 0 ? "+" : "") + temperatureCelsius + "°C in Heraklion";

const isMounted = ref(false);
onMounted(() => {
  window.addEventListener("scroll", handleScrollPosition);
  changeIsDesktop();
  window.addEventListener("resize", changeIsDesktop);
  isMounted.value = true;
});
function changeIsDesktop() {
  if (window.innerWidth > 769) {
    isDesktopStore.changeIsDesktop(true);
  } else {
    isDesktopStore.changeIsDesktop(false);
  }
}
function handleScrollPosition() {
  onTop.value = scrollPosition() <= 0;
  if (scrollPosition() < lastScroll.value) {
    isHeaderShow.value = true;
  } else if (headerStateStore.getCanHeaderChange) {
    isHeaderShow.value = false;
  }
  lastScroll.value = scrollPosition();
}
</script>

<style lang="scss" scoped>
@import "./AppHeader.scss";
</style>
