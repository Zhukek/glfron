<template>
  <div class="card">
    <div class="card-front" @click="openPopup">
      <div class="card-front__title">
        <img class="card-front__title-img" :src="iconWhite" :alt="title" />

        <h6 class="card-front__title-h6 caption">{{ title }}</h6>
      </div>
      <div class="card-front__text greek-caption">
        {{ text }}
      </div>
      <div class="card-front__basement antique">
        Hover over the card for more information
      </div>
    </div>
    <div class="card-back desktop">
      <div class="card-back-row">
        <img class="card-back__img" :src="reversedImg" :alt="reversedTitle" />
        <p class="card-back__title caption">{{ reversedTitle }}</p>
      </div>

      <div class="card-back__text antique">
        {{ reversedText }}
      </div>
    </div>
    <ClientOnly>
      <Teleport to="#root">
        <div class="card-popup mobile" v-show="popupIsOpen">
          <div class="card-popup__close" @click="closePopup">
            <svg
              class="card-popup__close-img"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21"
                stroke="#2C2C2C"
              />
            </svg>
          </div>
          <div class="card-popup__icon">
            <img class="card-popup__icon-img" :src="iconBrown" :alt="title" />
            <h6 class="card-popup__icon-h6 caption">{{ title }}</h6>
          </div>
          <p class="card-popup__text greek-caption">{{ text }}</p>
          <div class="card-popup__content">
            <div class="card-popup__content-row">
              <img
                class="card-popup__content-row-img"
                :src="reversedImg"
                :alt="reversedTitle"
              />
              <h5
                class="card-popup__content-row-title caption pre-line"
                :style="{ 'margin-top': lastChild ? '2.933vw' : 0 }"
              >
                {{ reversedTitle }}
              </h5>
            </div>
            <p class="card-popup__content-text antique">{{ reversedText }}</p>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>
<script setup>
import { useIsPopupOpen } from "@/stores/isPopupOpen";
const isPopupOpenStore = useIsPopupOpen();

const props = defineProps({
  title: { type: String, require: true },
  text: { type: String, require: true },
  iconWhite: { type: String, require: true },
  iconBrown: { type: String, require: true },
  reversedTitle: { type: String, require: true },
  reversedImg: { type: String, require: true },
  reversedText: { type: String, require: true },
  customClass: { type: String, default: "" },
  lastChild: { type: Boolean, default: false },
});

const popupIsOpen = ref(false);
function openPopup() {
  popupIsOpen.value = true;
  isPopupOpenStore.changeIsPopupOpen(true);
}
function closePopup() {
  popupIsOpen.value = false;
  isPopupOpenStore.changeIsPopupOpen(false);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
