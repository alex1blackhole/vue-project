<script setup>
import { computed } from 'vue';

import AppProduct from './AppProduct.vue'; 

const productsProp = defineProps({
    products: { type: Array, required: true },
    addToFavoritesList: Function
});

const hasProducts = computed(() => productsProp.products.length !== 0);
</script>

<template>
    <div v-if="!hasProducts" class="px-8 py-8">
        <div class="text-gray-600">Ничего не найдено</div>
    </div>
    <div v-else class="grid grid-cols-4 gap-5 px-8 py-8">
        <AppProduct v-for="({ id, name, image, price, isFavorite, productId }) in productsProp.products" :key="id" :title="name"
            :img="image" :price="price" :isFavorite="isFavorite" :addToFavoritesList="() => addToFavoritesList(productId)"/>
    </div>
</template>
