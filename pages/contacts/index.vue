<template>
  <main>
    <div class="map">
      <GoogleMap
        class="map-google"
        :api-key="apiKey"
        :center="center"
        :zoom="10"
        :disableDefaultUi="true"
        :styles="cusomization"
        region="en"
        language="en"
      >
        <template v-for="(marker, index) in markers" :key="index">
          <CustomMarker :options="marker">
            <Marker class="capacities-right-map-google-marker" />
          </CustomMarker>
        </template>
      </GoogleMap>
    </div>
    <div class="info">
      <div class="info__block" v-for="(item, index) in infoList" :key="index">
        <div class="info__block-title caption" v-if="item.title">
          {{ item.title }}
        </div>
        <div
          class="info__block-text"
          :class="{
            grotesk: item.isTextGrotesk,
            antique: !item.isTextGrotesk,
          }"
          v-html="item.text"
        ></div>
      </div>
      <div class="info__distribution">
        <div class="info__distribution-title caption">
          For distribution inquiries
        </div>
        <ul class="info__distribution-list antique">
          <li
            class="info__distribution-list-item"
            v-for="(item, index) in distribution"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import Marker from "@/components/common/marker/index.vue";
import { GoogleMap, CustomMarker } from "vue3-google-map";
import cusomization from "@/assets/contactsMap.json";
import { useHeaderStateStore } from "@/stores/headerState";
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStateStore = useIsDesktopStore();
const headerStateStore = useHeaderStateStore();
const center = ref({ lat: 35.091402, lng: 25.161928 });
const config = useRuntimeConfig();
const apiKey = config.public.maps;

onMounted(() => {
  headerStateStore.changeColorToWhite(false);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeLogoShow(true);
});
const markers = [{ position: { lat: 35.091402, lng: 25.161928 } }];
const infoList = [
  {
    title: "Office",
    text: "Tefeli, Heraklion, Crete, Greece, P.C. 70010",
    isTextGrotesk: true,
  },
  {
    text: "Telephone: <a href='tel:+306939508953' title='+306939508953'>+30 693 950 8953</a> <br />E’mail: info@greeklegend.gr",
    isTextGrotesk: false,
  },
  {
    text: "PR Depratement: pr@greeklegend.gr <br />CEO: ceo@greeklegend.gr<br />Purchasing and distribution: info@greeklegend.gr",
    isTextGrotesk: false,
  },
];
const distribution = [
  "USA: info-us@greeklegend.gr",
  "Israel: info-il@greeklegend.gr",
  "Switzerland: info-ch@greeklegend.gr",
  "Finland: info-fi@greeklegend.gr",
  "Germany: info-de@greeklegend.gr",
  "Poland: info-pl@greeklegend.gr",
  "China: info-ch@greeklegend.gr",
  "Russia: info-ru@greeklegend.gr",
  "Kazakhstan: info-kz@greeklegend.gr",
];
</script>

<style lang="scss" scoped>
@import "./contacts.scss";
</style>
