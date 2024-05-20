<script setup lang="ts">

import AppHeader from './components/Header/AppHeader.vue';
import CardList from './components/CardList.vue';
import { onMounted, ref, type Ref } from 'vue';
import apiProducts, { type IProduct } from './utils/api/apiProducts';
// import AppDrawer from './components/AppDrawer.vue';

const productsManager = new apiProducts();

const products: Ref<Array<IProduct>> = ref([]);

const getProducts = () => {
  const promise = productsManager.getProducts();

  promise
    .then(response => products.value = response);
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