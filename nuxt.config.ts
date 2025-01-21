// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
  ],
  nitro: {
    prerender: {
      autoSubfolderIndex: true
    }
  },
  runtimeConfig: {
    apiProductCatalogUrl: '/api/mock/catalog',
    apiProductCatalogIdKey: 'code',
  }
})
