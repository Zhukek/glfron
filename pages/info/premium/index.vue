<template>
  <section class="section main">
    <h1 class="main__h1 h1">
      Certificates for <br />
      — premium —
    </h1>
    <div class="main__wrapper">
      <img
        class="main__wrapper-img"
        src="@/assets/imgs/bottles/500mlBack.png"
        alt="Bottle"
      />
    </div>
  </section>
  <section class="section certificates section-margin">
    <h2 class="title h2-smallcaps">Certificates</h2>
    <div class="certificates__wrapper">
      <ul class="certificates__wrapper-list">
        <li
          class="certificates__wrapper-list-item"
          v-for="(certificate, index) in certificates"
          :key="index"
        >
          <div class="certificates__wrapper-list-item-left">
            <img
              class="certificates__wrapper-list-item-img"
              :src="certificate.img"
              :alt="certificate.title"
            />
            <div class="certificates__wrapper-list-item-left-content">
              <h6 class="certificates__wrapper-list-item-title greek-caption">
                {{ certificate.title }}
              </h6>
              <p class="certificates__wrapper-list-item-text antique">
                {{ certificate.text }}
              </p>
            </div>
          </div>

          <nuxt-link
            class="certificates__wrapper-list-item-btn caption"
            v-if="certificate.ancor"
            :to="localePath(certificate.link + '#' + certificate.ancor)"
            title="Read more about certification"
            >Read more about certification
          </nuxt-link>

          <a
            v-else
            class="certificates__wrapper-list-item-btn caption"
            :href="certificate.link"
            target="_blank"
            title="Read more about certification"
            >Read more about certification</a
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();

onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeCanHeaderChange(true);
  headerStateStore.changeColorToWhite(false);
});

import ioc from "@/assets/imgs/certificates/ioc.png";
import iris from "@/assets/imgs/certificates/iris.png";
import ifs from "@/assets/imgs/certificates/ifs.png";
import dimitra from "@/assets/imgs/certificates/dimitra.png";
import eco from "@/assets/imgs/certificates/eco.png";
import iso from "@/assets/imgs/certificates/iso.png";
import gl from "@/assets/imgs/certificates/gl.svg";

const certificates = [
  {
    title: "International Olive Council",
    img: ioc,
    link: "https://www.internationaloliveoil.org/",
    text: "The International Olive Council (IOC) is an intergovernmental organization of states that produce olives or products derived from olives, such as olive oil.",
  },
  {
    title: "IRIS Certificate",
    img: iris,
    link: "https://iriscertification.org/",
    text: "International standard for the development and implementation of a quality management system.",
  },
  {
    title: "International Featured Standard",
    img: ifs,
    link: "https://www.ifs-certification.com/en/about-ifs",
    text: "International standard for food quality and safety.",
  },
  {
    title: "Hellenic Agricultural Organisation DIMITRA",
    img: dimitra,
    link: "https://www.hermes4las.eu/hellenic-agricultural-organization-demeter/",
    text: "An organization that develops and modernizes the development of the Greek agricultural sector.",
  },
  {
    title: "Organic Food Organic Certification EU-Eco-regulation",
    img: eco,
    link: "https://organicsbestshop.com/blogs/organicsbestclub/europe-organic-certification#:~:text=The%20European%20Union%20Organic%20certification,stipulated%20rules%20by%20the%20EU",
    text: "European Union standard for organic agriculture.",
  },
  {
    title: "ISO Certificate",
    img: iso,
    link: "https://www.iso.org/certification.html",
    text: "An international standard that confirms the implementation and effective operation of an enterprise.",
  },
  {
    title: "Greek Legend Quality Certificate",
    img: gl,
    link: "/chatzigeorgiou",
    ancor: "accreditation",
    text: "Accreditation by the International Olive Council",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/certificates.scss";
</style>
