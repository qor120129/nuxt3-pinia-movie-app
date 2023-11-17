
// export default defineNuxtPlugin ({
//   install(app) {
//     app.config.globalProperties.$loadImage = key => {
//       return new Promise(resolve => {
//         if (process.server) {
//           resolve()
//           return
//         }
//         const img = document.createElement('img')
//         img.src = key
//         img.addEventListener('load', () => {
//           resolve()
//         })
//       })
//     }
//   }
// })

export default defineNuxtPlugin(()=>{
  return {
    parallel: true,
    provide: {
      loadImage: (key) => {
        return new Promise(resolve => {
          const img = document.createElement('img')
          img.src = key
          img.addEventListener('load', () => {
            resolve()
          })
        })
      }
    }
  }
})