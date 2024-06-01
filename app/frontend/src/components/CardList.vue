<script setup>
import { computed } from 'vue';

import AppProduct from './AppProduct.vue';

const productsProp = defineProps({
    products: { type: Array, required: true },
});

const hasProducts = computed(() => productsProp.products.length !== 0);
</script>

<template>
    <div v-if="!hasProducts" class="px-8 py-8">
        <div class="text-gray-600">Ничего не найдено</div>
    </div>
    <div v-else class="grid grid-cols-4 gap-5 px-8 py-8">
        <AppProduct v-for="product in productsProp.products" :key="product.id" :title="product.name" :img="product.image" :price="product.price" />
    </div>
</template>

