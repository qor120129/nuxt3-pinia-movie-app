export default defineNuxtPlugin(()=>{
  return {
    parallel: true,
    provide: {
      loadImage: (key) => {
        return new Promise(resolve => {
          if(process.server){
            resolve()
          }
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