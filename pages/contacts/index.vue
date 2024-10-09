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
          class="info__block-text pre-line"
          :class="{
            grotesk: item.title,
            antique: !item.title,
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
            :key="index"
          >
            {{ item.country + ": " + item.email }}
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
const headerStateStore = useHeaderStateStore();
const center = ref({ lat: 35.091402, lng: 25.161928 });

const config = useRuntimeConfig();
const { locale } = useI18n();
const apiKey = config.public.maps;
const API_ROUTE = config.public.api_route;

const { data } = await useAsyncData("contacts-page", () =>
  $fetch(API_ROUTE + `/api/contact?populate=deep&locale=${locale.value}`),
  {
    watch: [locale]
  }
);
const response = data.value.data.attributes;
const markers = [{ position: { lat: 35.091402, lng: 25.161928 } }];

const distribution = [];
response.countries.forEach((country) => {
  const item = {
    country: country.countryName,
    email: country.countryEmail,
  };
  distribution.push(item);
});
const phone = response.phone;
const email = response.email;
const officeAddress = response.officeAddress;
const departments = [];
response.departments.forEach((department) => {
  const item = {
    text: department.row,
  };
  departments.push(item);
});
const infoList = [
  {
    title: "Office",
    text: officeAddress,
  },
  {
    text: `Telephone: <a href='tel:${deleteSpaces(
      phone
    )}' title='${deleteSpaces(phone)}'>${phone}</a> <br />E’mail: ${email}`,
  },
  {
    text: "",
  },
];
infoList[2].text = departments.map((item) => item.text).join("\n");
function deleteSpaces(str) {
  return str.replace(/\s+/g, "");
}
onMounted(() => {
  headerStateStore.changeColorToWhite(false);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeLogoShow(true);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
