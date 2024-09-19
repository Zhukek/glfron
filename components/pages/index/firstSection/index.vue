<template>
  <section class="section first" ref="firstSection">
    <div class="first__title">
      <h1 class="first__title-h1">
        <img
          class="first__title-h1-img desktop"
          src="@/assets/imgs/oneLineLogo.svg"
          alt="Greek Legend"
        />
        <img
          class="first__title-h1-img mobile"
          src="@/assets/imgs/bigLogoBlack.svg"
          alt="Greek Legend"
        />
      </h1>
      <h3 class="first__title-h3 h2">
        {{ subtitle }}
      </h3>
    </div>
    <div class="first__basement">
      <p class="caption">{{ bottomTextBefore }}</p>
    </div>
    <div class="first__background">
      <img
        class="first__background-img"
        :src="firstBackground"
        alt="Olive branches"
      />
      <div class="first__background-title">
        <h2 class="first__background-title-h2 h2">{{ slogan }}</h2>
      </div>
      <p class="first__background-basement caption">{{ bottomTextAfter }}</p>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();

defineProps({
  subtitle: {
    type: String,
    required: true,
  },
  bottomTextBefore: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  bottomTextAfter: {
    type: String,
    required: true,
  },
  firstBackground: {
    type: String,
    required: true,
  },
});
const firstSection = ref(null);
onMounted(() => {
  animationFirst();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
  window.addEventListener("scroll", handleScroll);
});
let firstTL;
function animationFirst() {
  firstTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".first",
      scrub: true,
      pin: true,
      onUpdate: changeHeaderState,
    },
  });
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      firstTL
        .fromTo(
          ".first__background-img",
          {
            width: "26.04vw",
            height: "18.22vw",
          },
          {
            width: "100%",
            height: "100%",
            duration: 2.5,
            ease: "power1.inOut",
          }
        )
        .fromTo(
          ".first__background-img",
          {
            borderRadius: VwToPx(0.94),
          },
          {
            borderRadius: 0,
          }
        );
      firstTL.fromTo(
        ".first__background-title-h2",
        {
          y: VwToPx(2.2),
        },
        {
          y: 0,
          ease: "power3.out",
          duration: 2,
        }
      );
    },
    "(max-width: 767px)": function () {
      firstTL
        .fromTo(
          ".first__background-img",
          {
            scaleY: 0.34,
            scaleX: 0.35,
          },
          {
            scale: 1,
            duration: 2.5,
            ease: "power1.inOut",
          }
        )
        .fromTo(
          ".first__background-img",
          {
            borderRadius: VwToPx(2.67),
          },
          {
            borderRadius: 0,
          }
        );
      firstTL.fromTo(
        ".first__background-title-h2",
        {
          y: VwToPx(9.07),
        },
        {
          y: 0,
          ease: "power3.out",
          duration: 2,
        }
      );
    },
    all: function () {
      firstTL
        .fromTo(
          ".first__background-basement",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 2,
          }
        )
        .to(".first__background-basement", { duration: 5 });
    },
  });
}
function handleScroll() {
  if (window.pageYOffset > firstSection.value.offsetHeight * 2) {
    headerStateStore.changeCanHeaderChange(true);
    headerStateStore.changeColorToWhite(false);
    headerStateStore.changeLogoShow(true);
  } else if (window.pageYOffset > firstSection.value.offsetHeight) {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(true);
    headerStateStore.changeLogoShow(true);
  }
}
function changeHeaderState(self) {
  if (self.progress === 1) {
    return;
  }
  if (self.progress > 0.15) {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(true);
    headerStateStore.changeLogoShow(true);
  } else {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(false);
    headerStateStore.changeLogoShow(false);
  }
}
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  firstTL.kill();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
