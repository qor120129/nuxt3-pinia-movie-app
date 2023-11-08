<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script setup>
import MovieList from '@/components/MovieList.vue';
import Headline from '../components/Headline'
import Search from '../components/Search'
import { movieStore } from '@/stores/movie'
const store = movieStore()

store.resetMovies

</script>
