<script setup>
import AppProduct from './AppProduct.vue';

defineProps({
    products: Array,
});
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <AppProduct v-for="product in products" :key="product.id" :title="product.name" :img="product.image"
            :price="product.price" />
    </div>
</template>
