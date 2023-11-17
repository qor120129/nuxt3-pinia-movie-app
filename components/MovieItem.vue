<template>
  <NuxtLink :to="`/movie/${movie.imdbID}`" class="movie" :style="{ backgroundImage: `url(${movie.Poster})` }">
    <Loader v-if="imageLoading" :size="1.5" absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ref } from 'vue'
import Loader from '@/components/Loader'
const { $loadImage } = useNuxtApp()

const imageLoading = ref(true)
const props = defineProps({
  movie: {
    type: Object,
    default: {}
  }
})
async function init(){
  const poster = props.movie.Poster
  if (!poster || poster === 'N/A') {
    imageLoading.value = false
  }
  await $loadImage(poster)
  imageLoading.value = false
}
init()

</script>

<style lang="scss" scoped>
.movie {
  position: relative;
  $width: 200px;
  width: $width;
  height: calc($width * 3 / 2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  cursor: pointer;

  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border: 6px solid $primary;
  }

  .info {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    backdrop-filter: blur(10px);

    .year {
      color: $primary;
    }

    .title {
      color: $white;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

}
</style>