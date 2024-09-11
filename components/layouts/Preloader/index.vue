<template>
  <div id="loading">{{ progress ? progress : 0 }}%</div>
</template>

<script setup>
const delay = 15;
const imgsLoaded = ref(0);
const totalImgs = ref(0);
function setProgress(total) {
  imgsLoaded.value++;
  totalImgs.value = total;
}
const progress = computed(() => {
  return Math.min(Math.floor((imgsLoaded.value / totalImgs.value) * 100), 100);
});
onMounted(async () => {
  const images = document.querySelectorAll("*");
  for (const img of images) {
    await new Promise((resolve) => {
      if (img.complete) {
        setProgress(images.length);
        resolve();
      } else {
        img.onload = () => {
          setProgress(images.length);
          resolve();
        };
      }
    });
    await new Promise((resolve) => setTimeout(resolve), delay);
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
