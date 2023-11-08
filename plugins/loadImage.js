
export default defineNuxtPlugin ({
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        if (process.server) {
          resolve()
          return
        }
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve()
        })
      })
    }
  }
})