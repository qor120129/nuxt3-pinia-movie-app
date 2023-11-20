<template>
  <div class="container">
    <input v-model="title" type="text" class="form-control" placeholder="Search for Movies, Series & more"
      @keyup.enter="apply">
    <div class="selects">
      <select v-for="(item, index) in filters" :key="item" v-model="item.value" class="form-select"
        @change="change(item.value, index)">
        <option value='' v-if="index === 2">All Years</option>
        <option v-for="item in item.items" :key="item">{{ item }}</option>
      </select>
    </div>
    <button type="buttn" class="btn btn-primary" @click="apply">Apply</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { movieStore } from '@/stores/movie'

const store = movieStore()
const { searchMovies } = store
const title = ref('')
const type = ref('movie')
const number = ref(10)
const year = ref('')
const filters = ref([
  {
    value: 'movie',
    items: ['movie', 'series', 'episode']
  },
  {
    value: 10,
    items: [10, 20, 30]
  },
  {
    value: '',
    items: (() => {
      const years = []
      const thisYear = new Date().getFullYear()
      for (let i = thisYear; i >= 1985; i -= 1) {
        years.push(i)
      }
      return years
    })()
  },
])

function change(value, index) {
  if (index === 0) {
    type.value = value
  }
  if (index === 1) {
    number.value = Number(value)
  }
  if (index === 2) {
    year.value = value
  }
}
async function apply() {
  searchMovies(
    {
      title: title.value,
      type: type.value,
      number: number.value,
      year: year.value,
    }
  )
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;

  >* {
    margin-right: 10px;
    font-size: 15px;

    &:last-child {
      margin-right: 0;
    }
  }

  .selects {
    display: flex;

    select {
      width: 120px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
    color: #fff;
  }

  @include media-breakpoint-down(lg) {
    display: block;

    input,
    .selects {
      margin-right: 0;
      margin-bottom: 10px;

      select {
        width: 100%;
      }
    }

    .btn {
      width: 100%;
    }
  }
}
</style>