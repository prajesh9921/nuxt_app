// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    plugins: ["~/server/index.ts"]
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },
})
