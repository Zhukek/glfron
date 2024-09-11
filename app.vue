<template>
  <div id="root">
    <AppHeader />
    <!-- <Preloader /> -->
    <NuxtPage />
    <AppFooter v-if="!isFooterShow" />
  </div>
</template>

<script setup>
import AppFooter from "@/components/layouts/AppFooter/AppFooter.vue";
import AppHeader from "@/components/layouts/AppHeader/AppHeader.vue";
// import Preloader from "@/components/layouts/Preloader/index.vue";
import Lenis from "@studio-freight/lenis";
import { useIsPopupOpen } from "@/stores/isPopupOpen";
const isPopupOpenStore = useIsPopupOpen();
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useRouter } from "vue-router";
const router = useRouter();

import { noFooterPages } from "@/constants/noFooterPages.js";

const isFooterShow = computed(() => {
  return noFooterPages.includes(page.value);
});
import { whitePages } from "@/constants/whitePages.js";
const page = computed(() => {
  return router.currentRoute.value.fullPath;
});

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });
  if (window) {
    requestAnimationFrame(raf);
  }
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
});
watch(
  () => isPopupOpenStore.getIsPopupOpen,
  (isOpen) => handleScroll(isOpen)
);
watch(
  () => headerStateStore.getIsOpen,
  (isOpen) => handleScroll(isOpen)
);
function handleScroll(isOpen) {
  if (isOpen) {
    document.getElementById("root").setAttribute("data-lenis-prevent", "true");
  } else {
    document.getElementById("root").removeAttribute("data-lenis-prevent");
  }
  document.documentElement.classList.toggle("no-scroll");
}
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});
useHead({
  bodyAttrs: {
    class: computed(() => {
      return whitePages.includes(page.value)
        ? "background-white"
        : "background-beige";
    }),
  },
});
</script>
