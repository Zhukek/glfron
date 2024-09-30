// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ["~/assets/styles/index.scss", "~/assets/fonts/style.scss"],
  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    public: {
      maps: process.env.MAPS_KEY,
      wheather: process.env.WHEATHER_KEY,
      api_route: process.env.API_ROUTE,
    },
  },

  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
      {
        code: "ru",
        iso: "ru-RU",
        name: "Русский",
      },
      {
        code: "pl",
        iso: "pl-PL",
        name: "Polski",
      }
    ],
    strategy: "prefix",
    defaultLocale: "en",
    //detectBrowserLanguage: {
    //  useCookie: true,
    //  cookieKey: "i18n_redirected",
    //  redirectOn: "root",
    //},
  },
  app: {
    head: {
      title: "Greek Legend | Extra Virgin Olive Oil",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Extra Virgin Olive Oil form Greece. Olive oil the Greeks choose themselves.",
        },
        {
          name: "keywords",
          content:
            "Greek Legend, Greek Legend Olive Oil, Greek Legend Greece, Greek Legend web, Premium Olive Oil, Greece Premium Olive Oil",
        },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "og:title",
          property: "og:title",
          content: "Greek Legend | Extra Virgin Olive Oil",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Premium Olive oil the Greeks choose themselves.",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        { hid: "og:image", property: "og:image", content: "/og.jpg" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://greeklegend.gr/",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:domain",
          property: "twitter:domain",
          content: "greeklegend.gr",
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: "https://greeklegend.gr/",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Greek Legend | Extra Virgin Olive Oil",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Premium Olive oil the Greeks choose themselves.",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/og.jpg",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon32x32.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          type: "image/png",
          href: "/favicon120x120.png",
        },
        {
          rel: "icon",
          sizes: "16x16",
          type: "image/x-icon",
          href: "/favicon16x16.ico",
        },
      ],
    },
  },
});
