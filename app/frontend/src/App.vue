<script setup lang="ts">

import AppHeader from './components/Header/AppHeader.vue';
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import apiProducts, { type IProduct, type IFavorites } from './utils/api/apiProducts';
import CardList from './components/CardList.vue'
// import AppDrawer from './components/AppDrawer.vue';

const productsManager = new apiProducts();

const SELECT_VALUES = [
  {
    id: 0,
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

interface State {
  filters: {
    sortBy: string;
    searchQuery: string;
  };
  favorites: Array<IFavorites>;
  products: Array<IProduct>;
}

const state = reactive<State>({
  filters: {
    sortBy: '',
    searchQuery: '',
  },

  favorites: [],
  products: []
})

const updateProductFavorites = () => {
  const { favorites, products } = state;

  if (!favorites || !products) {
    return
  }

  const productsWithFavorites = products.map(product => {
    return {
      ...product,
      isFavorite: favorites.some(favorite => favorite.productId === product.productId)
    }
  })

  state.products = productsWithFavorites;
}

const getFavorites = async () => {
  if (state.products.length) {
    const promise = productsManager.getFavorites();

    promise.then((response) => state.favorites.push(...response))

    promise
      .then(() => updateProductFavorites())
  }
}

const getProducts = () => {
  const { sortBy, searchQuery } = state.filters;

  let params = '';

  if (sortBy) {
    params = params + sortBy
  }

  if (searchQuery) {
    params = params + searchQuery
  }

  const promise = productsManager.getProducts(params);

  promise
    .then(response => state.products = response)
    .then(() => getFavorites())
}

const onChangeSelect = (event) => {
  state.filters.sortBy = event.target.value;
}

const onHandleSearch = (event) => {
  state.filters.searchQuery = '&name=*' + event.target.value + '*';
}

const addToFavoritesList = (productId: number) => {
  const { favorites } = state;

  const existingFavorite = favorites.find(favorite => favorite.productId === productId);

  if (existingFavorite) {
    productsManager.deleteFromFavorites({ productId: existingFavorite.id })
      .then(() => {
        const index = state.favorites.indexOf(existingFavorite);
        state.favorites.splice(index, 1);
      })
      .then(() => updateProductFavorites())
  } else {
    productsManager.addToFavorites({ productId })
      .then(newFavorite => favorites.push(newFavorite))
      .then(() => updateProductFavorites())
  }
}

onMounted(() => {
  getProducts();
})

watch(
  () => [state.filters.sortBy, state.filters.searchQuery],
  () => getProducts(),
  { immediate: true }
);

</script>
<template>
  <!-- <AppDrawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14 mb-14 ">
    <AppHeader />
    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
            :onchange="onChangeSelect">
            <option v-for="select in SELECT_VALUES" :value="select.value" :key="select.id">{{ select.label }}</option>
          </select>
          <div class="relative">
            <input type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..." :onKeyup="onHandleSearch" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CardList v-if="Boolean(state.products.length)" :products="state.products"
      :addToFavoritesList="addToFavoritesList" />
  </div>
</template>
