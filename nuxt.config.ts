export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
        htmlAttrs: {
            lang: 'ko'
        },
        meta: [
          { charset: 'utf-8' },
          { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css' },
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
  ],
  // imports: {
  //   dirs: ['./stores']
  // },
  
})
