<template>
  <section class="section capacities">
    <h2 class="title h2-smallcaps">Our capacities</h2>
    <div class="capacities__content desktop">
      <div class="capacities-left">
        <div class="capacities-left-factory">
          <div class="capacities-left-factory-p antique">
            {{ hint }}
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
              :src="factoriesList[activeFactoryIndex].img"
              :alt="factoriesList[activeFactoryIndex].name"
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
                  {{ factoriesList[activeFactoryIndex].text }}
                </div>
              </div>
              <div class="capacities-left-info-text grotesk">
                {{ factoriesList[activeFactoryIndex].description }}
              </div>
            </div>

            <div class="capacities-left-info-owner">
              <h6 class="capacities-left-info-owner-title pre-line caption">
                {{ captionAboveOwnerPhoto }}
              </h6>
              <img
                class="capacities-left-info-owner-img"
                :src="factoriesList[activeFactoryIndex].owner.img"
                :alt="factoriesList[activeFactoryIndex].owner.name"
              />
              <p class="capacities-left-info-owner-name grotesk">
                {{ factoriesList[activeFactoryIndex].owner.name }}
              </p>
              <p class="capacities-left-info-owner-text antique">
                {{ factoriesList[activeFactoryIndex].owner.description }}
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
                  {{ captionAboveOwnerPhoto }}
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

onMounted(() => {
  changeFactoryActiveIndex(0);
  accordionItemContent.value.forEach((item, index) => {
    factoriesList.value[index].height = pxToVw(item.scrollHeight) + 5.33;
  });
});
const props = defineProps({
  hint: {
    type: String,
    required: true,
  },
  factoriesListProp: {
    type: Array,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  captionAboveOwnerPhoto: {
    type: String,
    required: true,
  },
});
const factoriesList = ref(props.factoriesListProp);
const factoryButtonActive = ref("Olive pressing");
const factoriesButtons = ["Olive pressing", "Olive oil bottling"];
const activeFactoryIndex = ref(0);
function changeFactoryActiveIndex(index) {
  factoriesList.value.forEach((item) => {
    item.isActive = false;
  });
  factoriesList.value[index].isActive = true;
  if (factoriesList.value[index].type === "Olive pressing") {
    factoryButtonActive.value = "Olive pressing";
  } else {
    factoryButtonActive.value = "Olive oil bottling";
  }
  activeFactoryIndex.value = index;
}

function openFactory(index) {
  factoriesList.value[index].isOpen = !factoriesList.value[index].isOpen;
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
