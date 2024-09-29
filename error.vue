<template>
  <AppHeader />
  <main class="error">
    <h1 class="error__title h1 pre-line">
      Error 404
      {{ isDesktopStore.isDesktop ? ". " : "\n" }}
      Page not found
    </h1>
    <div class="error__table">
      <nuxt-link class="error__table-item grotesk" :to="localePath('/')" title="Main page"
        >Main page</nuxt-link
      >
      <nuxt-link
        class="error__table-item grotesk"
        :to="localePath('/about')"
        title="About company"
        >About company</nuxt-link
      >
      <nuxt-link
        class="error__table-item grotesk"
        :to="localePath('/contacts')"
        title="Contacts"
        >Contacts</nuxt-link
      >
    </div>
  </main>
</template>
<script setup>
import AppHeader from "@/components/layouts/AppHeader/AppHeader.vue";
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
import { useHeaderStateStore } from "~/stores/headerState";
const headerStateStore = useHeaderStateStore();
onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(true);
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/error.scss";
</style>
