<template>
  <footer>
    <Logo />
    <a href="" class="primary">{{ year }} fastcampus - HEROPY</a>
  </footer>
</template>

<script setup>

import { ref } from 'vue'
import Logo from '../components/Logo'

const year = ref(new Date().getFullYear())

</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .3;
}

.logo {
  display: block;
  margin-bottom: 4px;
}
</style>