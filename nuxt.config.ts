// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:8000/api",
    },
  },
  future: {
    compatibilityVersion: 4,
  },

  colorMode: {
    preference: "light",
  },

  experimental: {
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  image: {
    domains: ["https://cdn.dummyjson.com"],
  },

  devtools: { enabled: true },

  modules: ["@nuxt/icon", "@nuxtjs/google-fonts", "@nuxt/image", "@nuxt/ui"],

  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
});
