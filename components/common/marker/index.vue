<template>
  <svg
    class="marker"
    width="19"
    height="27"
    viewBox="0 0 19 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.50706 27L18.2412 11.9498C18.7383 11.0804 19 10.0942 19 9.09031C19 8.08641 18.7383 7.1002 18.2412 6.23079L16.3334 2.85952C15.8354 1.99455 15.1225 1.27579 14.2651 0.77428C13.4077 0.272771 12.4355 0.0058836 11.4447 1.24684e-06L7.59926 9.10664e-07C6.60842 0.00588309 5.63624 0.272771 4.77885 0.774279C3.92145 1.27579 3.20853 1.99455 2.71053 2.85952L0.77289 6.23079C0.266868 7.09712 -2.53705e-07 8.08452 -3.41634e-07 9.09031C-4.29563e-07 10.0961 0.266868 11.0835 0.772889 11.9498L9.50706 27Z"
      class="marker-path"
      :class="{
        'marker-path-active': isActive,
      }"
    />
  </svg>
</template>
<script setup>
const props = defineProps({
  isActive: { type: Boolean, require: true },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
