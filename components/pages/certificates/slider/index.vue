<template>
  <div class="awards__arrows">
    <div class="awards__arrows-arrow">
      <img
        class="awards__arrows-arrow-img"
        src="@/assets/imgs/arrow.svg"
        alt="arrow"
        @click="activeElement--"
      />
    </div>
    <div class="awards__arrows-text caption">{{ activeElement }}/21</div>
    <div class="awards__arrows-arrow">
      <img
        class="awards__arrows-arrow-img"
        src="@/assets/imgs/arrow.svg"
        alt="arrow"
        @click="activeElement++"
      />
    </div>
  </div>
  <div class="awards__slider">
    <div
      class="awards__slider-item"
      v-for="(award, index) in awards"
      :key="index"
    >
      <div class="awards__slider-item-container">
        <img
          class="awards__slider-item-container-img"
          :src="award.img"
          :alt="award.subtitle"
        />
      </div>
      <div class="awards__slider-item-year caption">{{ award.year }}</div>
      <div class="awards__slider-item-title greek-caption">
        {{ award.title }}
      </div>
      <div class="awards__slider-item-subtitle caption pre-line">
        {{ award.subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  awards: { type: Array, require: true },
});
const activeElement = ref(0);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
