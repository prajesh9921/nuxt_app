// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['nuxt-icons', "@nuxt/icon", "@nuxt/fonts"],
  devtools: { enabled: true },
  nitro: {
    plugins: ["~/server/index.ts"]
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },
  css: ["~/assets/css/app.css"],
})