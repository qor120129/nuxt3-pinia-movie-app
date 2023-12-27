<template>
  <div class="container">
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="searchLoading" />
      <div v-if="message" class="message">
        <div>{{ message }}</div>
      </div>
      <div v-else="message" class="movies">
        <MovieItem v-for="item in movies" :key="item.imdbID" :movie='item' />
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieItem from './MovieItem'
import Loader from './Loader'
import { movieStore } from '@/stores/movie'

const store = movieStore()
const { message, movies, searchLoading } = storeToRefs(store)

</script>
<style lang="scss" scoped>
.container {
  margin-top: 30px;

  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;

    &.no-result {
      padding: 70px 0
    }
  }

  ;

  .message {
    color: $gray-400;
    font-size: 20px;
  }

  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>