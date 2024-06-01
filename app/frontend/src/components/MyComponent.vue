<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    productName: {
        default: '-',
        type: String
    },

    productPrice: {
        default: 0,
        type: Number
    }

})

const count = ref(1);

function increment() {
    count.value++
}

function handleEnter(event: Event) {
    const { value = ''
    } = event.target as HTMLInputElement

    count.value = Number(value)
}


</script>

<template>
    <div class="wrapper">
        <div class="counter">
            <h1> {{ count }}</h1>

            <button @click="increment">+</button>

            <input type="text" @keyup.enter="handleEnter" />
        </div>


        <div class="product">
            <div class="product-name">product-name: {{ props.productName }}</div>
            <div class="product-price">product-price: {{ props.productPrice }}</div>
        </div>
    </div>
</template>

<style scoped>
.counter {
    margin-bottom: 20px;
}

.wrapper {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.product {
    padding: 15px;
    border: 1px solid tomato;
    border-radius: 4px;
}

.product-name {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 700;
}

.product-price {
    font-size: 14px;
    font-weight: 500;
}
</style>
