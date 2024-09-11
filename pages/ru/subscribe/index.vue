<template>
  <div class="background"></div>

  <div class="subscribe">
    <div class="subscribe-hero">
      <img
        class="subscribe-hero-img"
        src="@/assets/imgs/bottles2.svg"
        alt="Bottles"
      />
      <h2 class="subscribe-hero-title h2">
        Sorry, we are not working <br v-if="isDesktopStore.getIsDesktop" />
        in your country yet
      </h2>
      <p class="subscribe-hero-text antique">
        You can subscribe to our newsletter to receive notifications
        <br v-if="isDesktopStore.getIsDesktop" />
        when we start working in your country.
      </p>
    </div>
    <form
      action="https://greeklegend.us22.list-manage.com/subscribe/post?u=3ddad285f98c98914f6327fed&amp;id=5b97e958ed&amp;f_id=00aec6e1f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="subscribe-form"
      target="_blank"
      @submit="changeCliked"
    >
      <input
        type="email"
        name="EMAIL"
        class="subscribe-form-input caption"
        id="mce-EMAIL"
        required=""
        :placeholder="
          isDesktopStore.isDesktop
            ? `Write your e'mail to subscribe the news`
            : `E'mail to subscribe the news`
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

      <hr class="subscribe-form-hr" />
      <div class="subscribe-form-wrap">
        <button
          v-show="isEmailValid"
          class="subscribe-form-wrap-btn caption"
          type="submit"
          v-if="!isClicked"
        >
          Subscribe to the newsletter
        </button>
        <div class="subscribe-form-wrap-ready caption" v-else>
          You have subscribed to the newsletter
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

const email = ref("");
const regEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const isEmailValid = computed(() => {
  return regEmail.test(email.value);
});
const isClicked = ref(false);
function changeCliked() {
  isClicked.value = true;
}
onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(true);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
