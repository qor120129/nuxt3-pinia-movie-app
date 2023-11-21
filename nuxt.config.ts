const { CLIENT_URL } = process.env


export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
        title: 'Nuxt Movie App',
        htmlAttrs: {
            lang: 'ko'
        },
        meta: [
          { charset: 'utf-8' },
          { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' },
          { hid: 'og:type', property: 'og:type', content: 'website' },
          { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
          { hid: 'og:title', property: 'og:title', content: 'Nuxt Movie App' },
          { hid: 'og:description', property: 'og:description', content: 'The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.' },
          { hid: 'og:image', property: 'og:image', content: 'https://raw.githubusercontent.com/qor120129/vue3-movie-app/master/src/assets/logo.png' },
          { hid: 'og:image', property: 'og:url', content:CLIENT_URL },
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css' },
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap' },
        ]
    }
  },
  css: ["@/assets/css/main.css"],
  vite: {
    css: {
      preprocessorOptions: {        
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;'
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    "nuxt-lodash"
  ],

})
