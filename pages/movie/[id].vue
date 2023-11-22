<template>
  <div class="container">
    <template v-if="store.loading">
      <div class="skeletons">
        <div class="skeleton poster">
        </div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader :size="3" :zIndex="9" fixed />
    </template>
    <div v-else class="movie-details">
      <div :style="{ backgroundImage: `url(${requestDiffSizeImage(store.theMovie.Poster)})` }" class="poster">
        <Loader v-if="imageLoading" absolute />
      </div>
      <div class="specs">
        <div class="title">
          <span>{{ store.theMovie.Title }}</span>
        </div>
        <div class="labels">
          <span>{{ store.theMovie.Released }}</span>
          <span>{{ store.theMovie.Runtime }}</span>
          <span>{{ store.theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ store.theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div v-for="{ Source: name, Value: score } in store.theMovie.Ratings" :key="name" :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/qor120129/vue3-movie-app/dfb1cde1769f96cedf445f03cb0ea655ec6a581a/src/assets/img/${name}.png`"
                :alt="name">
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div class="">
          <h3>Actors</h3>
          {{ store.theMovie.Actors }}
        </div>
        <div class="">
          <h3>Director</h3>
          {{ store.theMovie.Director }}
        </div>
        <div class="">
          <h3>Production</h3>
          {{ store.theMovie.Production }}
        </div>
        <div class="">
          <h3>Genre</h3>
          {{ store.theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref } from 'vue'
import Loader from '../components/Loader'
import { movieStore } from '@/stores/movie'

const route = useRoute()
const store = movieStore()
// const { theMovie, loading } = storeToRefs(store)
const { data }  =  useAsyncData(() => store.searchMovieWithId({ id: route.params.id }))

const movie = data.value
console.log('t',movie)

const { $loadImage } = useNuxtApp()
const imageLoading = ref(true)
const requestDiffSizeImage = (url, size = 700) => {

  if (!url || url === 'N/A') {
    imageLoading.value = false
    return ''
  }
  const src = url.replace('SX300', `SX${size}`)
  $loadImage(src)
    .then((res) => {
      imageLoading.value = false
    })
  return src
}
useHead({
  meta: [
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
    { hid: 'og:title', property: 'og:title', content: '수정' },
    { hid: 'og:description', property: 'og:description', content: movie.Plot },
    { hid: 'og:image', property: 'og:image', content: movie.Poster },
    console.log('Plot', movie.Plot),
    console.log('Poster', movie.Poster),
    { hid: 'og:url', property: 'og:url', content: `${process.env.CLIENT_URL}${route.fullPath}` },
  ],
})

// async function test() {
//   useHead({
//     meta: [
//       { hid: 'og:type', property: 'og:type', content: 'website' },
//       { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
//       { hid: 'og:title', property: 'og:title', content: '테스트중' },
//       { hid: 'og:description', property: 'og:description', content: body.Plot },
//       { hid: 'og:image', property: 'og:image', content: body.Poster },
//       console.log('Plot', body.Plot),
//       console.log('Poster', body.Poster),
//       { hid: 'og:url', property: 'og:url', content: `${process.env.CLIENT_URL}${route.fullPath}` },
//     ],
//   })
// }
console.log('3',)
// test()
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
}

.skeletons {
  display: flex;

  .poster {
    width: 500px;
    height: calc(500px * 3/2);
    margin-right: 70px;
    flex-shrink: 0;
  }

  .specs {
    flex-grow: 1;
  }

  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;

    &.title {
      width: 80%;
      height: 70px;
    }

    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }

    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }

    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;

    }
  }
}

.movie-details {
  display: flex;
  color: $gray-600;

  .poster {
    position: relative;
    flex-shrink: 0;
    width: 500px;
    height: calc(500px * 3/2);
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
  }

  .specs {
    flex-grow: 1;

    .title {
      color: $black;
      font-family: "Oswald", "sans-serif";
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }

    .labels {
      color: $primary;

      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;

          &:last-child::after {
            display: none;
          }
        }
      }
    }

    .plot {
      margin-top: 20px;
    }

    .ratings {
      .rating-wrap {
        display: flex;

        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;

          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;

          }
        }
      }
    }

    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", "sans-serif";
      font-size: 20px;
    }
  }

  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: calc(300px * 3/2);
      margin-right: 40px;
    }
  }

  @include media-breakpoint-down(lg) {
    display: block;

    .poster {
      margin-bottom: 40px;
    }
  }

  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }

      .ratings {
        .rating-wrap {
          display: block;

          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }

}
</style>