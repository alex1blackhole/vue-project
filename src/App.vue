<script setup lang="ts">

import AppHeader from './components/Header/AppHeader.vue';
import CardList from './components/CardList.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
// import AppDrawer from './components/AppDrawer.vue';

const products = ref([]);

const getProducts = () => {
  try {
    axios
      .get('https://6ab09c2bf19003f5.mokky.dev/products')
      .then(response => products.value = response.data)

  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getProducts();
})

</script>


<template>
  <!-- <AppDrawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14 mb-14 ">
    <AppHeader />

    <div class="px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold">Product list</h2>
      </div>
      <CardList :products="products" />
    </div>

  </div>
</template>

<style scoped></style>