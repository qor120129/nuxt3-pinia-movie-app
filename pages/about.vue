<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="name">
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>
      <a :href="notion" class="primary" target='_blank'>Notion Link</a>
    </div>
    <div>
      {{ email }}
    </div>
    <div>
      {{ phone }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Loader from '@/components/Loader';
import { aboutStore } from '@/stores/about'

const route = useRoute()
const imageLoading = ref(true)
const {name, notion, email, phone, image} = aboutStore()
const { $loadImage } = useNuxtApp()
const { CLIENT_URL } = process.env

async function init() {
  $loadImage(image)
  return imageLoading.value = false
}
init()
const head = () => {
  return {
    meta: [
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
      { hid: 'og:title', property: 'og:title', content: name },
      { hid: 'og:description', property: 'og:description', content: email},
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'og:image', property: 'og:url', content: `${CLIENT_URL}${route.fullPath}` },
    ],
  }
}
head()
</script>

<style lang="scss" scoped>
.about {
  text-align: center;

  .photo {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;

    img {
      width: 100%;
    }
  }

  .name {
    font-size: 40px;
    font-family: "Oswald", "sans-serif";
  }
}
</style>