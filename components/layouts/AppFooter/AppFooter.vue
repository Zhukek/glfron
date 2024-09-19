<template>
  <footer class="footer">
    <div class="footer__heading">
      <div class="footer__title">
        <div class="footer__title-h1">
          <img
            class="footer__title-h1-img desktop"
            src="@/assets/imgs/oneLineLogo.svg"
            alt="Greek Legend"
          />
          <img
            class="footer__title-h1-img mobile"
            src="@/assets/imgs/bigLogoBlack.svg"
            alt="Greek Legend"
          />
        </div>
        <h2 class="footer__title-h2 h2">
          {{ subtitle }}
        </h2>
      </div>

      <div class="footer__hr">
        <form
          action="https://greeklegend.us22.list-manage.com/subscribe/post?u=3ddad285f98c98914f6327fed&amp;id=5b97e958ed&amp;f_id=00aec6e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="footer__hr-form"
          target="_blank"
          @submit="changeCliked"
        >
          <input
            type="email"
            name="EMAIL"
            class="footer__hr-form-input caption"
            id="mce-EMAIL"
            required=""
            :placeholder="
              isDesktopStore.isDesktop ? emailHint : emailHintMobile
            "
            v-model="email"
          />
          <div aria-hidden="true" style="position: absolute; left: -5000px">
            <input
              type="text"
              name="b_3ddad285f98c98914f6327fed_5b97e958ed"
              tabindex="-1"
              value=""
            />
          </div>

          <hr class="footer__hr-item" />
          <button
            v-show="isEmailValid"
            class="footer__hr-form-btn caption"
            type="submit"
            v-if="!isClicked"
          >
            Subscribe to the newsletter
          </button>
          <div class="footer__hr-form-ready caption" v-else>
            You have subscribed to the newsletter
          </div>
        </form>
      </div>
    </div>
    <div class="footer__basement">
      <div class="footer__developed">
        <a
          class="footer__developed-link antique"
          :href="officeAddressLink"
          target="_blank"
          :title="officeAddress"
        >
          {{ officeAddress }}
        </a>
      </div>
      <div class="footer__legend footer__block">
        <h6 class="footer__block-h6 caption">Legend</h6>
        <p class="footer__block-p antique">
          {{ copyright }} <br />
          <nuxt-link to="/privacy-policy" title="Privacy Policy">
            Privacy Policy
          </nuxt-link>
        </p>
      </div>
      <div class="footer__socials footer__block">
        <h6 class="footer__block-h6 caption">Socials</h6>
        <p class="footer__block-p antique">
          <a target="_blank" href="https://t.me/greeklegend" title="Telegram"
            >Telegram</a
          >
          —
          <a
            target="_blank"
            href="https://www.facebook.com/GreekLegendGlobal/"
            title="Facebook"
            >Facebook</a
          >
          —
          <a
            target="_blank"
            href="https://www.linkedin.com/company/greeklegend"
            title="LinkedIn"
            >LinkedIn
          </a>
          <br />
          <a href="mailto:info@greeklegend.gr" title="info@greeklegend.gr"
            >info@greeklegend.gr</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

const config = useRuntimeConfig();
const API_ROUTE = config.public.api_route;

const { data } = await useAsyncData("footer", () =>
  $fetch(API_ROUTE + "/api/footer?populate=deep")
);
const response = data.value.data.attributes;

const subtitle = response.subtitle;
const emailHint = response.emailHint;
const emailHintMobile = response.emailHintMobile;
const officeAddress = response.officeAddress;
const officeAddressLink = response.officeAddressLink;
const copyright = response.copyright;

// Subscribe //
const email = ref("");
const regEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const isEmailValid = computed(() => {
  return regEmail.test(email.value);
});
const isClicked = ref(false);
function changeCliked() {
  isClicked.value = true;
}
</script>
<style lang="scss" scoped>
@import "./AppFooter.scss";
</style>
