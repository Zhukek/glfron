<template>
  <section class="section capacities">
    <h2 class="title h2-smallcaps">Our capacities</h2>
    <div class="capacities__content desktop">
      <div class="capacities-left">
        <div class="capacities-left-factory">
          <div class="capacities-left-factory-p antique">
            Select a factory on the map or click on any name
          </div>

          <ul class="capacities-left-factory-list">
            <div
              class="capacities-left-factory-list-item caption"
              :class="{
                'capacities-left-factory-list-item-active':
                  factoriesList[index].isActive,
              }"
              @click="changeFactoryActiveIndex(index)"
              v-for="(item, index) in factoriesList"
            >
              ({{ index + 1 }}) {{ item.text }}
            </div>
          </ul>
        </div>
        <div class="capacities-left-info">
          <div class="capacities-left-info-left">
            <img
              class="capacities-left-info-img"
              :src="activeFactory.img"
              :alt="activeFactory.name"
            />
          </div>
          <div class="capacities-left-info-right">
            <div>
              <div class="capacities-left-info-name">
                <img
                  class="capacities-left-info-name-icon"
                  src="@/assets/imgs/drop.svg"
                />
                <div class="capacities-left-info-name-text pre-line caption">
                  {{ activeFactory.text }}
                </div>
              </div>
              <div class="capacities-left-info-text grotesk">
                {{ activeFactory.description }}
              </div>
            </div>

            <div class="capacities-left-info-owner">
              <h6 class="capacities-left-info-owner-title caption">
                The owner of the <br />factory
              </h6>
              <img
                class="capacities-left-info-owner-img"
                :src="activeFactory.owner.img"
                :alt="activeFactory.owner.name"
              />
              <p class="capacities-left-info-owner-name grotesk">
                {{ activeFactory.owner.name }}
              </p>
              <p class="capacities-left-info-owner-text antique">
                {{ activeFactory.owner.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="capacities-right">
        <div class="capacities-right-radio">
          <label
            v-for="(button, index) in factoriesButtons"
            :key="index"
            class="capacities-right-radio-btn caption"
            :class="{
              'capacities-right-radio-btn-active':
                factoryButtonActive === button,
            }"
            :for="button"
          >
            {{ button }}
            <input
              class="capacities-right-radio-input"
              type="radio"
              :id="button"
              :value="button"
              v-model="factoryButtonActive"
            />
          </label>
        </div>
        <div class="capacities-right-map">
          <img
            class="capacities-right-map-icon"
            src="@/assets/imgs/icon.svg"
            alt="Greek Legend"
          />
          <GoogleMap
            class="capacities-right-map-google"
            :api-key="apiKey"
            :center="{ lat: 35.23567, lng: 24.914848 }"
            :zoom="8.7"
            :disableDefaultUi="true"
            :styles="cusomization"
          >
            <template v-for="(marker, index) in factoriesList" :key="index">
              <CustomMarker
                :options="marker.option"
                v-if="marker.type === factoryButtonActive"
              >
                <Marker
                  class="capacities-right-map-google-marker"
                  :isActive="marker.isActive"
                  @click="changeFactoryActiveIndex(index)"
                />
              </CustomMarker>
            </template>
          </GoogleMap>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="capacities__content">
        <ul class="capacities__accordion">
          <li
            class="capacities__accordion-item"
            :class="{
              'capacities__accordion-item-active': factoriesList[index].isOpen,
            }"
            v-for="(item, index) in factoriesList"
            :key="index"
          >
            <p
              class="capacities__accordion-item-header caption"
              @click="openFactory(index)"
            >
              ({{ index + 1 }}) {{ item.text }}
            </p>
            <div
              class="capacities__accordion-item-content"
              ref="accordionItemContent"
              :style="{
                height: factoriesList[index].isOpen
                  ? factoriesList[index].height + 'vw'
                  : 0,
              }"
            >
              <img
                class="capacities__accordion-item-img"
                :src="factoriesList[index].img"
                :alt="factoriesList[index].name"
              />
              <div class="capacities__accordion-item-name">
                <img
                  class="capacities__accordion-item-name-img"
                  src="@/assets/imgs/drop.svg"
                  alt="drop icon"
                />
                <div
                  class="capacities__accordion-item-name-text caption pre-line"
                >
                  {{ factoriesList[index].text }}
                </div>
              </div>
              <div class="capacities__accordion-item-text grotesk">
                {{ factoriesList[index].description }}
              </div>
              <div class="capacities__accordion-item-owner">
                <div class="capacities__accordion-item-owner-title caption">
                  The owner of the factory
                </div>
                <img
                  class="capacities__accordion-item-owner-img"
                  :src="factoriesList[index].owner.img"
                  :alt="factoriesList[index].owner.name"
                />
                <div class="capacities__accordion-item-owner-name grotesk">
                  {{ factoriesList[index].owner.name }}
                </div>
                <div class="capacities__accordion-item-owner-text antique">
                  {{ factoriesList[index].owner.description }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script setup>
import Marker from "@/components/common/marker/index.vue";
import { GoogleMap, CustomMarker } from "vue3-google-map";
import cusomization from "@/assets/aboutMap.json";
const accordionItemContent = ref();
const config = useRuntimeConfig();
const apiKey = config.public.maps;
onMounted(() => {
  changeFactoryActiveIndex(0);
  accordionItemContent.value.forEach((item, index) => {
    factoriesList[index].height = pxToVw(item.scrollHeight) + 5.33;
  });
});

import ownerEvripidis from "@/assets/imgs/factories/factoryowner.webp";
import ownerChatzigeorgiou from "@/assets/imgs/families/chatzigeorgiou.webp";
import ownerVoutaktakis from "@/assets/imgs/families/voutaktakis.webp";

import factoryEvripidis from "@/assets/imgs/factories/factoryEvripidis.webp";
import factoryChatzigeorgiou from "@/assets/imgs/factories/factoryChatzigeorgiou.webp";
import factoryVoutaktakis from "@/assets/imgs/factories/factoryVoutaktakis.webp";

const factoriesList = reactive([
  {
    text: "Voutaktakis Giannis \nOlive oil Mil",
    isActive: false,
    isOpen: false,
    type: "Olive pressing",
    option: { position: { lat: 35.096, lng: 25.198667 } },
    description:
      "Since 1995, we have been primarily producing olive oil for ourselves and our family, infusing it with love for our craft and respect for traditions.",
    img: factoryVoutaktakis,
    owner: {
      img: ownerVoutaktakis,
      name: "Voutaktakis Giannis",
      description:
        "We use only traditional methods, including cold pressing, without the use of hot water and chemicals.",
    },
  },
  {
    text: "P. CHATZIGEORGIOU O.E. Olive oil mil",
    isActive: false,
    isOpen: false,
    type: "Olive pressing",
    option: { position: { lat: 35.276228, lng: 25.272519 } },
    description:
      "My family has been involved in olive oil production since 1926. It's a tradition and experience passed down from generation to generation.",
    img: factoryChatzigeorgiou,
    owner: {
      img: ownerChatzigeorgiou,
      name: "Chatzigeorgiou Dimos",
      description:
        "Our traditions include passing practices from father to son, and we're now the third generation producing olive oil.",
    },
  },
  {
    text: "THE EVRIPIDIS \nCOMPANY S.A.",
    isActive: false,
    isOpen: false,
    type: "Olive oil Bottling",
    option: { position: { lat: 35.01163885867966, lng: 24.933141195290414 } },
    description:
      "Established in 1969, the company underwent major changes, including a name change to EVRIPIDIS S.A.",
    img: factoryEvripidis,
    owner: {
      img: ownerEvripidis,
      name: "Manolis Melabianakis",
      description:
        "For thousands of years, Crete has been known as a garden full of delicious fruits, vegetables and one of the finest olive oils in the world.",
    },
  },
]);
const factoryButtonActive = ref("Olive pressing");
const factoriesButtons = ["Olive pressing", "Olive oil Bottling"];
const activeFactory = ref(factoriesList[0]);
function changeFactoryActiveIndex(index) {
  factoriesList.forEach((item) => {
    item.isActive = false;
  });
  factoriesList[index].isActive = true;
  if (factoriesList[index].type === "Olive pressing") {
    factoryButtonActive.value = "Olive pressing";
  } else {
    factoryButtonActive.value = "Olive oil Bottling";
  }
  activeFactory.value = factoriesList[index];
}

function openFactory(index) {
  factoriesList[index].isOpen = !factoriesList[index].isOpen;
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
