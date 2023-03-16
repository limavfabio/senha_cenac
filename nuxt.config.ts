// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "nuxt-windicss", "@vite-pwa/nuxt"],
  pwa: {
    // PWA options
    registerType: "autoUpdate",
    devOptions: {
      enabled: false,
    },
  },
  typescript: {
    strict: true,
  },
});
