<script setup lang="ts">

import AppHeader from './components/Header/AppHeader.vue';
import CardList from './components/CardList.vue';
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import apiProducts, { type IProduct } from './utils/api/apiProducts';
// import AppDrawer from './components/AppDrawer.vue';

const productsManager = new apiProducts();

const SELECT_VALUES = [
  {
    id: 0 ,
    label: 'По названию',
    value: 'sortBy=name',
  },
  {
    id: 1,
    label: 'По цене (дешевые)',
    value: 'sortBy=price',
  },
  {
    id: 2,
    label: 'По цене (дорогие)',
    value: 'sortBy=-price',
  }
]

const products: Ref<Array<IProduct>> = ref([]);

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

const getProducts = async () => {
  let params  = '';

  if (filters.sortBy) {
    params = params + filters.sortBy
  }

  if (filters.searchQuery) {
    params =  params + filters.searchQuery
  }

  console.log(params)
  const promise = productsManager.getProducts(params);

  promise
    .then(response => products.value = response);
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
}

const onHandleSearch = (event) => {
  filters.searchQuery = '&name=*' + event.target.value + '*';
}


onMounted(getProducts)

watch(filters, getProducts)
</script>


<template>
  <!-- <AppDrawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14 mb-14 ">
    <AppHeader />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none" :onchange="onChangeSelect">
            <option v-for="select in SELECT_VALUES" :value="select.value" :key="select.id">{{select.label}}</option>
          </select>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
              :onKeyup="onHandleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>  
      </div>
    </div>
 
    <CardList :products="products" />

  </div>
</template>

<style scoped></style>