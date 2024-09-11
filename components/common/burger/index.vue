<template>
  <Transition>
    <svg
      v-if="isBurger"
      class="burger"
      width="30"
      height="9"
      viewBox="0 0 30 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.5" x2="30" y2="0.5" :stroke="color" />
      <line y1="8.5" x2="30" y2="8.5" :stroke="color" />
    </svg>
  </Transition>
  <Transition>
    <svg
      v-if="!isBurger"
      class="x"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21" stroke="#2C2C2C" />
    </svg>
  </Transition>
</template>
<script setup>
const props = defineProps({
  color: { type: String, default: "white" },
  isBurger: { type: Boolean, default: true },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
